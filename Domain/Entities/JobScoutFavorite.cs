using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class JobScoutFavorite
    {
        public int Id { get; set; }
        public JobScoutJob Job { get; set; }
        public JobScoutUser User { get; set; }
    }
}
