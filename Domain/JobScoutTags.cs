namespace Domain
{
    public class JobScoutTags
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual List<JobScoutTagJob> TagJobs { get; set; }
    }
}