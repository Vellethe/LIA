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
                .OrderByDescending(j => j.PostDate)
                .Skip(pageSize * page).Take(pageSize).ToList();
        }

        [HttpGet("tags")]
        public List<JobScoutTag> GetTags()
        {
            return context.JobScoutTags.Where(x => x.IsDisabled == false).ToList();

        }

        [HttpPost("tags")]
        public void CreateNewTag(string name)
        {
            var toFind = context.JobScoutTags.FirstOrDefault(x => x.Name == name);
            if (toFind is not null)
            {
                toFind.IsDisabled = false;
                context.SaveChanges();
                return;
            }
            context.JobScoutTags.Add(new JobScoutTag { Name = name });
            context.SaveChanges();
        }


        [HttpPost("test")]
        public string Test()
        {
            var x = new PlatsbankenGetterService();
            DataGetterService y = new DataGetterService(context, x);
            y.GetData();
            return "hello world";
        }

        [HttpDelete("tags")]
        public IActionResult DeleteTag(int tagId)
        {
            var tag = context.JobScoutTags.Find(tagId);

            if (tag == null)
            {
                return new NotFoundResult();
            }

            tag.IsDisabled = true;
            context.SaveChanges();

            return new NoContentResult();
        }

        [HttpPut("favorite")]
        public void SetFavorite(int id, bool isFavorite)
        {
            //TODO status codes
            var toFind = context.JobScoutJobs.FirstOrDefault(x => x.Id == id);
            if (toFind is null)
            {
                return;
            }
            toFind.Favorite = isFavorite;
            context.SaveChanges();
        }

    }
}
