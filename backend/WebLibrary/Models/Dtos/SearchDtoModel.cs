﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebLibrary.Models.Dtos
{
    public class SearchDtoModel
    {
        public string Parameter { get; set; }
        public int Page { get; set; }
        public string Criteria { get; set; }
    }
}
