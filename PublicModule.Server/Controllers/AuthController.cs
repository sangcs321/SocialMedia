using Microsoft.AspNetCore.Mvc;
using PublicModule.Server.DTOs;
using PublicModule.Server.DTOs.RequestDto;

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
        public async Task<IActionResult> Login(LoginRequestDto loginRequestDto)
        {
            var result = await _authService.LoginAsync(loginRequestDto);
            
            if (result.IsError || result.Data == null) 
                return BadRequest(result.Message);

            // Tạo hộp chứa Cookie bảo mật
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true, // Cần HTTPS
                SameSite = SameSiteMode.None, 
                Expires = DateTime.UtcNow.AddDays(7)
            };

            // Gắn token vào Cookie
            Response.Cookies.Append("accessToken", result.Data.AccessToken, cookieOptions);
            Response.Cookies.Append("refreshToken", result.Data.RefreshToken, cookieOptions);

            return Ok(new { Message = "Đăng nhập thành công!", Email = result.Data.Email });
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> RefreshToken()
        {
            // Lấy refreshToken từ Cookie thay vì DTO
            var refreshToken = Request.Cookies["refreshToken"];
            if (string.IsNullOrEmpty(refreshToken))
                return BadRequest("Không tìm thấy Refresh Token trong Cookie.");

            var refreshTokenDto = new RefreshTokenDto { RefreshToken = refreshToken };
            var result = await _authService.RefreshTokenAsync(refreshTokenDto);

            if (result.IsError || result.Data == null) 
                return BadRequest(result.Message);

            // Cập nhật lại cấu hình Cookie mới mới
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None, 
                Expires = DateTime.UtcNow.AddDays(7)
            };

            Response.Cookies.Append("accessToken", result.Data.AccessToken, cookieOptions);
            Response.Cookies.Append("refreshToken", result.Data.RefreshToken, cookieOptions);

            return Ok(new { Message = "Làm mới Token thành công!" });
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("accessToken");
            Response.Cookies.Delete("refreshToken");
            return Ok(new { Message = "Đã đăng xuất" });
        }

    }
}