using System.ComponentModel.DataAnnotations;

namespace SistemaEstudoHelpAPI.Models;

public class Administrador
{
    public int Id { get; set; }

    [Required]
    public string Nome { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string SenhaHash { get; set; } = string.Empty;

    public bool Ativo { get; set; } = true;
}
