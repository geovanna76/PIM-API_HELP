using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using SistemaEstudoHelpAPI.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();

builder.Services.AddCors(options =>
{
    options.AddPolicy("FlutterDevelopment", policy =>
    {
        policy
            .SetIsOriginAllowed(origin =>
                origin.StartsWith("http://localhost:") ||
                origin.StartsWith("http://127.0.0.1:") ||
                origin.Contains(".app.github.dev"))
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(
        builder.Configuration.GetConnectionString("DefaultConnection")
    )
);

var chave = Environment.GetEnvironmentVariable("HELP_JWT_KEY");

if (string.IsNullOrWhiteSpace(chave) ||
    Encoding.UTF8.GetByteCount(chave) < 32)
{
    throw new InvalidOperationException(
        "A variável HELP_JWT_KEY precisa conter uma chave de pelo menos 32 bytes."
    );
}

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(chave)
            ),
            ClockSkew = TimeSpan.FromSeconds(30)
        };
    });

builder.Services.AddAuthorization();

var frontEndPath = Path.GetFullPath(
    Path.Combine(builder.Environment.ContentRootPath, "..", "FrontEnd")
);

if (!Directory.Exists(frontEndPath))
{
    throw new DirectoryNotFoundException(
        $"Pasta do front-end não encontrada: {frontEndPath}"
    );
}

var frontEndProvider = new PhysicalFileProvider(frontEndPath);

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    await AdministradorInicializador.InicializarAsync(db);
    await AlunoInicializador.InicializarAsync(db);
}

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseDefaultFiles(new DefaultFilesOptions
{
    FileProvider = frontEndProvider
});

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = frontEndProvider
});

app.UseCors("FlutterDevelopment");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
