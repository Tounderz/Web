using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using WebLibrary.Models;

namespace WebLibrary.Abstract
{
    public interface IJwt
    {
        IEnumerable<RefreshTokenModel> RefreshTokens { get; }
        string GenerateJwt(UserModel model);
        JwtSecurityToken Verify(string jwtToken);
        string GenerateRefreshToken(int userId);
        RefreshTokenModel GetRefreshToken(int userId);
    }
}
