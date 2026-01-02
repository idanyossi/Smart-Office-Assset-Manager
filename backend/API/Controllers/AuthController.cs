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
            return BadRequest(result.Errors);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var token = await _authService.LoginUserAsync(dto);
            if (token != null)
            {
                return Ok(new
                {
                    Username = dto.Username,
                    Token = token
                });
            }
            return Unauthorized(new { Message = "Invalid username or password" });
        }
    }
}
