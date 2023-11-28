using Data;
using Domain;
using Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
    [ApiController]
    [Route("/api")]
    public class JobScoutController
    {
        private JobScoutContext context { get; set; }
        private ILogger<JobScoutController> logger { get; set; }
        public JobScoutController(JobScoutContext context, ILogger<JobScoutController> logger)
        {
            this.context = context;
            this.logger = logger;
        }

        /// <summary>
        ///  Gets jobs that are from non excluded compaines form database and returns them sorted based on decending date.
        /// </summary>
        /// <param name="page"></param>
        /// <returns></returns>

        [HttpGet("jobs")]
        public ActionResult<List<JobScoutJob>> GetJobs(int page = 0)
        {
            int pageSize = 1_000_000;
            var x = context.JobScoutJobs
                .Include(j => j.Contacts)
                .Include(j => j.Company)
                .Include(j => j.TagJobs).ThenInclude(j => j.Tag)
                .Where(x => x.Company.Excluded == false)
                .OrderByDescending(j => j.PostDate)
                .Skip(pageSize * page).Take(pageSize)
                .AsNoTracking()
                .ToList();

            //code for not sending disabled tags
            foreach (var job in x)
            {
                job.TagJobs = job.TagJobs.Where(x => x.Tag.IsDisabled == false).ToList();
            }
            logger.LogInformation("testing");

            return x;
        }

        /// <summary>
        /// Gets all the tags that are not disabled.
        /// </summary>
        /// <returns>testing</returns>

        [HttpGet("tags")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<List<JobScoutTag>> GetTags()
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
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult CreateNewTag(string name, TaggerService tagger)
        {
            var toFind = context.JobScoutTags.FirstOrDefault(x => x.Name == name);
            if (toFind is not null)
            {
                logger.LogInformation($"tag {name} has been reactivated");
                toFind.IsDisabled = false;
                context.SaveChanges();
                return new OkResult();
            }
            var newTag = new JobScoutTag { Name = name };
            context.JobScoutTags.Add(newTag);
            context.SaveChanges();
            logger.LogInformation($"tag {name} has been created");

            tagger.NewTagTagging(newTag, context);
            return new OkResult();
        }

        /// <summary>
        /// used to clear all tags and reasign them. Useful for when you have changed the code
        /// </summary>
        [HttpPost("retag")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult Retag(TaggerService tagger)
        {
            logger.LogInformation("tags are being regenerated");
            tagger.Retag(context);
            return new OkResult();
        }

        /// <summary>
        /// reparses the description for contacts
        /// </summary>
        [HttpPost("reParseDescription")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult ReParseDescription(DescriptionParserService descriptionParserService, JobScoutContext context)
        {
            logger.LogInformation("desctiptions are being regenerated");
            descriptionParserService.ReParseDescription(context);
            return new OkResult();
        }

        /// <summary>
        /// Triggers data loading from providers 
        /// </summary>
        /// <returns></returns>
        [HttpPost("run_data_gathering")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Test(DataGetterService dataGetter, JobScoutContext context, TaggerService tagger, DescriptionParserService descriptionParserService)
        {
            await dataGetter.GetAllProviders(logger, descriptionParserService, context, tagger);
            return new OkResult();
        }

        /// <summary>
        /// Used to remove tags from database "note that tags are not deleted only set to disabled".
        /// </summary>
        /// <param name="tagId"></param>
        /// <returns></returns>

        [HttpDelete("tags")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
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
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult SetFavorite(int id, bool isFavorite)
        {
            //TODO status codes
            var toFind = context.JobScoutJobs.FirstOrDefault(x => x.Id == id);
            if (toFind is null)
            {
                return new NotFoundResult();
            }
            toFind.Favorite = isFavorite;
            context.SaveChanges();
            return new OkResult();
        }

        /// <summary>
        /// Used to set exclueded in the database
        /// </summary>
        /// <param name="id"></param>
        /// <param name="isExcluded"></param>

        [HttpPut("excluded")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult SetExcluded(int id, bool isExcluded)
        {
            var toFind = context.JobScoutCompanies.FirstOrDefault(x => x.Id == id);
            if (toFind is null)
            {
                return new NotFoundResult();
            }
            toFind.Excluded = isExcluded;
            context.SaveChanges();
            return new OkResult();
        }

        /// <summary>
        /// Returns a list of comapanies
        /// </summary>
        /// <param name="onlyExcluded"></param>
        /// <returns></returns>
        [HttpGet("companies")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public ActionResult<List<JobScoutCompany>> GetCompanies(bool onlyExcluded = false)
        {
            if (onlyExcluded)
            {
                var data = context.JobScoutCompanies
                    .Where(x => x.Excluded == true)
                    .AsNoTracking()
                    .ToList();
                return data;
            }
            return context.JobScoutCompanies.AsNoTracking().ToList();
        }

    }
}
