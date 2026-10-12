using System.ComponentModel.DataAnnotations;

namespace SistemaEstudoHelpAPI.DTOs;

public class LoginAlunoRequest
{
    [Required]
    public string Matricula { get; set; } = string.Empty;

    [Required]
    public string Senha { get; set; } = string.Empty;
}
