﻿namespace Domain
{
    public class JobScoutContacts
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public JobScoutJobs Job { get; set; }
    }
}
