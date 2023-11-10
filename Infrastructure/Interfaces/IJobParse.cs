using Domain;

namespace Infrastructure.Interfaces
{
    public interface IJobParse
    {
        Task<List<JobScoutJob>> GetData();
    }
}
