# Sistema de Estudo HELP

**Projeto Integrador Multidisciplinar (PIM VII)**  
**Universidade Paulista (UNIP)**  
**Curso:** Análise e Desenvolvimento de Sistemas (ADS)

---

## Sobre o projeto

O **Sistema de Estudo HELP** é um projeto acadêmico desenvolvido no âmbito do Projeto Integrador Multidisciplinar VII (PIM VII), do curso de Análise e Desenvolvimento de Sistemas da Universidade Paulista (UNIP).

A proposta consiste no desenvolvimento de uma solução tecnológica voltada à organização e ao gerenciamento do ambiente educacional, integrando uma aplicação Web administrativa, uma API REST e uma interface mobile destinada aos estudantes.

O sistema busca centralizar informações acadêmicas, facilitar o acesso às funcionalidades de acordo com o perfil do usuário e demonstrar a aplicação prática dos conhecimentos adquiridos ao longo do curso, incluindo desenvolvimento Web, programação mobile, integração entre sistemas, persistência de dados e segurança da informação.

Além dos aspectos tecnológicos, o projeto considera a importância da inclusão, da diversidade e das relações étnico-raciais no ambiente educacional e organizacional.

## Objetivos

### Objetivo geral

Desenvolver uma solução tecnológica integrada para apoiar o gerenciamento de informações acadêmicas e proporcionar aos estudantes uma interface de acesso aos serviços do sistema.

### Objetivos específicos

- Desenvolver uma interface Web para administração das informações acadêmicas.
- Implementar uma API REST para comunicação entre as aplicações e o banco de dados.
- Desenvolver uma aplicação mobile utilizando Flutter e Dart.
- Implementar autenticação para os diferentes perfis de acesso previstos no sistema.
- Organizar e centralizar dados de alunos, professores e matérias.
- Aplicar conceitos de arquitetura de software, integração de sistemas e persistência de dados.
- Considerar práticas de segurança da informação e proteção de credenciais.
- Relacionar o desenvolvimento tecnológico a princípios de inclusão, diversidade e responsabilidade social.

## Funcionalidades e módulos

### 1. Aplicação Web administrativa

A aplicação Web é destinada à administração do sistema e contempla a estrutura visual e os módulos de gerenciamento administrativo.

Entre as funcionalidades previstas e desenvolvidas na interface estão:

- **Login administrativo:** acesso restrito à administração.
- **Dashboard:** visualização de indicadores e informações gerais.
- **Matérias:** consulta das informações das matérias cadastradas.
- **Professores:** visualização dos dados dos professores.
- **Alunos:** visualização dos dados dos estudantes.

A interface Web utiliza HTML, CSS e JavaScript, com comunicação com a API para obtenção das informações. As operações disponíveis dependem dos endpoints implementados no backend.

### 2. API REST

A API funciona como camada de comunicação entre as interfaces e a lógica do sistema, organizando o acesso aos dados e os processos de autenticação.

A implementação utiliza ASP.NET Core e C#. O projeto também utiliza SQLite como banco de dados e Entity Framework Core para o acesso e o mapeamento dos dados.

A API contempla os recursos de autenticação e acesso às informações acadêmicas, incluindo o fluxo de login dos estudantes.

### 3. Aplicação mobile

A aplicação mobile foi desenvolvida com Flutter e Dart, com foco na experiência de acesso dos estudantes.

A interface contempla:

- Tela de login do estudante.
- Autenticação por matrícula e senha.
- Comunicação com a API REST.
- Navegação para a área inicial do estudante após a autenticação bem-sucedida.

A integração permite que a aplicação utilize os serviços disponibilizados pelo backend, evitando a necessidade de implementar uma estrutura de dados independente para o aplicativo.

## Arquitetura da solução

O projeto utiliza uma arquitetura composta por três partes principais:

