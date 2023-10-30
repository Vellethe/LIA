namespace Domain
{
    public class JobScoutCompany
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool Excluded { get; set; }
        public List<JobScoutJobs> Jobs { get; set; }
    }
}
