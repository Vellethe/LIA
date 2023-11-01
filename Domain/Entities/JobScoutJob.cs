namespace Domain
{
    public class JobScoutJob
    {
        public int Id { get; set; }
        public string Role { get; set; } = string.Empty;
        public string Municipality { get; set; } = string.Empty;
        public DateTime PostDate { get; set; }
        public bool Favorite { get; set; }
        public string Provider { get; set; }
        public string ProviderUniqueId { get; set; }
        public string Url { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        public JobScoutCompany Company { get; set; }
        public List<JobScoutTagJob> TagJobs { get; set; }
        //public List<JobScoutTags> Tags { get; set; }
        public List<JobScoutContact> Contacts { get; set; }

        public JobScoutJob() { }
        public JobScoutJob(PlatsbankenHit hit)
        {
            Role = hit.Headline;
            Municipality = hit.Workplace_Address.Municipality;
            PostDate = hit.Publication_date;
            Provider = "platsbanken";
            ProviderUniqueId = hit.Id;
            Url = hit.Webpage_url;
            Description = hit.Description.Text;
            Company = new JobScoutCompany { Name = hit.Employer.Name };//TODO make sure that it references the right company
            Contacts = hit.Application_Contacts.Select(x => new JobScoutContact() { Email = x.Email, Name = x.Name, PhoneNumber = x.Telephone }).ToList();
            TagJobs = new();
        }
    }
}
