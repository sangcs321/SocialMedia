
using PublicModule.Server;
using PublicModule.Server.DTOs;

public interface IAuthService
{
    Task<ApiResponse<string>> RegisterAsync(RegisterDto registerDto);
    Task<ApiResponse<string>> LoginAsync(LoginDto loginDto);
}