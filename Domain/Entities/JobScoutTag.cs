
using Newtonsoft.Json;

namespace Domain
{
    public class JobScoutTag
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsDisabled { get; set; }
        [JsonIgnore]//TODO stops from searching what jobs have tag  note workaround to stop big serialization loop
        public List<JobScoutTagJob> TagJobs { get; set; }
        // public List<JobScoutJobs> Jobs { get; set; }
    }
}