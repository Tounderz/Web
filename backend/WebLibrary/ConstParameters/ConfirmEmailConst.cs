using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Metadata.W3cXsd2001;
using System.Text;
using System.Threading.Tasks;

namespace WebLibrary.ConstParameters
{
    public class ConfirmEmailConst
    {
        public const string CONFIRM_ROUTE = "confirmEmails";
        public const string HTTP_GET_CONFIRM_EMAIL = "confirmEmail";
        public const string HTTP_GET_UPDATE_TOKEN = "updateToken";
        public const string ERROR_CONFIRM_EMAIL = "You have not confirmed the email address!";
        public const string UPDATE_TOKEN = "The token is out of date, a new email has been sent to you.";
        public const string SUBJECK_CONFIRM_EMAIL = "Confirmation Of Authorisation";
        public const string MESSAGE_CONFIRM_AUTHORIZATION = "Successful confirmation of email address.";
        public const string ERROR_INCORRECT_EMAIL_OUTDATED_LINK = "Incorrect email address or outdated link.";
    }
}
