namespace PublicModule.Server.DTOs.ResponseDto;

public class LoginResponseDto
{
    public string Email { get; set; } = string.Empty;
    public string AccessToken { get; set; } = string.Empty;

    public string RefreshToken { get; set; } = string.Empty;
    public DateTime RefreshTokenExpiryTime { get; set; } = DateTime.UtcNow.AddDays(7);
}
