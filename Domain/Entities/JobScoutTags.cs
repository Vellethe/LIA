namespace Domain
{
    public class JobScoutTags
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<JobScoutTagJob> TagJobs { get; set; }
        // public List<JobScoutJobs> Jobs { get; set; }
    }
}