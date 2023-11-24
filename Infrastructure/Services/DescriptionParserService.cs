using Data;
using Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

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
                Match email = FindEmailAddress(possibleName.Value);
                Match phoneNumber = FindPhoneNumber(possibleName.Value);

                if (email.Success == false && phoneNumber.Success == false)
                {
                    continue;
                }
                foundContacs.Add(new JobScoutContact()
                {
                    Name = possibleName.Groups["name"].Value,
                    Email = email.Success ? email.Value : null,
                    PhoneNumber = phoneNumber.Success ? phoneNumber.Value : null,
                    IsGenerated = true
                });
            }
            return foundContacs;
        }

        public void ReParseDescription(JobScoutContext context)
        {
            //used to quicly remove all items in sql
            context.Database.ExecuteSqlRaw("DELETE FROM JobScoutContacts WHERE IsGenerated=1");

            var jobs = context.JobScoutJobs.Include(x=>x.Contacts);

            foreach(var job in jobs)
            {
                job.Contacts = ParseDescription(job.Description);
            }
            context.SaveChanges();

        }

        private Match FindEmailAddress(string Description)
        {
            // Define the regex pattern for an email address
            string pattern = @"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}";

            // Use Regex.Match to find the first occurrence of the pattern in the Description
            var match = Regex.Match(Description, pattern);


            return match;
        }

        private Match FindPhoneNumber(string description)
        {
            //remove blankspace from phone number to make it easier to find
            description = description.Replace(" ", "");

            Match match = Regex.Match(description, @"(?:(?:\+\d{2})|0)\d{2}-?\d{7}");

            return match;
        }
    }
}
