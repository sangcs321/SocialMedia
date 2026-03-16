using Microsoft.AspNetCore.Mvc;
using PublicModule.Server.Models.User;

namespace PublicModule.Server.Controllers
{
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

    }
}