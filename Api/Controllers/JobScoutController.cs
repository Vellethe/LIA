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

        /// <summary>
        ///  Gets jobs that are from non excluded compaines form database and returns them sorted based on decending date.
        /// </summary>
        /// <param name="page"></param>
        /// <returns></returns>

        [HttpGet("jobs")]
        public List<JobScoutJob> GetJobs(int page = 0)
        {
            //TODO consider moving description to it own table so that you can send the description when it is needed
            int pageSize = 1000;
            var x = context.JobScoutJobs
                .Include(j => j.Contacts)
                .Include(j => j.Company)
                .Include(j => j.TagJobs).ThenInclude(j => j.Tag)
                .Where(x=>x.Company.Excluded == false)
                .OrderByDescending(j => j.PostDate)
                .Skip(pageSize * page).Take(pageSize)
                .AsNoTracking()
                .ToList();

            //code for not sending disabled tags
            foreach(var job in x)
            {
                job.TagJobs = job.TagJobs.Where(x=>x.Tag.IsDisabled == false).ToList();
            }
            return x;
        }

        /// <summary>
        /// Gets all the tags that are not disabled.
        /// </summary>
        /// <returns></returns>

        [HttpGet("tags")]
        public List<JobScoutTag> GetTags()
        {
            return context.JobScoutTags
                .Where(x => x.IsDisabled == false)
                .AsNoTracking()
                .ToList();

        }

        /// <summary>
        /// Creation or reactivation of tags.
        /// </summary>
        /// <param name="name"></param>

        [HttpPost("tags")]
        public void CreateNewTag(string name, JobScoutContext context,TaggerService tagger)
        {
            var toFind = context.JobScoutTags.FirstOrDefault(x => x.Name == name);
            if (toFind is not null)
            {
                toFind.IsDisabled = false;
                context.SaveChanges();
                return;
            }
            var newTag = new JobScoutTag { Name = name };
            context.JobScoutTags.Add(newTag);
            context.SaveChanges();

            tagger.NewTagTagging(newTag, context);
        }

        /// <summary>
        /// Creates seed data in database
        /// </summary>
        /// <returns></returns>
        [HttpPost("test")]
        public async Task<string> Test(DataGetterService dataGetter, JobScoutContext context,TaggerService tagger)
        {
            var x = new PlatsbankenGetterService();
            await dataGetter.GetData(x,context,tagger);
            return "hello world";
        }

        /// <summary>
        /// Used to remove tags from database "note that tags are not deleted only set to disabled".
        /// </summary>
        /// <param name="tagId"></param>
        /// <returns></returns>

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

        /// <summary>
        /// Used to set favorites in the database
        /// </summary>
        /// <param name="id"></param>
        /// <param name="isFavorite"></param>
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

        /// <summary>
        /// Used to set exclueded in the database
        /// </summary>
        /// <param name="id"></param>
        /// <param name="isExcluded"></param>

        [HttpPut("excluded")]
        public void SetExcluded(int id, bool isExcluded)
        {
            var toFind = context.JobScoutCompanies.FirstOrDefault(x => x.Id == id);
            if(toFind is null)
            {
                return;
            }
            toFind.Excluded = isExcluded;
            context.SaveChanges();
        }

        /// <summary>
        /// Returns a list of comapanies
        /// </summary>
        /// <param name="onlyExcluded"></param>
        /// <returns></returns>
        [HttpGet("companies")]
        public List<JobScoutCompany> GetCompanies(bool onlyExcluded = false)
        {
            if (onlyExcluded)
            {
                var data = context.JobScoutCompanies
                    .Where(x=>x.Excluded == true)
                    .AsNoTracking()
                    .ToList();
                return data;
            }
            return context.JobScoutCompanies.ToList();
        }

    }
}
