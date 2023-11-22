using Domain;
using Infrastructure.Interfaces;
using Newtonsoft.Json;
using System.Collections.Specialized;

namespace Infrastructure.Services
{
    public class PlatsbankenGetterService : IJobParse
    {
        public async Task<List<JobScoutJob>> GetData(List<JobScoutTag> tags)
        {
            //TODO split searches if above 2000 items in search
            var jobs = await GetDataFromApi(tags);
            List<JobScoutJob> output = new();
            foreach (var hit in jobs)
            {
                output.Add(new JobScoutJob(hit));
            }

            return output;
        }

        private async Task<List<PlatsbankenHit>> GetDataFromApi(List<JobScoutTag> tags)
        {
            HttpClient httpClient = new HttpClient();
            //turns of some smart search that makes the searching harder
            httpClient.DefaultRequestHeaders.Add("x-feature-disable-smart-freetext", "true");
            //only get the feilds we need to reduce network trafic
            httpClient.DefaultRequestHeaders.Add("X-Fields", "total{value}, hits{id,webpage_url,application_contacts,publication_date, headline, workplace_address{municipality}, employer{name}, description{text}}");

            NameValueCollection baseQueryString = System.Web.HttpUtility.ParseQueryString(string.Empty);
            var splitTags = "";
            foreach (var tag in tags)
            {
                splitTags += tag.Name + " ";
            }

            baseQueryString.Add("q", $"{splitTags}");
            baseQueryString.Add("region", "zdoY_6u5_Krt");//region code for västa götaland
            baseQueryString.Add("limit", "100");


            //Note theoretical limit at 2100 jobs per search becouse of platsbanken api limitation
            var readArticles = 0;
            var availibleArticles = 2000;
            List<PlatsbankenHit> output = new List<PlatsbankenHit>();

            while (readArticles < availibleArticles)
            {
                NameValueCollection currentQueryString = System.Web.HttpUtility.ParseQueryString(string.Empty);
                currentQueryString.Add("offset", $"{readArticles}");

                //NOTE ToString is required even if it says its not
                var urlToSend = new Uri($"https://jobsearch.api.jobtechdev.se/search?{baseQueryString.ToString()}&{currentQueryString.ToString()}");
                HttpRequestMessage httpRequestMessage = new HttpRequestMessage
                {
                    Method = HttpMethod.Get,
                    RequestUri = urlToSend
                };

                var respone = await httpClient.SendAsync(httpRequestMessage);
                var jsonString = await respone.Content.ReadAsStringAsync();
                //TODO implement network error handeling
                PlatsBankenJsonObjectBinding jobs = JsonConvert.DeserializeObject<PlatsBankenJsonObjectBinding>(jsonString);

                availibleArticles = jobs.Total.Value;
                readArticles += 100;
                output.AddRange(jobs.Hits);
            }

            return output;
        }
    }
}
