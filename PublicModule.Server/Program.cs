using Microsoft.EntityFrameworkCore;
using PublicModule.Server;
using PublicModule.Server.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;


// Add services to the container.
var builder = WebApplication.CreateBuilder(args);

// 1. Cấu hình dịch vụ (Services)

// Đăng ký DB (Lấy chuỗi kết nối từ appsettings.json)
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Thêm dịch vụ cho Controllers (cần thiết cho MVC/API)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("https://localhost:5173") // URL của React (Vite thường dùng port này)
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

builder.Services.AddControllers();

// --- THÊM PHẦN NÀY ĐỂ CẤU HÌNH JWT ---
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
    };
});

// Thêm dịch vụ cho Swagger/OpenAPI (giúp kiểm tra API dễ hơn)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Đăng ký Service DI
builder.Services.AddScoped<IAuthService, AuthService>();

var app = builder.Build();

// 2. Cấu hình Pipeline Middleware

// Sử dụng Swagger UI trong môi trường phát triển

app.UseRouting();

app.UseCors("AllowReactApp");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Cấu hình Pipeline Middleware
// --- THÊM DÒNG NÀY ĐỂ BẬT KIỂM TRA ĐĂNG NHẬP ---
app.UseAuthentication();
// Bắt buộc phải có để định tuyến yêu cầu HTTP đến đúng Controller
app.UseAuthorization();

app.MapControllers(); // Map tất cả các Controllers (như BooksController)

app.Run();