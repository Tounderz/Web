﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebLibrary.Models;

namespace WebLibrary.Abstract
{
    public interface ISendEmail
    {
        bool SendEmail(string email, string messageBody, string subject);
        string MessageBodyConfirmEmail(string email);
        string MessageBodyRetrievePassword(string email);
        string MessageBodyOrder(OrderModel model);
    }
}
