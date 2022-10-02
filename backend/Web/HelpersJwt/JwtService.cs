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
using Newtonsoft.Json.Linq;

namespace Web.HelpersJwt
{
    public class JwtService : IJwt
    {
        private readonly IConfiguration _configuration;
        private readonly AppDBContext _context;
        private readonly JWTConfiguration _jwtConfig;

        public IEnumerable<RefreshTokenModel> RefreshTokens => _context.RefreshTokens;

        public JwtService(IConfiguration configuration, AppDBContext context, JWTConfiguration jwtConfig)
        {
            _configuration = configuration;
            _context = context;
            _jwtConfig = jwtConfig;
        }

        public string GenerateJwt(UserModel model)
        {
            /*var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));*/
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtConfig.Key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, model.Login),
                new Claim(ClaimTypes.Email, model.Email),
                new Claim(ClaimTypes.Role, model.Role)
            };

            var now = DateTime.Now;
            var securityToken = new JwtSecurityToken
                (
                    /*_configuration["Jwt:Issuer"],
                    _configuration["Jwt:Audience"],*/
                    issuer: _jwtConfig.Issuer,
                    audience: _jwtConfig.Audience,
                    notBefore: now,
                    claims: claims,
                    expires: now.AddMinutes(ConstParameters.EXPIRES_ACCESS_TOKEN_HOUR),
                    signingCredentials: credentials
                );

            var accessToken = new JwtSecurityTokenHandler().WriteToken(securityToken);

            return accessToken;
        }

        public JwtSecurityToken Verify(string jwtToken)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            /*var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);*/
            var key = Encoding.UTF8.GetBytes(_jwtConfig.Key);
            tokenHandler.ValidateToken(jwtToken, new TokenValidationParameters
            {
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuerSigningKey = true,
                ValidateIssuer = true,
                ValidateAudience = true,
                /*ValidIssuer = _configuration["Jwt:Issuer"],
                ValidAudience = _configuration["Jwt:Audience"],*/
                ValidIssuer = _jwtConfig.Issuer,
                ValidAudience = _jwtConfig.Audience,
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
            var refreshTokenModel = RefreshTokens.FirstOrDefault(i => i.UserId == userId);
            if (refreshTokenModel != null)
            {
                var comparisonResult = DateTime.Compare(refreshTokenModel.TokenExpires, DateTime.Now);
                if (comparisonResult < 1)
                {
                    refreshTokenModel.Token = refreshToken;
                    refreshTokenModel.TokenExpires = DateTime.Now.AddDays(ConstParameters.EXPIRES_REFRESH_TOKEN_DAYS);
                    refreshTokenModel.IsActive = true;

                    _context.RefreshTokens.Update(refreshTokenModel);
                    _context.SaveChanges();
                }
            }
            else
            {
                refreshTokenModel = new RefreshTokenModel
                {
                    UserId = userId,
                    Token = refreshToken,
                    TokenExpires = DateTime.Now.AddDays(ConstParameters.EXPIRES_REFRESH_TOKEN_DAYS),
                    IsActive = true,
                };

                _context.RefreshTokens.Add(refreshTokenModel);
                _context.SaveChanges();
            }

            return refreshTokenModel.Token;
        }

        public RefreshTokenModel GetRefreshToken(int userId)
        {
            var refreshTokenModel = RefreshTokens.FirstOrDefault(i => i.UserId == userId);
            var comparisonResult = DateTime.Compare(refreshTokenModel.TokenExpires, DateTime.Now);
            if (comparisonResult < 1)
            {
                refreshTokenModel.IsActive = false;
            }

            return refreshTokenModel;
        }
    }
}
