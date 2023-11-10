using Domain;
using Infrastructure.Interfaces;
using Newtonsoft.Json;
using System.Collections.Specialized;
using System.Reflection;

namespace Infrastructure.Services
{
    public class PlatsbankenGetterService : IJobParse
    {
        public async Task<List<JobScoutJob>> GetData()
        {
            string data = await GetDataFromApi();
            PlatsBankenJsonObjectBinding jobs = JsonConvert.DeserializeObject<PlatsBankenJsonObjectBinding>(data);
            List<JobScoutJob> output = new();
            foreach (var hit in jobs.Hits)
            {
                output.Add(new JobScoutJob(hit));
            }

            return output;

        }

        private async Task<string> GetDataFromApi()
        {
            HttpClient httpClient = new HttpClient();
            NameValueCollection queryString = System.Web.HttpUtility.ParseQueryString(string.Empty);

            queryString.Add("q", "python");
            queryString.Add("region", "zdoY_6u5_Krt");//region code for västa götaland

            HttpRequestMessage httpRequestMessage = new HttpRequestMessage {
                RequestUri = new Uri($"https://jobsearch.api.jobtechdev.se/search?{queryString.ToString()}"),
                Method = HttpMethod.Get,
                Headers =
                {
                    {"x-feature-disable-smart-freetext","true" },
                    //only get the feilds we need to reduce network trafic
                    {"X-Fields","total{value}, hits{id,webpage_url,application_contacts,publication_date, headline, workplace_address{municipality}, employer{name}, description{text}}" }
                }
                

            };

            var respone = await httpClient.SendAsync(httpRequestMessage);
            var jsonString = await respone.Content.ReadAsStringAsync();
            //TODO implement network error handeling
            return jsonString;
        }
    }
}
