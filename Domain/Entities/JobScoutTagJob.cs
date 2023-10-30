namespace Domain
{
    public class JobScoutTagJob
    {
        public int Id { get; set; }
        public int JobId { get; set; }
        public int TagId { get; set; }
        public JobScoutTag Tag { get; set; }
        public JobScoutJob Job { get; set; }
    }
}
