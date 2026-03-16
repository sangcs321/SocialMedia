using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PublicModule.Server.Models.User;
using PublicModule.Server.DTOs;
using PublicModule.Server.Services;
namespace PublicModule.Server.Controllers
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
        public async Task<IActionResult> Register(RegisterDto registerDto)
        {
            var result = await _authService.RegisterAsync(registerDto);

            return result.IsError ? BadRequest(result.Message) : Ok(result.Message);
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            var result = await _authService.LoginAsync(loginDto);
            return result.IsError ? BadRequest(result.Message) : Ok(result.Data); // Chú ý result.Data chính là cái Token
        }

    }
}