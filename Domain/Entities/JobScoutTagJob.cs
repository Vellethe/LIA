﻿namespace Domain
{
    public class JobScoutTagJob
    {
        public int Id { get; set; }
        public int JobId { get; set; }
        public int TagId { get; set; }
        public JobScoutTags Tag { get; set; }
        public JobScoutJobs Job { get; set; }
    }
}
