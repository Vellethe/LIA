using Data;
using Domain;
using Infrastructure.Interfaces;

namespace Infrastructure.Services
{
    public class DataGetterService
    {
        private IJobParse JobParse { get; set; }
        private JobScoutContext context { get; set; }
        public DataGetterService(JobScoutContext context, IJobParse jobParse)
        {
            JobParse = jobParse;
            this.context = context;
        }

        public void GetData()
        {
            var x = JobParse.Parse();
            foreach (var job in x)
            {
                if (context.JobScoutJobs.Any(x => x.ProviderUniqueId == job.ProviderUniqueId && x.Provider == job.Provider))
                {
                    //Already exists in db
                    //TODO maybe update values
                    continue;
                }
                //Makes sure that it is referensing a already created company in db
                var dbCompany = context.JobScoutCompanies.FirstOrDefault(x => x.Name == job.Company.Name) ?? job.Company;
                job.Company = dbCompany;
                context.JobScoutJobs.Add(job);
                context.SaveChanges();

                NewJobTagging(job);
                
            }
        }

        private void NewJobTagging(JobScoutJob newJob)
        {
            var allTags = context.JobScoutTags.ToList();
            foreach (var tag in allTags)
            {
                if(CheckForTag(newJob, tag))
                {
                    newJob.TagJobs.Add(new JobScoutTagJob { Tag = tag });
                }
            }
            context.SaveChanges();
        }

        public void NewTagTagging(JobScoutTag newTag)
        {
            var allJobs = context.JobScoutJobs.ToList();
            foreach (var job in allJobs)
            {
                if( CheckForTag(job, newTag))
                {
                    job.TagJobs.Add( new JobScoutTagJob { Tag =  newTag });
                }
            }
            
            context.SaveChanges();
        }

        private bool CheckForTag(JobScoutJob job, JobScoutTag tagToFind)
        {
            //the indexOf is used as a case insensitive contains
            if (job.Role.IndexOf(tagToFind.Name,StringComparison.OrdinalIgnoreCase) != -1 ||
                job.Description.IndexOf(tagToFind.Name,StringComparison.OrdinalIgnoreCase) !=-1)
            {
                return true;
            }

            return false;
        }

    }
}
