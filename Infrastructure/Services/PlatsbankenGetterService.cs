using Domain;
using Infrastructure.Interfaces;
using Newtonsoft.Json;
using System.Collections.Specialized;
using System.Reflection;

namespace Infrastructure.Services
{
    public class PlatsbankenGetterService : IJobParse
    {

        private string Data = @"{ 'total': { 'value': 8947 }, 'hits': [ { 'id': '28187650', 'webpage_url': 'hello', 'application_contacts': [ { 'name': null, 'description': 'Tilda Kristensson', 'email': 'tilda.kristensson@onepartnergroup.se', 'telephone': '0702', 'contact_type': 'hello' } ], 'publication_date': '2023-10-27T08:44:14', 'headline': 'Automationstekniker till industrin', 'workplace_address': { 'municipality': 'Borås' }, 'employer': { 'name': 'OnePartnerGroup Borås AB' }, 'description': { 'text': 'hello' } }, { 'id': '28187670', 'webpage_url': 'https://arbetsformedlingen.se/platsbanken/annonser/28187670', 'application_contacts': [ { 'name': null, 'description': 'Sofia Kalabic', 'email': 'sofia.kalabic@aditrologistics.com', 'telephone': null, 'contact_type': null } ], 'publication_date': '2023-10-27T08:43:59', 'headline': 'Lagermedarbetare på deltid i Göteborg', 'workplace_address': { 'municipality': 'Göteborg' }, 'employer': { 'name': 'Aditro Logistics Staffing AB' }, 'description': { 'text': 'Om oss\nGenom väl beprövade metoder och arbetssätt hjälper vi logistik- och industriföretag att optimera sin verksamhet och därmed minska sina personalkostnader. Vi planerar, levererar och opererar vårt åtagande genom en mycket erfaren och specialiserad organisation inom logistik- och industriområdet. Aditro Logistics Staffing levererar tjänster inom Uthyrning, Entreprenad, Rekrytering och konsulterande tjänster. Läs gärna mer på aditrologistics.se\n\nAditro Logistics Staffing AB är ett Auktoriserat Bemanningsföretag vilket innebär bland annat att alla anställda är kollektivavtalsanslutna och att vi som företag följer alla de regler som dikteras av branschens kollektivavtal, leveransvillkor och skrivelser om försäkringsåtaganden.\n\nVad vi erbjuder dig\nDu kommer möta utmaningar, bli inspirerad och vara stolt över att gå till jobbet. Hos Aditro Logistics Staffing är alla lika värda. Vi tar väl hand om varandra och våra beteenden är att ständigt engagera, prestera och utveckla oss själva och de uppdrag och samarbeten vi jobbar med. Vi erbjuder stor möjlighet till personlig utveckling genom alla de olika kunduppdrag vi har. Hos oss är det viktigt med ett engagerat ledarskap. Hos oss träffar du din chef flera dagar i veckan.\n\nArbetsuppgifter\nÄr du student och söker efter ett roligt extrajobb med härliga kollegor? Då ska du läsa vidare! Just nu söker vi deltidspersonal för att utöka vår studentpool hos vår lagerkund i Torslanda. Arbetet passar för dig som har en annan sysselsättning på minst 50 % (timanställning godkänns ej!). Arbetstiden är förlagd mån-fre, 07-16 och du lägger dig själv tillgänglig de dagar du kan arbeta. Här kommer du möta ett härligt gäng med underbara kollegor och ha en mycket nära kontakt med din konsultchef. \n\nHuvudsakliga arbetsuppgifter består av: \n- Packetering av varor\n- Orderplock\n- Sortering av paket \n- In- och utleverans\n- Övriga tillkommande lageruppgifter\n\n\nOMFATTNING: Deltid\nPLACERING: Torslanda\nARBETSTID: mån - fre, 07:00-16:00. \n\n\n\n\n\nDin profil\nFör att vara aktuell för tjänsten behöver du ha en annan sysselsättning på minst 50 % (timanställning godkänns ej). Exempel på annan sysselsättning kan vara att du är student, har ett annat deltidsjobb/eget företag eller en elitsatsning inom idrott på minst 50 %. Vi ställer inget krav på att du ska ha jobbat på lager tidigare, men det ses som meriterande. Störst vikt kommer läggas vid personlig lämplighet och vi ser därför gärna att du har lätt för att samarbeta, har en positiv och flexibel attityd samt trivs med ett fysiskt arbete. \n\nFör att vara aktuell för tjänsten behöver du: \n- Ha en annan huvudsaklig sysselsättning på minst 50% och kunna visa upp ett intyg på detta (OBS! Timanställning räknas ej) - För att underlätta ansökningsprocessen - bifoga gärna studieintyg/arbetsgivarintyg i din ansökan! \n- Kunna arbeta 2-3 dagar i veckan, vardagar på dagtid.\n- Förstå och tala svenska obehindrat.\n\n\nVidare ser vi det meriterande om du:\n- Har tidigare erfarenhet av att arbeta på lager. \n- Har truckkort\n- Har B-körkort och tillgång till bil, alternativt bor i närheten av Torslanda eftersom det kan vara svårt att ta sig till våra kunder kollektivt.\n\nLåter detta som en tjänst för dig eller någon du känner? Då är ni varmt välkommen med er ansökan redan idag! Rekrytering sker löpande och tjänsten kan komma att tillsättas innan sista ansökningsdag.' } }, { 'id': '28187669', 'webpage_url': 'https://arbetsformedlingen.se/platsbanken/annonser/28187669', 'application_contacts': [ { 'name': null, 'description': 'Sofia Kalabic', 'email': 'sofia.kalabic@aditrologistics.com', 'telephone': null, 'contact_type': null } ], 'publication_date': '2023-10-27T08:43:25', 'headline': 'Göteborgs bästa uppdrag som däckskiftare! ', 'workplace_address': { 'municipality': 'Göteborg' }, 'employer': { 'name': 'Aditro Logistics Staffing AB' }, 'description': { 'text': 'Om oss\nGenom väl beprövade metoder och arbetssätt hjälper vi logistik- och industriföretag att optimera sin verksamhet och därmed minska sina personalkostnader. Vi planerar, levererar och opererar vårt åtagande genom en mycket erfaren och specialiserad organisation inom logistik- och industriområdet. Aditro Logistics Staffing levererar tjänster inom Uthyrning, Entreprenad, Rekrytering och konsulterande tjänster. Läs gärna mer på aditrologistics.se\n\nAditro Logistics Staffing AB är ett Auktoriserat Bemanningsföretag vilket innebär bland annat att alla anställda är kollektivavtalsanslutna och att vi som företag följer alla de regler som dikteras av branschens kollektivavtal, leveransvillkor och skrivelser om försäkringsåtaganden.\n\nVad vi erbjuder dig\nDu kommer möta utmaningar, bli inspirerad och vara stolt över att gå till jobbet. Hos Aditro Logistics Staffing är alla lika värda. Vi tar väl hand om varandra och våra beteenden är att ständigt engagera, prestera och utveckla oss själva och de uppdrag och samarbeten vi jobbar med. Vi erbjuder stor möjlighet till personlig utveckling genom alla de olika kunduppdrag vi har. Hos oss är det viktigt med ett engagerat ledarskap. Hos oss träffar du din chef varje vecka, i många fall varje dag.\n\nArbetsuppgifter\nÄr du en person med ett hjärta som klappar extra mycket för bilar eller har du en bakgrund inom idrott? Har du dessutom tidigare erfarenhet som däckskiftare? Då ska du läsa vidare eftersom vi nu kan vi erbjuda Göteborgs bästa jobb som däcksskiftare hos våra kunder! \n\nInledningsvis kommer du börja som däckskiftare hos en av våra kunder under deras däcksäsong. Efter avslutad säsong kommer du ha möjlighet att fortsätta arbeta som däcksskiftare på annat långsiktigt uppdrag om du skulle vilja detta. Samtliga kunder är placerade på Hisingen och arbetstid är dagtid mån-fre. \n\nSom däckskiftare kommer du att vara en viktig del av vårt team och få ta mycket eget ansvar. Dina arbetsuppgifter kommer i huvudsak vara att skifta däck på personbilar och företagsbilar. I vissa fall kommer du även skifta däck på helt nya bilar som ska levereras till kund. Arbetet ställer därmed höga krav på att du är ansvarsfull och noggran. Att jobba som däckskiftare är fysiskt tungt och sker med ett högt tempo. Det är därför viktigt att du har en god fysisk förmåga, kan planera ditt arbete och jobba effektivt. \n\nOMFATTNING: Heltid\nARBETSTID: Dagtid, mån-fre\nPLACERING: Hisingen\nSTART: Mitten av oktober - 30 april med goda möjligheter till förlängning efter avslutat uppdrag.\n\n\nDin profil\nFör att trivas i rollen som däckskiftare bör du vara en person som motiveras av ett högt tempo och ett fysiskt jobb. Troligtvis har du en bakgrund inom idrott och/eller ett stort intresse för bilar. Som vi alla vet är det tungt med däck och du behöver ha en god fysisk förmåga. Att byta däck är något som alla kan lära sig - därför har vi inget krav på tidigare erfarenhet. Däremot kommer stor vikt läggas vid personlig lämplighet, inställning och attityd.\n\nPå ett av uppdragen finns det utöver fast lön även möjlighet till att ta del av en bonus, vi ser därför gärna att du är tävlingsinriktad och motiveras av att nå uppsatta mål. \n\nFör rätt person kommer det finnas mycket goda utvecklingsmöjligheter för att uveckla karriären hos oss. \n\nKRAV:\n- Flytande svenska i tal och skrift. \n\nMERITERANDE: \n- B-körkort för manuell bil. \n- Tidigare erfarenhet av att arbeta med däckskifte eller på bilverkstad. \n- Truckkort\n\nTa chansen och sök denna möjlighet som däckskiftare redan idag! Varmt välkommen med din ansökan!' } } ] }";
        private static string dataPath = Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), @"Services/data.json");
        private string rows = File.ReadAllText(dataPath);
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
