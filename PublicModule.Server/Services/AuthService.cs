using Microsoft.EntityFrameworkCore;
using PublicModule.Server;
using PublicModule.Server.Models.User;
using PublicModule.Server.DTOs;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;

namespace PublicModule.Server.Services;
public class AuthService : IAuthService
{
    private readonly ApplicationDbContext _context;
    private readonly IConfiguration _configuration;
    public AuthService(ApplicationDbContext context, IConfiguration configuration) { _context = context; _configuration = configuration; }

    public async Task<ApiResponse<string>> RegisterAsync(RegisterDto registerDto)
    {
        // 1. Kiểm tra tồn tại
        var userExists = await _context.User.AnyAsync(u => u.Email == registerDto.Email);
        if (userExists) return new ApiResponse<string> { IsError = true, Message = "Email already exists" };

        // 2. Hash mật khẩu & Tạo Model
        var user = new User
        {
            Name = registerDto.Name,
            Email = registerDto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(registerDto.Password),
        };

        // 3. Lưu vào DB
        await _context.User.AddAsync(user);
        await _context.SaveChangesAsync();

        return new ApiResponse<string> { IsError = false, Message = "Register successful" };
    }

    public async Task<ApiResponse<string>> LoginAsync(LoginDto loginDto)
    {
        // 1. Tìm user
        var user = await _context.User.FirstOrDefaultAsync(u => u.Email == loginDto.Email);
        if (user == null) return new ApiResponse<string> { IsError = true, Message = "Email hoặc mật khẩu không đúng!" };

        // 2. Kiểm tra mật khẩu
        if (!BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash))
            return new ApiResponse<string> { IsError = true, Message = "Email hoặc mật khẩu không đúng!" };

        // 3. Nếu mọi thứ OK -> Bắt đầu tạo Gói thông tin (Claims) để nhét vào Token
        var claims = new[]
        {
            // Nhét Id thẻ căn cước vào
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            // Nhét Email vào
            new Claim(ClaimTypes.Email, user.Email),
            // Nhét Tên vào
            new Claim(ClaimTypes.Name, user.Name)
        };
        // 4. Lấy cái Secret Key từ JSON hồi nãy ra
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        // 5. Kết hợp tất cả lại để đúc (Mint) ra Token (Thẻ này có hạn 1 ngày = 24 tiếng)
        var tokenDescriptor = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddDays(1),
            signingCredentials: creds
        );
        // Chuyển kiểu Jwt obj thành dạng string "ey..." để trả về Frontend
        var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
        return new ApiResponse<string>
        {
            IsError = false,
            Message = "Đăng nhập thành công!",
            Data = tokenString
        };
    }
}