```text
Sistema de Estudo HELP
│
├── FrontEnd Web
│   ├── HTML
│   ├── CSS
│   └── JavaScript
│
├── SistemaEstudoHelpAPI
│   ├── ASP.NET Core
│   ├── C#
│   ├── Endpoints REST
│   ├── Autenticação
│   └── Entity Framework Core
│
├── Banco de dados
│   └── SQLite
│
└── mobile
    ├── Flutter
    ├── Dart
    └── Integração HTTP com a API
```

A aplicação Web e o aplicativo mobile consomem os serviços disponibilizados pela API. O backend é responsável por processar as requisições e interagir com o banco de dados.

Essa separação favorece a organização do código, a manutenção da solução e a possibilidade de evolução independente das interfaces.

## Tecnologias utilizadas

| Tecnologia | Aplicação no projeto |
|---|---|
| C# | Implementação da lógica do backend |
| ASP.NET Core | Desenvolvimento da API REST |
| Entity Framework Core | Acesso e mapeamento dos dados |
| SQLite | Persistência de dados |
| HTML5 | Estrutura da interface Web |
| CSS3 | Estilização das telas Web |
| JavaScript | Interações e comunicação da interface Web com a API |
| Flutter | Desenvolvimento da interface mobile |
| Dart | Linguagem utilizada no aplicativo Flutter |
| Git e GitHub | Versionamento e hospedagem do código-fonte |
| GitHub Codespaces | Ambiente de desenvolvimento na nuvem |

## Organização do repositório

A estrutura geral do repositório está organizada em diretórios separados por responsabilidade:

```text
SistemaEstudoHELP/
├── FrontEnd/
│   └── Arquivos da interface Web administrativa
│
├── SistemaEstudoHelpAPI/
│   └── Projeto backend em ASP.NET Core
│
├── mobile/
│   ├── lib/
│   │   └── main.dart
│   ├── test/
│   ├── web/
│   └── pubspec.yaml
│
├── .gitignore
└── README.md
```

A estrutura apresentada é uma referência da organização do projeto. Os arquivos e subdiretórios efetivamente presentes podem variar conforme a evolução da implementação.

## Ambiente de desenvolvimento

O desenvolvimento foi realizado utilizando o **GitHub Codespaces**, ambiente de desenvolvimento em nuvem que permite editar e executar o código diretamente pelo navegador.

Essa escolha possibilitou trabalhar com as tecnologias do projeto sem depender da instalação de todo o ambiente de desenvolvimento na máquina local.

O GitHub também é utilizado para armazenar o código-fonte e acompanhar as alterações realizadas durante o desenvolvimento.

## Como executar o projeto

A execução depende da configuração do ambiente, das dependências instaladas e da disponibilidade dos serviços necessários.

### Pré-requisitos

- Git.
- .NET SDK compatível com o projeto.
- Flutter SDK e Dart para a aplicação mobile.
- Navegador Web.
- Dependências do projeto restauradas.
- Configuração de acesso à API e ao banco de dados.

### 1. Obter o código-fonte

```bash
git clone URL_DO_REPOSITORIO
cd SistemaEstudoHELP
```

Substitua `URL_DO_REPOSITORIO` pela URL real do repositório GitHub.

### 2. Executar a API

Entre no diretório da API:

```bash
cd SistemaEstudoHelpAPI
dotnet restore
dotnet build
dotnet run
```

A URL e a porta utilizadas pela API dependem da configuração do ambiente. Em um Codespace, pode ser necessário encaminhar a porta e configurar a visibilidade para permitir o acesso pela interface Web ou mobile.

### 3. Executar a aplicação mobile

Em outro terminal, entre no diretório mobile:

```bash
cd mobile
flutter pub get
```

Para executar a aplicação no navegador:

```bash
flutter run -d web-server \
  --web-hostname 0.0.0.0 \
  --web-port 8090
```

A aplicação precisa estar configurada com a URL acessível da API. Em ambientes remotos, essa URL pode variar entre sessões.

