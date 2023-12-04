using Data;
using Domain;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace Infrastructure.Services
{
    public class DescriptionParserService
    {
        public List<JobScoutContact> ParseDescription(string description)
        {
            var possibleNames = Regex.Matches(description, @"(?<name>(?:[A-ZÅÄÖ][a-zåäö]+ ?){2,3})([^ ]+ ?){7}");

            var foundContacs = new List<JobScoutContact>();

            foreach (Match possibleName in possibleNames)
            {
                MatchCollection email = FindEmailAddress(possibleName.Value);
                MatchCollection phoneNumber = FindPhoneNumber(possibleName.Value);

                if (email.Any() || phoneNumber.Any())
                {
                    foundContacs.Add(new JobScoutContact()
                    {
                        Name = possibleName.Groups["name"].Value,
                        Email = email.Any()? email[0].Value : null,
                        PhoneNumber = phoneNumber.Any() ? phoneNumber[0].Value : null,
                        IsGenerated = true
                    });
                }
            }

            //code for catching remaining email and phonenumber
            foreach(Match email in FindEmailAddress(description))
            {
                if (!foundContacs.Any(x => x.Email == email.Value))
                {
                    foundContacs.Add(new JobScoutContact { Email = email.Value, IsGenerated = true });
                }
            }

            foreach (Match phoneNumber in FindPhoneNumber(description))
            {
                if (!foundContacs.Any(x => x.PhoneNumber == phoneNumber.Value))
                {
                    foundContacs.Add(new JobScoutContact { PhoneNumber = phoneNumber.Value, IsGenerated = true });
                }
            }

            return foundContacs;
        }

        public void ReParseDescription(JobScoutContext context)
        {
            //used to quicly remove all items in sql
            context.Database.ExecuteSqlRaw("DELETE FROM JobScoutContacts WHERE IsGenerated=1");

            var jobs = context.JobScoutJobs.Include(x => x.Contacts).Include(x => x.Company);

            foreach (var job in jobs)
            {
                job.Contacts = ParseDescription(job.Description);
            }
            context.SaveChanges();
        }

        private MatchCollection FindEmailAddress(string inputText)
        {
            // Define the regex pattern for an email address
            string pattern = @"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}";

            // Use Regex.Match to find the first occurrence of the pattern in the Description
            var matches = Regex.Matches(inputText, pattern);


            return matches;
        }

        private MatchCollection FindPhoneNumber(string inputText)
        {
            //remove blankspace from phone number to make it easier to find
            //NO-BREAK \U00A0
            inputText = inputText.Replace("\u00A0", "");
            inputText = inputText.Replace(" ", "");
            inputText = inputText.Replace("-", "");

            var matches = Regex.Matches(inputText, @"(?:(?:\+\d{2})|0)\d{1}-?\d{1}-?\d{7}");

            return matches;
        }
    }
}
