using Microsoft.EntityFrameworkCore;
using SistemaEstudoHelpAPI.Models;

namespace SistemaEstudoHelpAPI.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Administrador> Administradores => Set<Administrador>();
    public DbSet<Aluno> Alunos => Set<Aluno>();
}
