using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebLibrary.Models.Dtos
{
    public class SortDtoModel
    {
        public string FieldName { get; set; }
        public string TypeSort { get; set; }
        public int Page { get; set; }
    }
}
