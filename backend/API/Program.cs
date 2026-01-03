using API.Data;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using API.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddSingleton<IMongoClient>(sp =>
{
    var connectionString = builder.Configuration.GetSection("MongoDB:ConnectionString").Value;
    return new MongoClient(connectionString);
});

builder.Services.AddControllers();
builder.Services.AddOpenApi();

builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IAuthService, AuthService>();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://localhost:5173") // Allow both just in case
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        // This must match the key in your TokenService
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["TokenKey"]!)),
        ValidateIssuer = false, // Set to true if you want to validate the server
        ValidateAudience = false, // Set to true if you want to validate the receiver
        RoleClaimType = System.Security.Claims.ClaimTypes.Role // Important for RBAC
    };
});

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();

}

app.UseHttpsRedirection();


app.UseCors("AllowReactApp");

app.UseAuthentication();
app.UseAuthorization();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var logger = services.GetRequiredService<ILogger<Program>>();
    try
    {
        var context = services.GetRequiredService<AppDbContext>();

        // Add a simple retry logic for Docker startup
        int retries = 10;
        while (retries > 0)
        {
            try
            {
                await context.Database.MigrateAsync();
                break; // Success!
            }
            catch
            {
                retries--;
                if (retries == 0) throw;
                logger.LogWarning("Database not ready yet... retrying in 2 seconds");
                await Task.Delay(2000);
            }
        }
        await Task.Delay(1000); // Wait 2 seconds so the noisy "Attaching to..." logs finish first

        Console.WriteLine("\n\n\n\n\n\n\n\n\n\n");
        Console.WriteLine("############################################################");
        Console.WriteLine("#                                                          #");
        Console.WriteLine("#      SUCCESS: SMART-OFFICE SYSTEM IS ONLINE              #");
        Console.WriteLine("#      --------------------------------------              #");
        Console.WriteLine("#      Database Migrations: COMPLETED                      #");
        Console.WriteLine("#      Frontend UI:         http://localhost:3000          #");
        Console.WriteLine("#      Backend Swagger:     http://localhost:7061/swagger  #");
        Console.WriteLine("#                                                          #");
        Console.WriteLine("############################################################");
        Console.WriteLine("\n\n");
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "An error occurred during DB initialization");
    }
}


app.MapControllers();

app.Run();