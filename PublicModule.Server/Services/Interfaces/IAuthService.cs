using PublicModule.Server.DTOs.RequestDto;
using PublicModule.Server.DTOs.ResponseDto;
using PublicModule.Server;
using PublicModule.Server.DTOs;

public interface IAuthService
{
    Task<ApiResponse<string>> RegisterAsync(RegisterDto registerDto);
    Task<ApiResponse<LoginResponseDto>> LoginAsync(LoginRequestDto loginRequestDto);
    Task<ApiResponse<LoginResponseDto>> RefreshTokenAsync(RefreshTokenDto refreshTokenDto);
    Task<ApiResponse<string>> LogoutAsync(string email);
}