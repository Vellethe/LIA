namespace Domain
{
    public class JobScoutContact
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public JobScoutJob Job { get; set; }
    }
}
