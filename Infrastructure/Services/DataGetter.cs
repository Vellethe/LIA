using Data;
using Infrastructure.Interfaces;
using Microsoft.Extensions.Logging;
using System.Text.RegularExpressions;

namespace Infrastructure.Services
{
    public class DataGetterService
    {
        private IDataGetter[] getters = { new PlatsbankenGetterService() };
        public DataGetterService()
        {
        }


        public async Task GetDataFromAllProviders(ILogger logger, DescriptionParserService descriptionParser, JobScoutContext context, TaggerService tagger)
        {
            int totalNewJobs = 0;
            foreach (var getter in getters)
            {
                var numberOfJobs = await GetData(getter, descriptionParser, context, tagger);
                totalNewJobs += numberOfJobs;
                logger.LogInformation($"{getter} found {numberOfJobs} new jobs");
            }
            logger.LogInformation($"In total {totalNewJobs} new jobs got saved");
        }

        private async Task<int> GetData(IDataGetter IJobParse, DescriptionParserService descriptionParser, JobScoutContext context, TaggerService tagger)
        {
            var tagsToSearch = context.JobScoutTags.Where(x => x.IsDisabled == false).ToList();

            var data = await IJobParse.GetData(tagsToSearch);
            var addedJobs = 0;
            foreach (var job in data)
            {
                if (context.JobScoutJobs.Any(x => x.ProviderUniqueId == job.ProviderUniqueId && x.Provider == job.Provider))
                {
                    //Already exists in db
                    continue;
                }

                //prevenets duplicate companies from being created
                var dbCompany = context.JobScoutCompanies.FirstOrDefault(x => x.Name == job.Company.Name) ?? job.Company;
                job.Company = dbCompany;
                tagger.NewJobTagging(job, context);

                if (job.TagJobs.Count() != 0)
                {
                    context.JobScoutJobs.Add(job);
                }

                // limit consecutive \n to 2
                job.Description = Regex.Replace(job.Description, @"\n{3,}", "\n\n");

                var foundContacts = descriptionParser.ParseDescription(job.Description);

                //code for removing already existing contacts
                foreach (var contact in foundContacts)
                {
                    var oldContact = job.Contacts.Where(x => x.Name == contact.Name);
                    if (oldContact.Count() == 0)
                    {
                        job.Contacts.Add(contact);
                        addedJobs += 1;
                    }
                }
            }
            context.SaveChanges();
            return addedJobs;
        }
    }
}
