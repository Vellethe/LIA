namespace Domain
{
    public class JobScoutJobs
    {
        public int Id { get; set; }
        public string Role { get; set; }
        public string Municipality { get; set; }
        public DateTime PostDate { get; set; }
        public bool Favorite { get; set; }
        public string Provider { get; set; }
        public string ProviderUniqueId { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }

        public JobScoutCompany Company { get; set; }
        public List<JobScoutTagJob> TagJobs { get; set; }
        //public List<JobScoutTags> Tags { get; set; }
        public List<JobScoutContacts> Contacts { get; set; }
    }
}
