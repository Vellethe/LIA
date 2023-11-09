using Data;
using Domain;
using Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services
{
    public class DataGetterService
    {
        public DataGetterService()
        {
        }

        public void GetData(IJobParse IJobParse,JobScoutContext context)
        {
            var x = IJobParse.Parse();
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

                NewJobTagging(job, context);
                
            }
        }

        private void NewJobTagging(JobScoutJob newJob, JobScoutContext context)
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

        public void NewTagTagging(JobScoutTag newTag, JobScoutContext context)
        {
            var allJobs = context.JobScoutJobs.Include(x=>x.TagJobs).ToList();
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
            if (CaseInsesitiveContains(job.Role,tagToFind.Name) || CaseInsesitiveContains(job.Description, tagToFind.Name))
            {
                return true;
            }

            return false;
        }


        private bool CaseInsesitiveContains(string str1,string str2)
        {
            //the indexOf is used as a case insensitive contains
            return str1.IndexOf(str2, StringComparison.OrdinalIgnoreCase) != -1;
        }

    }
}
