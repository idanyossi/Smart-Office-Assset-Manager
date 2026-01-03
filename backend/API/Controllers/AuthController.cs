using Microsoft.AspNetCore.Mvc;

using API.DTOs;
using API.Services;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            var result = await _authService.RegisterUserAsync(dto);
            if (result.Succeeded)
            {
                return Ok(new { Message = "User registered successfully" });
            }
            var firstErrorMessage = result.Errors.FirstOrDefault()?.Description ?? "Registration failed";
            return BadRequest(new { Message = firstErrorMessage });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var LoginResponse = await _authService.LoginUserAsync(dto);

            if (LoginResponse != null)
            {
                return Ok(new
                {
                    Username = LoginResponse.Username,
                    Token = LoginResponse.Token
                });
            }
            return Unauthorized(new { Message = "Invalid username or password" });
        }
    }
}
