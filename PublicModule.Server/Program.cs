using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.OpenApi;
using PublicModule.Server.Models.Me;
using PublicModule.Server;
// Dòng này không cần thiết khi dùng SpaProxy, nhưng có thể giữ lại nếu bạn dùng các extension khác.
// using Microsoft.AspNetCore.SpaServices.Extensions; 

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// DB context
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// KHÔNG CẦN THÊM AddSpaStaticFiles VÀO ĐÂY NỮA
// Vì cấu hình SpaRoot trong .csproj đã thay thế việc này.

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// ----------------------------------------------------
// CẤU HÌNH SPA (Dùng cơ chế SpaProxy tự động)
// ----------------------------------------------------

// 1. Phục vụ các file tĩnh (CSS/JS/Images)
// Phương thức này cũng phục vụ các file tĩnh của React sau khi build (trong Production)
// và thiết lập proxy đến React Dev Server (trong Development) khi kết hợp với SpaProxy.
app.UseStaticFiles(); 

// 2. Fallback cho tất cả các đường dẫn không phải API
// Nếu không khớp với API nào, nó sẽ trả về index.html của ứng dụng React.
app.MapFallbackToFile("index.html");

// ----------------------------------------------------
// API ENDPOINTS
// ----------------------------------------------------

var summaries = new[]
{
    "Freezing","Bracing","Chilly","Cool","Mild","Warm","Balmy","Hot","Sweltering","Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast(
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        )).ToArray();

    return forecast;
})
.WithName("GetWeatherForecast");

app.MapGet("/me", async (ApplicationDbContext db) =>
{
    return await db.Me.ToListAsync();
});

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}