using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SistemaEstudoHelpAPI.Data;
using SistemaEstudoHelpAPI.DTOs;
using SistemaEstudoHelpAPI.Models;

namespace SistemaEstudoHelpAPI.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly IConfiguration _config;

    public AuthController(AppDbContext db, IConfiguration config)
    {
        _db = db;
        _config = config;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var email = request.Email.Trim().ToLowerInvariant();

        var administrador = await _db.Administradores
            .SingleOrDefaultAsync(a => a.Email == email && a.Ativo);

        if (administrador is null)
            return Unauthorized(new { mensagem = "E-mail ou senha inválidos." });

        var hasher = new PasswordHasher<Administrador>();
        var resultado = hasher.VerifyHashedPassword(
            administrador,
            administrador.SenhaHash,
            request.Senha
        );

        if (resultado == PasswordVerificationResult.Failed)
            return Unauthorized(new { mensagem = "E-mail ou senha inválidos." });

        var chave = Environment.GetEnvironmentVariable("HELP_JWT_KEY");

        if (string.IsNullOrWhiteSpace(chave) || Encoding.UTF8.GetByteCount(chave) < 32)
            return StatusCode(500, new { mensagem = "A autenticação não está configurada corretamente." });

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, administrador.Id.ToString()),
            new Claim(ClaimTypes.Name, administrador.Nome),
            new Claim(ClaimTypes.Email, administrador.Email),
            new Claim(ClaimTypes.Role, "Administrador")
        };

        var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(chave));
        var credentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.UtcNow.AddHours(2),
            signingCredentials: credentials
        );

        return Ok(new
        {
            mensagem = "Login realizado com sucesso.",
            token = new JwtSecurityTokenHandler().WriteToken(token),
            tipo = "Bearer",
            expiraEm = token.ValidTo,
            administrador = new
            {
                administrador.Id,
                administrador.Nome,
                administrador.Email
            }
        });
    }
}