### 4. Executar a interface Web administrativa

Abra os arquivos do diretório `FrontEnd` conforme a estrutura de execução adotada pelo projeto.

Caso a interface utilize JavaScript para realizar requisições à API, configure a URL base para o endereço acessível do backend e verifique as permissões de CORS e a configuração de autenticação.

**Observação:** os comandos acima apresentam o fluxo geral de execução. A inicialização completa depende das configurações efetivas dos arquivos do repositório.

## Segurança da informação

A segurança é um aspecto importante da solução, especialmente por envolver autenticação e informações acadêmicas.

Entre os cuidados relevantes para a evolução e a execução do sistema estão:

- Armazenar senhas utilizando mecanismos apropriados de hash, sem manter senhas em texto puro.
- Evitar publicar tokens, chaves secretas, senhas e credenciais nos arquivos versionados.
- Validar os dados recebidos pela API.
- Configurar corretamente a autenticação e a autorização dos endpoints.
- Utilizar conexões HTTPS quando disponíveis.
- Controlar a exposição das portas e dos serviços executados no ambiente de desenvolvimento.

As medidas efetivamente implementadas devem ser verificadas no código-fonte e nas configurações do projeto.

## Inclusão, diversidade e responsabilidade social

O PIM VII também estabelece uma relação entre tecnologia, inclusão e responsabilidade social.

Nesse contexto, o projeto considera a relevância das relações étnico-raciais e da afrodescendência, buscando reconhecer a diversidade como um aspecto importante para o desenvolvimento de ambientes educacionais e organizacionais mais inclusivos.

A discussão considera como referências as seguintes legislações brasileiras:

- **Lei nº 10.639/2003:** estabelece a obrigatoriedade do ensino de História e Cultura Afro-Brasileira nos termos da legislação educacional.
- **Lei nº 11.645/2008:** amplia essa obrigatoriedade para incluir História e Cultura Afro-Brasileira e Indígena.

Essas referências contribuem para a reflexão sobre práticas antidiscriminatórias, valorização da diversidade e responsabilidade social no contexto do projeto.

## Testes e validação

Durante o desenvolvimento, foram realizados testes relacionados à compilação, à análise do código e à integração da aplicação mobile com a API.

Os registros do desenvolvimento indicaram os seguintes resultados em etapas anteriores:

- Compilação da API com `dotnet build`.
- Análise estática do aplicativo com `flutter analyze`.
- Execução de testes automatizados com `flutter test`.
- Geração da versão Web com `flutter build web`.
- Validação do fluxo de login do estudante com a matrícula de teste `2026001`.

Esses resultados correspondem às verificações realizadas nas etapas registradas do desenvolvimento e não representam, isoladamente, uma certificação de que todas as funcionalidades estão concluídas ou livres de falhas.

## Status do projeto

O Sistema de Estudo HELP está em desenvolvimento acadêmico, com implementação da estrutura backend, interface Web administrativa e aplicação mobile integrada à API.

A evolução do projeto envolve a implementação, a integração, a validação e a documentação dos componentes da solução.

O estado de cada funcionalidade deve ser conferido na versão mais recente do código-fonte.

## Contexto acadêmico

**Instituição:** Universidade Paulista (UNIP)  
**Curso:** Análise e Desenvolvimento de Sistemas (ADS)  
**Projeto:** Projeto Integrador Multidisciplinar VII (PIM VII)  
**Sistema:** Sistema de Estudo HELP

O projeto tem finalidade acadêmica e demonstra a aplicação prática de conceitos de desenvolvimento de software, integração entre aplicações, banco de dados, autenticação e responsabilidade social.

## Licença

Este projeto foi desenvolvido para fins acadêmicos. A definição de uma licença de distribuição deve ser realizada pelos responsáveis pelo projeto antes de autorizar formalmente seu uso, sua modificação ou sua redistribuição por terceiros.
