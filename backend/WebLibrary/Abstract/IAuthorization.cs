using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using WebLibrary.Models;
using WebLibrary.Models.Dtos;

namespace WebLibrary.Abstract
{
    public interface IAuthorization
    {
        UserModel CreateUser(UserRegisterModel model);
        UserModel GetByUser(string userLogin);
        UserModel GetUserById(int id);
        UserModel GetUserByEmail(string email);
        UserModel UpdateUser(UserRegisterModel model);
        UserModel UpdatePassword(string newPassword, UserModel model);
        void DeleteUser(int id);
        UserModel GetByUserFromToken(JwtSecurityToken token);
        List<UserModel> GetByUsersList();
        UserDtoModel CreateUserDto(UserModel model);
        bool CheckUser(string login, string email);
    }
}
