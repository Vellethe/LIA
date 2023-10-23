using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

        public virtual JobScoutCompany Company { get; set; }
        public virtual List<JobScoutTagJob> TagJobs { get; set; }
        public virtual List<JobScoutContacts> Contacts { get; set; }
    }
}
