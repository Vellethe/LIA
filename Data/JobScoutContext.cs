using Domain;
using Microsoft.EntityFrameworkCore;

namespace Data
{
    public class JobScoutContext : DbContext
    {
        public JobScoutContext(DbContextOptions<JobScoutContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //https://learn.microsoft.com/en-us/ef/core/change-tracking/relationship-changes
        }

        public DbSet<JobScoutCompany> JobScoutCompanies { get; set; }
        public DbSet<JobScoutContacts> JobScoutContacts { get; set; }
        public DbSet<JobScoutJobs> JobScoutJobs { get; set; }
        public DbSet<JobScoutTagJob> JobScoutTagJobs { get; set; }
        public DbSet<JobScoutTags> JobScoutTags { get; set; }
    }
}