using Domain;

namespace Infrastructure.Interfaces
{
    internal interface IJobParse
    {
        public List<JobScoutJobs> Parse()
        {
            return new List<JobScoutJobs>();
        }
    }
}
