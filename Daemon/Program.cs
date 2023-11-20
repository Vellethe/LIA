namespace Daemon
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Uri uri = new Uri("https://localhost:7273/api/test");
            HttpClient httpClient = new HttpClient();

            HttpRequestMessage msg = new HttpRequestMessage()
            {
                Method = HttpMethod.Post,
                RequestUri = uri

            };

            var response = httpClient.SendAsync(msg);
            while(response.IsCompleted == false) {
                Thread.Sleep(500);
            }
            Console.WriteLine(response);
        }
    }
}