using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;
using WebLibrary.Models;
using WebLibrary.Abstract;
using System.Security.Cryptography;
using Web.Data;
using WebLibrary.ConstParameters;

namespace Web.HelpersJwt
{
    public class JwtService : IJwt
    {
        private readonly IConfiguration _configuration;
        private readonly AppDBContext _context;

        public IEnumerable<RefreshTokenModel> RefreshTokens => _context.RefreshTokens;

        public JwtService(IConfiguration configuration, AppDBContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        public string GenerateJwt(UserModel model)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, model.Login),
                new Claim(ClaimTypes.Email, model.Email),
                new Claim(ClaimTypes.Role, model.Role)
            };

            var securityToken = new JwtSecurityToken
                (
                    _configuration["Jwt:Issuer"],
                    _configuration["Jwt:Audience"],
                    claims,
                    expires: DateTime.Now.AddMinutes(ConstParameters.EXPIRES_ACCESS_TOKEN_HOUR),
                    signingCredentials: credentials
                );

            var accessToken = new JwtSecurityTokenHandler().WriteToken(securityToken);

            return accessToken;
        }

        public JwtSecurityToken Verify(string jwtToken)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);
            tokenHandler.ValidateToken(jwtToken, new TokenValidationParameters
            {
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuerSigningKey = true,
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidIssuer = _configuration["Jwt:Issuer"],
                ValidAudience = _configuration["Jwt:Audience"],
            },
                out SecurityToken securityToken);

            var token = securityToken as JwtSecurityToken;

            return token;
        }

        public string GenerateRefreshToken(int userId)
        {
            var randomNumber = new byte[64];
            using var randomNumberGenerator = RandomNumberGenerator.Create();
            randomNumberGenerator.GetBytes(randomNumber);
            var refreshToken = Convert.ToBase64String(randomNumber);
            var token = RefreshTokens.FirstOrDefault(i => i.UserId == userId);
            if (token != null)
            {
                if (token.Expires == DateTime.Now)
                {
                    token.Token = refreshToken;
                    token.Created = DateTime.Now;
                    token.Expires = DateTime.Now.AddDays(ConstParameters.EXPIRES_REFRESH_TOKEN_DAYS);
                    token.IsActive = true;

                    _context.RefreshTokens.Update(token);
                    _context.SaveChanges();
                }
            }
            else
            {
                token = new RefreshTokenModel
                {
                    UserId = userId,
                    TokenId = new Random().Next(),
                    Token = refreshToken,
                    Created = DateTime.Now,
                    Expires = DateTime.Now.AddDays(ConstParameters.EXPIRES_REFRESH_TOKEN_DAYS),
                    IsActive = true
                };

                _context.RefreshTokens.Add(token);
                _context.SaveChanges();
            }

            return token.Token;
        }

        public RefreshTokenModel GetRefreshToken(int userId)
        {
            var refreshTokenModel = RefreshTokens.FirstOrDefault(i => i.UserId == userId);
            if (refreshTokenModel.Expires == DateTime.Now)
            {
                return null;
            }

            return refreshTokenModel;
        }
    }
}
