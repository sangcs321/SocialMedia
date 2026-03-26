using Microsoft.AspNetCore.Mvc;
using PublicModule.Server.Models.User;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace PublicModule.Server.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private static List<User> users = new List<User>
        {
            new User { Id = 1, Name = "John Doe" },
            new User { Id = 2, Name = "Jane Smith" },
            new User { Id = 3, Name = "Jim Beam" }
        };

        [HttpGet]
        public ActionResult<User> Get()
        {
            return Ok(users);
        }
        [HttpGet("me")]
        public IActionResult GetMe()
        {
            // Trích xuất tự động qua Request có giữ Cookie
            var id = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var email = User.FindFirstValue(ClaimTypes.Email);
            var name = User.FindFirstValue(ClaimTypes.Name);
            var role = User.FindFirstValue(ClaimTypes.Role);

            if (string.IsNullOrEmpty(id))
            {
                return Unauthorized(new { Message = "Lỗi xác thực, token không hợp lệ hoặc đã hết hạn." });
            }

            // Trả về JSON chứa thông tin người dùng đang đăng nhập
            // Trình duyệt sẽ đọc thông tin này để nuôi Context / Redux
            return Ok(new
            {
                Data = new
                {
                    Id = id,
                    Email = email,
                    Name = name,
                    Role = role
                }
            });
        }

    }
}