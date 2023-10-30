using Domain;
using Infrastructure.Interfaces;
using Data;

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
            foreach(var job in x)
            {
                if(context.JobScoutJobs.Any(x=>x.ProviderUniqueId == job.ProviderUniqueId&&x.Provider == job.Provider)){
                    //Already exists in db
                    //TODO maybe update values
                    continue;
                }
                context.JobScoutJobs.Add(job);
            }
            context.SaveChanges();
        }
    }
}
