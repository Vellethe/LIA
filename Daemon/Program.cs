namespace Daemon
{
    using Microsoft.Extensions.Configuration;
    internal class Program
    {
        static void Main(string[] args)
        {

            var builder = new ConfigurationBuilder();

            builder.SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json",optional:false, reloadOnChange: true);

            IConfiguration config = builder.Build();


            Uri uri = new Uri(config["callUrl"]);
            HttpClient httpClient = new HttpClient();

            HttpRequestMessage msg = new HttpRequestMessage()
            {
                Method = HttpMethod.Post,
                RequestUri = uri

            };

            var response = httpClient.SendAsync(msg);
            while (response.IsCompleted == false)
            {
                Thread.Sleep(500);
            }
            Console.WriteLine(response);
        }
    }
}