using Domain;

namespace Infrastructure.Interfaces
{
    public interface IDataGetter
    {
        Task<List<JobScoutJob>> GetData(List<JobScoutTag> tags);
    }
}
