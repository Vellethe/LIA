using Data;
using Domain;
using Infrastructure.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata.Ecma335;

namespace Api.Controllers
{
    [ApiController]
    [Route("/api")]
    public class JobScoutController
    {
        private JobScoutContext context { get; set; }
        public JobScoutController(JobScoutContext context)
        {
            this.context = context;
        }
        [HttpGet("jobs")]
        public List<JobScoutJob> GetJobs(int page = 0)
        {
            int pageSize = 1000;
            return context.JobScoutJobs
                .Include(j => j.Contacts)
                .Include(j => j.Company)
                .Include(j => j.TagJobs).ThenInclude(j => j.Tag)
                .OrderByDescending(j=> j.PostDate)
                .Skip(pageSize * page).Take(pageSize).ToList();
        }

        [HttpGet("/tags")]
        public List<JobScoutTag> GetTags()
        {
            return context.JobScoutTags.ToList();

        }

        [HttpPost("/tags")]
        public void Post(string name) {
            bool exists = context.JobScoutTags.Any(x => x.Name == name);
            if(exists)
            {
                return;
            }
            context.JobScoutTags.Add(new JobScoutTag { Name = name });
            context.SaveChanges();
        }


        [HttpPost("/test")]
        public string Test()
        {
            var x = new PlatsbankenGetterService();
            DataGetterService y = new DataGetterService(context, x);
            y.GetData();
            return "hello world";
        }

    }
}
