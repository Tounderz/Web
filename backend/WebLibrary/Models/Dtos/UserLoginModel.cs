﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebLibrary.Models.Dtos
{
    public class UserLoginModel
    {
        public string Login { get; set; }

        public string Password { get; set; }
    }
}
