using Domain;
using Domain.Entities;
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
        public DbSet<JobScoutContact> JobScoutContacts { get; set; }
        public DbSet<JobScoutJob> JobScoutJobs { get; set; }
        public DbSet<JobScoutTagJob> JobScoutTagJobs { get; set; }
        public DbSet<JobScoutTag> JobScoutTags { get; set; }
        public DbSet<JobScoutFavorite> JobScoutFavorites { get; set; }
        public DbSet<JobScoutUser> JobScoutUsers { get; set; }
    }
}