using Newtonsoft.Json;

namespace Domain
{
    public struct PlatsBankenJsonObjectBinding
    {
        [JsonProperty]
        public PlatsBankenTotal Total { get; set; }

        [JsonProperty]
        public List<PlatsbankenHit> Hits { get; set; }
    }
    public struct PlatsBankenTotal
    {
        public int Value { get; set; }
    }


    public struct PlatsbankenHit
    {
        public string Id { get; set; }
        public string Webpage_url { get; set; }
        public List<PlatsbankenApplicationContacts> Application_Contacts { get; set; }
        public DateTime Publication_date { get; set; }
        public DateTime Last_publication_date { get; set; }
        public string Headline { get; set; }
        public PlatsbankenWorkplaceAddress Workplace_Address { get; set; }
        public PlatsbankenEmployer Employer { get; set; }
        public PlatsbankenDescription Description { get; set; }
    }

    public struct PlatsbankenApplicationContacts
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Email { get; set; }
        public string Telephone { get; set; }
        public string Contact_type { get; set; }
    }

    public struct PlatsbankenWorkplaceAddress
    {
        public string Municipality { get; set; }
    }

    public struct PlatsbankenEmployer
    {
        public string Name { get; set; }
    }
    public struct PlatsbankenDescription
    {
        public string Text { get; set; }
    }
}
