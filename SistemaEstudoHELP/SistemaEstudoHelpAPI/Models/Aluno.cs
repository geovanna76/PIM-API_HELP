using System.ComponentModel.DataAnnotations;

namespace SistemaEstudoHelpAPI.Models;

public class Aluno
{
    public int Id { get; set; }

    [Required]
    public string Nome { get; set; } = string.Empty;

    [Required]
    public string Matricula { get; set; } = string.Empty;

    [Required]
    public string SenhaHash { get; set; } = string.Empty;

    public bool Ativo { get; set; } = true;
}
