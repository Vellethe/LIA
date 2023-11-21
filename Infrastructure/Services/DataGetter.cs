using Data;
using Domain;
using Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace Infrastructure.Services
{
    public class DataGetterService
    {
        public DataGetterService()
        {
        }

        public async Task GetData(IJobParse IJobParse, JobScoutContext context, TaggerService tagger)
        {
            var tagsToSearch = context.JobScoutTags.Where(x => x.IsDisabled == false).ToList();

            var x = await IJobParse.GetData(tagsToSearch);
            foreach (var job in x)
            {
                if (context.JobScoutJobs.Any(x => x.ProviderUniqueId == job.ProviderUniqueId && x.Provider == job.Provider))
                {
                    //Already exists in db
                    //TODO maybe update values
                    continue;
                }

                //prevenets duplicate companies from being created
                var dbCompany = context.JobScoutCompanies.FirstOrDefault(x => x.Name == job.Company.Name) ?? job.Company;
                job.Company = dbCompany;
                tagger.NewJobTagging(job, context);

                if(job.TagJobs.Count() != 0)
                {
                    context.JobScoutJobs.Add(job);
                }

                // limit consecutive \n to 2
                job.Description = Regex.Replace(job.Description, @"\n{3,}", "\n\n");

                List<string> emailAddresses = EmailAccess.FindEmailAddress(job.Description);

                // Save email addresses to the database under contact.email
                foreach (string emailAddress in emailAddresses)
                {
                    // Assuming there is a Contact entity associated with JobScoutJobs
                    var contact = new JobScoutContact
                    {
                        Email = emailAddress,
                        // Add any other relevant contact information here
                    };

                    // Associate the contact with the job and save to the database
                    job.Contacts.Add(contact);
                    context.JobScoutContacts.Add(contact);
                }

                context.SaveChanges();


            }

        }
    }

}
