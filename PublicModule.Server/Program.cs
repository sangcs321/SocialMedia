using Microsoft.EntityFrameworkCore;
using PublicModule.Server;


// Add services to the container.
var builder = WebApplication.CreateBuilder(args);

// 1. Cấu hình dịch vụ (Services)

// Thêm dịch vụ cho Controllers (cần thiết cho MVC/API)
builder.Services.AddControllers(); 
// Thêm dịch vụ cho Swagger/OpenAPI (giúp kiểm tra API dễ hơn)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// 2. Cấu hình Pipeline Middleware

// Sử dụng Swagger UI trong môi trường phát triển
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Bắt buộc phải có để định tuyến yêu cầu HTTP đến đúng Controller
app.UseAuthorization();
app.MapControllers(); // Map tất cả các Controllers (như BooksController)

app.Run();