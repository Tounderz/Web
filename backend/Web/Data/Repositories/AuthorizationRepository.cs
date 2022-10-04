using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using WebLibrary.Abstract;
using WebLibrary.ConstParameters;
using WebLibrary.Models;
using WebLibrary.Models.Dtos;

namespace Web.Data.Repositories
{
    public class AuthorizationRepository : IAuthorization
    {
        private readonly AppDBContext _context;
        private readonly IGeneralMethods _generalMethods;

        public AuthorizationRepository(AppDBContext context, IGeneralMethods generalMethods)
        {
            _context = context;
            _generalMethods = generalMethods;
        }

        public UserModel CreateUser(UserRegisterModel model)
        {
            var resultDate = DateTime.Compare(model.DateOfBirth, ConstParameters.DATE_MIN);
            var user = new UserModel
            {
                Name = model.Name,
                Surname = model.Surname,
                Gender = model.Gender,
                DateOfBirth = resultDate == 1 ? model.DateOfBirth.ToString("dd.MM.yyyy") : string.Empty,
                Email = model.Email,
                Phone = model.Phone,
                Login = model.Login,
                Password = BCrypt.Net.BCrypt.HashPassword(model.Password),
                Img = model.Img != null ? _generalMethods.SaveImg(model.Img) : string.Empty,
                Role = ConstParameters.USER_ROLE,
                IsDeleted = false,
            };

            _context.Users.Add(user);
            _context.SaveChanges();
            return user;
        }

        public UserDtoModel CreateUserDto(UserModel model)
        {
            var userDto = new UserDtoModel
            {
                UserId = model.Id,
                Login = model.Login,
                Role = model.Role,
                IsAuth = true
            };

            return userDto;
        }

        public UserModel GetByUser(string userLogin)
        {
            var user = _context.Users.FirstOrDefault(i => i.Login == userLogin);
            return user;
        }

        public UserModel GetUserById(int id)
        {
            var user = _context.Users.FirstOrDefault(i => i.Id == id);
            return user;
        }

        public UserModel GetUserByEmail(string email)
        {
            var user = _context.Users.FirstOrDefault(i => i.Email == email);
            return user;
        }

        public UserModel GetByUserFromToken(JwtSecurityToken token)
        {
            var user = new UserModel();
            foreach (var item in token.Claims)
            {
                if (item.Type == ClaimTypes.NameIdentifier)
                {
                    user = GetByUser(item.Value);
                    break;
                }
            }

            return user;
        }

        public List<UserModel> GetByUsersList()
        {
            var models = _context.Users.OrderBy(i => i.Role).ThenBy(i => i.Role.ToLower() != ConstParameters.USER_ROLE).
                ThenBy(i => i.Role.ToLower() == ConstParameters.USER_ROLE).ToList();
            return models;
        }

        public UserModel UpdateUser(UserRegisterModel model)
        {
            var user = _context.Users.FirstOrDefault(i => i.Id == model.UserId);
            if (user == null || !CheckUser(model.Login, model.Email))
            {
                return null;
            }

            var resultDate = DateTime.Compare(model.DateOfBirth, ConstParameters.DATE_MIN);

            user.Name = model.Name != string.Empty ? model.Name : user.Name;
            user.Surname = model.Surname != string.Empty ? model.Surname : user.Surname;
            user.Gender = model.Gender != string.Empty ? model.Gender : user.Gender;
            user.DateOfBirth = resultDate == 1 ? model.DateOfBirth.ToString("dd.MM.yyyy") : user.DateOfBirth;
            user.Email = model.Email != string.Empty ? model.Email : user.Email;
            user.Phone = model.Phone != string.Empty ? model.Phone : user.Phone;
            user.Login = model.Login != string.Empty ? model.Login : user.Login;
            user.Role = model.Role != string.Empty ? model.Role : user.Role;
            user.Img = model.Img != null ? _generalMethods.SaveImg(model.Img) : user.Img;
            user.ConfirmEmail = model.Email != string.Empty ? false : user.ConfirmEmail;

            _context.Users.Update(user);
            _context.SaveChanges();
            return user;
        }

        public UserModel UpdatePassword(string newPassword, UserModel model)
        {
            model.Password = BCrypt.Net.BCrypt.HashPassword(newPassword);
            _context.Users.Update(model);
            _context.SaveChanges();
            return model;
        }

        public void DeleteUser(int id)
        {
            var user = _context.Users.FirstOrDefault(i => i.Id == id);
            user.IsDeleted = true;
            var deleteAccount = new DeletedAccountModel()
            {
                UserId = user.Id,
                UserEmail = user.Email,
                DateOfRemovalFromDb = DateTime.Now.AddMonths(6),
                DateExpiresToken = DateTime.Now,
                RestoringToken = string.Empty,
            };

            _context.DeletedAccounts.Add(deleteAccount);
            _context.Users.Update(user);
            _context.SaveChanges();
        }

        public bool CheckUser(string login, string email)
        {
            var user = _context.Users.FirstOrDefault(i => i.Login.ToLower() == login.ToLower() || i.Email.ToLower() == email.ToLower());
            if (user == null)
            {
                return true;
            }

            return false;
        }
    }
}
