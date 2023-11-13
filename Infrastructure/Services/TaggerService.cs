using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Data;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services
{
    public class TaggerService
    {
        public void NewJobTagging(JobScoutJob newJob, JobScoutContext context)
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
            if (ContainsRegex(job.Role,tagToFind.Name) || ContainsRegex(job.Description, tagToFind.Name))
            {
                return true;
            }

            return false;
        }


        private bool ContainsRegex(string str1,string tagName)
        {
            string escapedTag = Regex.Escape(tagName);
            //\b word boundry
            var regex = new Regex(@$"\b{escapedTag}.?(\s+|$|\/)",RegexOptions.IgnoreCase);
            //the indexOf is used as a case insensitive contains
            return regex.IsMatch(str1);
        }

    }
}
