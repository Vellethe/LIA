namespace Domain
{
    public class JobScoutTag
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsDisabled { get; set; }
        public List<JobScoutTagJob> TagJobs { get; set; }
        // public List<JobScoutJobs> Jobs { get; set; }
    }
}