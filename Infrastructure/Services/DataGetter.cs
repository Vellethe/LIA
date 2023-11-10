﻿using Data;
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

        public void GetData(IJobParse IJobParse, JobScoutContext context, TaggerService tagger)
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

                tagger.NewJobTagging(job, context);

            }
        }
    }

}
