using Domain;

namespace Infrastructure.Interfaces
{
    public interface IJobParse
    {
        List<JobScoutJob> Parse();
    }
}
