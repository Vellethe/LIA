using Data;
using Infrastructure.Interfaces;

namespace Infrastructure.Services
{
    public class DataGetterService
    {
        private IJobParse JobParse { get; set; }
        private JobScoutContext context { get; set; }
        public DataGetterService(JobScoutContext context, IJobParse jobParse)
        {
            JobParse = jobParse;
            this.context = context;
        }

        public void GetData()
        {
            var x = JobParse.Parse();
            foreach (var job in x)
            {
                if (context.JobScoutJobs.Any(x => x.ProviderUniqueId == job.ProviderUniqueId && x.Provider == job.Provider))
                {
                    //Already exists in db
                    //TODO maybe update values
                    continue;
                }
                //Makes sure that it is referensing a already created company in db
                var dbCompany = context.JobScoutCompanies.FirstOrDefault(x => x.Name == job.Company.Name) ?? job.Company;
                job.Company = dbCompany;
                context.JobScoutJobs.Add(job);
                context.SaveChanges();
            }
        }
    }
}
