using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class JobScoutTagJob
    {
        public int Id { get; set; }
        public virtual List<JobScoutTags> Tags { get; set; }
        public virtual List<JobScoutJobs> Jobs { get; set; }
    }
}
