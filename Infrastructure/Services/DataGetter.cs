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
            context.JobScoutJobs.AddRange(x);
        }
    }
}
