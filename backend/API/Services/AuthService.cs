using Microsoft.AspNetCore.Identity;

using API.DTOs;

namespace API.Services
{
    public interface IAuthService
    {
        Task<IdentityResult> RegisterUserAsync(RegisterDto dto);
    }
    public class AuthService : IAuthService
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AuthService(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task<IdentityResult> RegisterUserAsync(RegisterDto dto)
        {
            var user = new IdentityUser { UserName = dto.Username };
            var result = await _userManager.CreateAsync(user, dto.Password);

            if (result.Succeeded)
            {
                if (!await _roleManager.RoleExistsAsync(dto.Role))
                {
                    await _roleManager.CreateAsync(new IdentityRole(dto.Role));
                }
                await _userManager.AddToRoleAsync(user, dto.Role);
            }
            return result;
        }
    }
}