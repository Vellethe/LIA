﻿using Data;
using Domain;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace Infrastructure.Services
{
    public class TaggerService
    {
        public void NewJobTagging(JobScoutJob newJob, JobScoutContext context)
        {
            var allTags = context.JobScoutTags.ToList();
            foreach (var tag in allTags)
            {
                if (CheckForTag(newJob, tag))
                {
                    newJob.TagJobs.Add(new JobScoutTagJob { Tag = tag });
                }
            }
            context.SaveChanges();
        }

        public void NewTagTagging(JobScoutTag newTag, JobScoutContext context)
        {
            var allJobs = context.JobScoutJobs.Include(x => x.TagJobs).ToList();
            foreach (var job in allJobs)
            {
                if (CheckForTag(job, newTag))
                {
                    job.TagJobs.Add(new JobScoutTagJob { Tag = newTag });
                }
            }
            context.SaveChanges();
        }

        public void Retag(JobScoutContext context)
        {
            //used to quicly remove all links from tags to jobs
            context.Database.ExecuteSqlRaw("delete from JobScoutTagJobs");

            var allJobs = context.JobScoutJobs.Include(x => x.TagJobs);
            foreach (var job in allJobs)
            {
                NewJobTagging(job, context);
            }
            context.SaveChanges();
        }

        private bool CheckForTag(JobScoutJob job, JobScoutTag tagToFind)
        {
            if (ContainsRegex(job.Role, tagToFind.Name) || ContainsRegex(job.Description, tagToFind.Name))
            {
                return true;
            }

            return false;
        }


        private bool ContainsRegex(string str1, string tagName)
        {
            string escapedTag = Regex.Escape(tagName);

            var regex = new Regex(@$"(\s|^){escapedTag}(\s|\-|\.|$)", RegexOptions.IgnoreCase | RegexOptions.Multiline);
            return regex.IsMatch(str1);
        }
    }
}
