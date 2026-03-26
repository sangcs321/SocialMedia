using Microsoft.EntityFrameworkCore;
using PublicModule.Server;
using PublicModule.Server.Models.User;
using PublicModule.Server.DTOs;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Cryptography;

using PublicModule.Server.DTOs.RequestDto;
using PublicModule.Server.DTOs.ResponseDto;
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

    public async Task<ApiResponse<LoginResponseDto>> LoginAsync(LoginRequestDto loginRequestDto)
    {
        // 1. Tìm user
        var user = await _context.User.FirstOrDefaultAsync(u => u.Email == loginRequestDto.Email);
        if (user == null) return new ApiResponse<LoginResponseDto> { IsError = true, Message = "Email hoặc mật khẩu không đúng!" };

        // 2. Kiểm tra mật khẩu
        if (!BCrypt.Net.BCrypt.Verify(loginRequestDto.Password, user.PasswordHash))
            return new ApiResponse<LoginResponseDto> { IsError = true, Message = "Email hoặc mật khẩu không đúng!" };

        // 3. Nếu mọi thứ OK -> Bắt đầu tạo Gói thông tin (Claims) để nhét vào Token
        var claims = new[]
        {
            // Nhét Id thẻ căn cước vào
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            // Nhét Email vào
            new Claim(ClaimTypes.Email, user.Email),
            // Nhét Tên vào
            new Claim(ClaimTypes.Name, user.Name),
            new Claim(ClaimTypes.Role, user.Role)
        };
        // 4. Lấy cái Secret Key từ JSON hồi nãy ra
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        // 5. Kết hợp tất cả lại để đúc (Mint) ra Token (Thẻ này có hạn 15 phút)
        var tokenDescriptor = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(15),
            signingCredentials: creds
        );
        // Chuyển kiểu Jwt obj thành dạng string "ey..." để trả về Frontend
        var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
        var refreshToken = GenerateRefreshToken();
        user.RefreshToken = refreshToken;
        user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
        await _context.SaveChangesAsync();
        return new ApiResponse<LoginResponseDto>
        {
            IsError = false,
            Message = "Đăng nhập thành công!",
            Data = new LoginResponseDto()
            {
                Email = user.Email,
                AccessToken = tokenString,
                RefreshToken = refreshToken,
                RefreshTokenExpiryTime = user.RefreshTokenExpiryTime ?? DateTime.UtcNow.AddDays(7)
            }
        };
    }

    public async Task<ApiResponse<LoginResponseDto>> RefreshTokenAsync(RefreshTokenDto refreshTokenDto)
    {
        var user = await _context.User.FirstOrDefaultAsync(u => u.RefreshToken == refreshTokenDto.RefreshToken);
        if (user == null) return new ApiResponse<LoginResponseDto> { IsError = true, Message = "Invalid refresh token" };

        if (user.RefreshTokenExpiryTime < DateTime.UtcNow) return new ApiResponse<LoginResponseDto> { IsError = true, Message = "Refresh token expired" };

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Name, user.Name),
            new Claim(ClaimTypes.Role, user.Role)
        };
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var tokenDescriptor = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(15),
            signingCredentials: creds
        );
        var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
        var refreshToken = GenerateRefreshToken();
        user.RefreshToken = refreshToken;
        user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
        await _context.SaveChangesAsync();
        return new ApiResponse<LoginResponseDto>
        {
            IsError = false,
            Message = "Refresh token successful",
            Data = new LoginResponseDto()
            {
                Email = user.Email,
                AccessToken = tokenString,
                RefreshToken = refreshToken,
                RefreshTokenExpiryTime = user.RefreshTokenExpiryTime ?? DateTime.UtcNow.AddDays(7)
            }
        };
    }

    public async Task<ApiResponse<string>> LogoutAsync(string email)
    {
        var user = await _context.User.FirstOrDefaultAsync(u => u.Email == email);
        if (user == null) return new ApiResponse<string>
        {
            IsError = true,
            Message = "There has been an error"
        };
        user.RefreshToken = null;
        user.RefreshTokenExpiryTime = null;

        await _context.SaveChangesAsync();
        return new ApiResponse<string>
        {
            IsError = false,
            Message = "Logout successful"
        };

    }
    private string GenerateRefreshToken()
    {
        var bytes = new byte[64];
        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(bytes);
        }
        return Convert.ToBase64String(bytes);
    }
}