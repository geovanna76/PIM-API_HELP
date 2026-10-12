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
[Route("api/alunos")]
public class AlunosController : ControllerBase
{
    private readonly AppDbContext _db;

    public AlunosController(AppDbContext db)
    {
        _db = db;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginAlunoRequest request)
    {
        var matricula = request.Matricula.Trim().ToUpperInvariant();

        var aluno = await _db.Alunos
            .SingleOrDefaultAsync(a => a.Matricula == matricula && a.Ativo);

        if (aluno is null)
            return Unauthorized(new { mensagem = "Matrícula ou senha inválidas." });

        var resultado = new PasswordHasher<Aluno>()
            .VerifyHashedPassword(aluno, aluno.SenhaHash, request.Senha);

        if (resultado == PasswordVerificationResult.Failed)
            return Unauthorized(new { mensagem = "Matrícula ou senha inválidas." });

        var chave = Environment.GetEnvironmentVariable("HELP_JWT_KEY");

        if (string.IsNullOrWhiteSpace(chave) ||
            Encoding.UTF8.GetByteCount(chave) < 32)
        {
            return StatusCode(500, new
            {
                mensagem = "A autenticação não está configurada corretamente."
            });
        }

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, aluno.Id.ToString()),
            new Claim(ClaimTypes.Name, aluno.Nome),
            new Claim(ClaimTypes.Role, "Aluno"),
            new Claim("matricula", aluno.Matricula)
        };

        var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(chave));
        var credentials = new SigningCredentials(
            signingKey, SecurityAlgorithms.HmacSha256);

        var agora = DateTime.UtcNow;
        var token = new JwtSecurityToken(
            null,
            null,
            claims,
            agora,
            agora.AddHours(2),
            credentials);

        return Ok(new
        {
            mensagem = "Login realizado com sucesso.",
            token = new JwtSecurityTokenHandler().WriteToken(token),
            tipo = "Bearer",
            expiraEm = token.ValidTo,
            aluno = new
            {
                aluno.Id,
                aluno.Nome,
                aluno.Matricula
            }
        });
    }
}
