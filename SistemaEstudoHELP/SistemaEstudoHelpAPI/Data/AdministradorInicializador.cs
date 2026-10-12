using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SistemaEstudoHelpAPI.Models;

namespace SistemaEstudoHelpAPI.Data;

public static class AdministradorInicializador
{
    public static async Task InicializarAsync(AppDbContext db)
    {
        await db.Database.EnsureCreatedAsync();

        if (await db.Administradores.AnyAsync())
        {
            Console.WriteLine("Já existem administradores no banco. Nenhum cadastro foi alterado.");
            return;
        }

        var hasher = new PasswordHasher<Administrador>();
        var administradores = new List<Administrador>();

        for (int i = 1; i <= 5; i++)
        {
            var nome = Environment.GetEnvironmentVariable($"HELP_ADMIN_{i}_NOME");
            var email = Environment.GetEnvironmentVariable($"HELP_ADMIN_{i}_EMAIL");
            var senha = Environment.GetEnvironmentVariable($"HELP_ADMIN_{i}_SENHA");

            if (string.IsNullOrWhiteSpace(nome) ||
                string.IsNullOrWhiteSpace(email) ||
                string.IsNullOrWhiteSpace(senha))
            {
                throw new InvalidOperationException(
                    $"Faltam variáveis de ambiente para o administrador {i}."
                );
            }

            if (senha.Length < 12)
                throw new InvalidOperationException(
                    $"A senha do administrador {i} deve ter pelo menos 12 caracteres."
                );

            var administrador = new Administrador
            {
                Nome = nome.Trim(),
                Email = email.Trim().ToLowerInvariant(),
                Ativo = true
            };

            administrador.SenhaHash =
                hasher.HashPassword(administrador, senha);

            administradores.Add(administrador);
        }

        if (administradores.Select(a => a.Email).Distinct().Count() != 5)
            throw new InvalidOperationException(
                "Os cinco administradores devem ter e-mails diferentes."
            );

        db.Administradores.AddRange(administradores);
        await db.SaveChangesAsync();

        Console.WriteLine("Cinco administradores cadastrados com sucesso.");
    }
}
