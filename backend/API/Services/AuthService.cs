using Microsoft.AspNetCore.Identity;

using API.DTOs;
using API.Interfaces;

namespace API.Services
{
    public interface IAuthService
    {
        Task<IdentityResult> RegisterUserAsync(RegisterDto dto);
        Task<LoginResponseDto?> LoginUserAsync(LoginDto dto);

    }
    public class AuthService : IAuthService
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly ITokenService _tokenService;

        public AuthService(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager, SignInManager<IdentityUser> signInManager, ITokenService tokenService)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
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

        public async Task<LoginResponseDto?> LoginUserAsync(LoginDto dto)
        {
            var user = await _userManager.FindByNameAsync(dto.Username);
            if (user == null)
            {
                return null;
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, dto.Password, false);
            if (result.Succeeded)
            {
                // Return JWT token
                var token = await _tokenService.CreateToken(user);
                return new LoginResponseDto
                {
                    Username = user.UserName!,
                    Token = token
                };
            }
            return null;
        }
    }
}