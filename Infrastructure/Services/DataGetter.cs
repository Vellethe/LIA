using Data;
using Domain;
using Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;

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

                context.SaveChanges();


            }

        }
    }

}
