using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SistemaEstudoHelpAPI.Models;

namespace SistemaEstudoHelpAPI.Data;

public static class AlunoInicializador
{
    public static async Task InicializarAsync(AppDbContext db)
    {
        await db.Database.ExecuteSqlRawAsync("""
            CREATE TABLE IF NOT EXISTS "Alunos" (
                "Id" INTEGER NOT NULL CONSTRAINT "PK_Alunos"
                    PRIMARY KEY AUTOINCREMENT,
                "Nome" TEXT NOT NULL,
                "Matricula" TEXT NOT NULL,
                "SenhaHash" TEXT NOT NULL,
                "Ativo" INTEGER NOT NULL DEFAULT 1
            );
            """);

        await db.Database.ExecuteSqlRawAsync("""
            CREATE UNIQUE INDEX IF NOT EXISTS "IX_Alunos_Matricula"
            ON "Alunos" ("Matricula");
            """);

        var matricula = Environment.GetEnvironmentVariable(
            "HELP_ALUNO_1_MATRICULA")?.Trim();
        var nome = Environment.GetEnvironmentVariable(
            "HELP_ALUNO_1_NOME")?.Trim();
        var senha = Environment.GetEnvironmentVariable(
            "HELP_ALUNO_1_SENHA");

        var dadosInformados = new[]
        {
            !string.IsNullOrWhiteSpace(matricula),
            !string.IsNullOrWhiteSpace(nome),
            !string.IsNullOrWhiteSpace(senha)
        };

        if (!dadosInformados.Any(x => x))
        {
            Console.WriteLine(
                "Tabela de alunos pronta. Nenhum aluno inicial configurado.");
            return;
        }

        if (!dadosInformados.All(x => x))
        {
            throw new InvalidOperationException(
                "Configure HELP_ALUNO_1_MATRICULA, HELP_ALUNO_1_NOME " +
                "e HELP_ALUNO_1_SENHA para cadastrar o aluno inicial.");
        }

        if (senha!.Length < 8)
        {
            throw new InvalidOperationException(
                "A senha do aluno inicial deve ter pelo menos 8 caracteres.");
        }

        var matriculaNormalizada = matricula!.ToUpperInvariant();

        var existente = await db.Alunos
            .SingleOrDefaultAsync(a => a.Matricula == matriculaNormalizada);

        if (existente is not null)
        {
            Console.WriteLine(
                "A matrícula inicial já existe. Nenhum dado foi alterado.");
            return;
        }

        var aluno = new Aluno
        {
            Nome = nome!,
            Matricula = matriculaNormalizada,
            Ativo = true
        };

        aluno.SenhaHash = new PasswordHasher<Aluno>()
            .HashPassword(aluno, senha);

        db.Alunos.Add(aluno);
        await db.SaveChangesAsync();

        Console.WriteLine("Aluno inicial cadastrado com sucesso.");
    }
}
