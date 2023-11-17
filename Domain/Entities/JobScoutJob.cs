using System.Text.RegularExpressions;

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
            Company = new JobScoutCompany { Name = hit.Employer.Name };
            Contacts = hit.Application_Contacts.Select(x => new JobScoutContact() { Email = x.Email, Name = x.Name, PhoneNumber = x.Telephone }).ToList();
            TagJobs = new();
        }
        public string FindEmailAddress()
        {
            // Define the regex pattern for an email address
            string pattern = @"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}";

            // Use Regex.Match to find the first occurrence of the pattern in the Description
            Match match = Regex.Match(Description, pattern);

            if (match.Success)
            {
                return match.Value;
            }
            else
            {
                return string.Empty; //Can also be null
            }
        }
    }
}
