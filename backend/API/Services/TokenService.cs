using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using API.Interfaces;
using System.Runtime.Versioning;

namespace API.Services
{
    public class TokenService : ITokenService
    {
        private readonly SymmetricSecurityKey _key;
        private readonly UserManager<IdentityUser> _userManager;

        public TokenService(IConfiguration config, UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"] ?? string.Empty));
        }

        public async Task<string> CreateToken(IdentityUser user)
        {
            var roles = await _userManager.GetRolesAsync(user);
            //Including userID and Role claims
            var claims = new List<Claim>
           {
             new Claim(JwtRegisteredClaimNames.NameId, user.Id),
             new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName!),
             new Claim(ClaimTypes.Role,roles.FirstOrDefault() ?? "Member")
           };

            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }

}