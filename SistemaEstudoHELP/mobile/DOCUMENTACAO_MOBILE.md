# Documentação Técnica — Aplicativo Mobile Sistema de Estudo HELP

**Projeto:** Sistema de Estudo HELP  
**Módulo:** Aplicativo do aluno  
**Tecnologias:** Flutter, Dart, ASP.NET Core Web API, SQLite e JWT  
**Ambiente:** GitHub Codespaces  
**Período dos testes:** Outubro de 2026

## 1. Introdução

O aplicativo mobile do Sistema de Estudo HELP foi desenvolvido para permitir que os alunos acessem o sistema por meio de uma interface adaptada a dispositivos móveis.

A aplicação utiliza Flutter e Dart e se comunica com uma API REST desenvolvida em ASP.NET Core. A API é responsável pelo processamento das requisições, pela autenticação dos alunos e pelo acesso aos dados armazenados no SQLite.

Nesta etapa, foram implementados a estrutura inicial do aplicativo, a tela de login, a comunicação com o endpoint de autenticação e a tela inicial do aluno.

## 2. Objetivos

- Desenvolver a interface do aplicativo utilizando Flutter.
- Permitir autenticação por matrícula e senha.
- Integrar o aplicativo à API REST.
- Receber e armazenar informações de autenticação.
- Disponibilizar uma tela inicial para o aluno.
- Validar o funcionamento por meio de testes e execução no navegador.

## 3. Tecnologias utilizadas

| Tecnologia | Finalidade |
|---|---|
| Flutter | Construção da interface multiplataforma. |
| Dart | Linguagem utilizada no aplicativo. |
| HTTP | Comunicação com a API. |
| Flutter Secure Storage | Armazenamento protegido de informações de autenticação. |
| ASP.NET Core Web API | Processamento das requisições. |
| SQLite | Persistência dos dados gerenciados pela API. |
| JWT | Token utilizado na autenticação. |
| GitHub Codespaces | Ambiente de desenvolvimento em nuvem. |

O SQLite e a geração do token JWT são responsabilidades da API, não do aplicativo Flutter.

## 4. Estrutura do projeto

O aplicativo está localizado no diretório `mobile` do projeto.

```text
mobile/
├── lib/
│   └── main.dart
├── test/
├── web/
├── android/
└── pubspec.yaml
```

O arquivo `main.dart` contém a implementação principal da interface e do fluxo de autenticação. O arquivo `pubspec.yaml` registra as dependências utilizadas.

## 5. Etapas de desenvolvimento

### 5.1. Preparação do ambiente

O desenvolvimento foi realizado no GitHub Codespaces. O Flutter SDK foi disponibilizado em `/workspaces/flutter`.

Para configurar o terminal, foi utilizado:

```bash
export PATH="/workspaces/flutter/bin:$PATH"
```

Versões registradas no ambiente:

- Flutter 3.47.7
- Dart 3.13.5

**Evidência 01 — Ambiente:** inserir captura do terminal com `flutter --version`.

### 5.2. Criação do projeto

O projeto Flutter foi criado com suporte às plataformas Web e Android:

```bash
flutter create --platforms=web,android mobile
```

Em seguida, o terminal foi direcionado para a pasta do aplicativo:

```bash
cd /workspaces/dotnet-codespaces/SistemaEstudoHELP/mobile
```

**Evidência 02 — Estrutura:** inserir captura do terminal e das pastas criadas.

### 5.3. Instalação das dependências

Foram utilizadas as bibliotecas `http`, para realizar requisições à API, e `flutter_secure_storage`, para armazenar informações de autenticação.

A instalação foi realizada com:

```bash
flutter pub get
```

**Evidência 03 — Dependências:** inserir captura do `pubspec.yaml` mostrando as dependências e do terminal após a instalação.

### 5.4. Desenvolvimento da tela de login

O arquivo principal desenvolvido foi `lib/main.dart`.

A tela de login foi criada para permitir que o aluno informe sua matrícula e senha. A interface segue a identidade visual do HELP, com predominância de azul-escuro e elementos organizados de forma simples.

Os principais elementos são:

- Identificação visual do HELP.
- Campo de matrícula.
- Campo de senha.
- Botão de login.
- Mensagens para falhas de autenticação ou conexão.

**Evidência 04 — Login:** inserir captura da tela de login do aplicativo.

### 5.5. Configuração do endereço da API

O endereço da API foi configurado por meio da variável de compilação `API_BASE_URL`.

Trecho utilizado em `main.dart`:

```dart
const apiBaseUrl = String.fromEnvironment(
  'API_BASE_URL',
  defaultValue: 'http://localhost:5026',
);
```

Essa configuração permite informar um endereço diferente conforme o ambiente. No Codespaces, foi utilizado o endereço HTTPS público associado à porta 5027, permitindo que o navegador acessasse a API remota.

**Evidência 05 — Configuração:** inserir captura do trecho de código que define `apiBaseUrl`.

### 5.6. Integração com o endpoint de autenticação

O aplicativo envia uma requisição HTTP `POST` para:

```text
/api/alunos/login
```

A requisição contém a matrícula e a senha informadas pelo aluno, em formato JSON.

Fluxo de autenticação:

1. O aluno informa matrícula e senha.
2. O aplicativo envia as credenciais à API.
3. A API consulta o cadastro no SQLite.
4. A API valida a senha utilizando o hash armazenado.
5. Em caso de sucesso, retorna um token JWT e os dados básicos do aluno.
6. O aplicativo recebe a resposta e armazena as informações de autenticação.
7. O aluno é direcionado para a tela inicial.

A senha não deve ser armazenada em texto puro nem incluída na documentação.

**Evidência 06 — Integração:** inserir captura do código responsável pela requisição HTTP e pelo tratamento da resposta.

### 5.7. Área inicial do aluno

Após a autenticação, o aplicativo direciona o usuário para a tela `HomeAlunoPage`.

A tela inicial apresenta uma mensagem de boas-vindas e atalhos para:

- Minhas matérias.
- Minhas notas.
- Minha frequência.
- Meu perfil.

Nesta etapa, a tela inicial e os atalhos estão implementados, mas as consultas acadêmicas correspondentes ainda precisam ser integradas à API. Os atalhos não devem ser considerados funcionalidades concluídas enquanto não realizarem as consultas reais.

**Evidência 07 — Área do aluno:** inserir captura da tela inicial após o login.

## 6. Execução no GitHub Codespaces

Durante os testes, foram utilizadas as seguintes portas:

| Serviço | Porta |
|---|---:|
| API utilizada no teste | 5027 |
| Flutter Web | 8090 |

A porta 5026 já estava ocupada por outra instância da API.

Para executar o Flutter Web, foi utilizado um comando com configuração explícita do endereço da API:

```bash
flutter run -d web-server \
  --web-hostname 0.0.0.0 \
  --web-port 8090 \
  --dart-define=API_BASE_URL=https://<endereco-publico-da-api>
```

O marcador `<endereco-publico-da-api>` deve ser substituído pelo endereço HTTPS da porta 5027 fornecido pelo Codespaces.

**Evidência 08 — Execução:** inserir captura do terminal com o Flutter em execução e do aplicativo aberto no navegador.

## 7. Testes realizados

### 7.1. Análise estática

Com o Flutter configurado no `PATH`, foi executado:

```bash
flutter analyze
```

**Resultado registrado:** `No issues found!`

A análise estática não identificou problemas no código avaliado naquele momento.

### 7.2. Testes automatizados

Foi executado:

```bash
flutter test
```

**Resultado registrado:** `All tests passed!`

Os testes automatizados existentes foram concluídos com sucesso. Esse resultado não significa que todas as funcionalidades acadêmicas ou todos os cenários de integração estejam testados.

### 7.3. Compilação para Web

Foi executado:

```bash
flutter build web \
  --dart-define=API_BASE_URL=http://localhost:5027
```

**Resultado registrado:** compilação concluída com sucesso.

O endereço `localhost` foi utilizado nesse teste de compilação. Para acesso remoto pelo navegador, é necessário configurar um endereço acessível no ambiente de execução.

### 7.4. Teste direto da API

A autenticação foi testada independentemente da interface por meio de uma requisição HTTP:

```bash
curl -i -X POST "http://localhost:5027/api/alunos/login" \
  -H "Content-Type: application/json" \
  -d '{"matricula":"2026001","senha":"<senha-de-teste>"}'
```

O marcador `<senha-de-teste>` deve ser substituído pela credencial de teste configurada no ambiente.

**Resultado observado:**

```text
HTTP/1.1 200 OK
```

A API retornou a mensagem `Login realizado com sucesso`, além de um token JWT, a data de expiração e os dados básicos do aluno.

**Evidência 09 — Teste da API:** inserir captura do terminal mostrando o status `200 OK`. Ocultar o token e a senha.

### 7.5. Teste integrado do login

No primeiro teste pelo navegador, o aplicativo apresentou uma mensagem de falha de conexão.

A aba Network das ferramentas de desenvolvedor identificou uma requisição `OPTIONS` para `/api/alunos/login` retornando `401 Unauthorized`. O cabeçalho `www-authenticate: tunnel` indicou bloqueio na camada de acesso do túnel do Codespaces.

A solução aplicada durante o teste foi alterar a visibilidade da porta 5027 para pública no painel Ports do Codespaces. Após essa alteração, o login pelo navegador funcionou e o aplicativo abriu a área inicial do aluno.

**Resultado final observado:** autenticação integrada realizada com sucesso.

**Evidência 10 — Login concluído:** inserir captura da área inicial após a autenticação.

## 8. Problemas encontrados e soluções

### 8.1. Conflito de portas

A porta 8080 estava ocupada por outro serviço. Foi utilizada a porta 8090 para o Flutter Web.

### 8.2. Endereço da API

O endereço local não era adequado para todas as situações de acesso remoto. A variável `API_BASE_URL` permitiu configurar o endereço HTTPS público da API no Codespaces.

### 8.3. Bloqueio do túnel

A requisição de preflight `OPTIONS` foi bloqueada com `401 Unauthorized` antes de chegar ao processamento normal da API. A alteração da visibilidade da porta 5027 para pública permitiu o teste integrado.

A exposição pública foi utilizada como solução de desenvolvimento. Antes de uma implantação definitiva, é necessário revisar a segurança da API, o CORS, a autenticação e a exposição dos endpoints.

## 9. Estado atual do aplicativo

| Funcionalidade | Situação |
|---|---|
| Estrutura Flutter | Criada |
| Dependências principais | Instaladas |
| Tela de login | Implementada |
| Integração com a API de login | Testada com sucesso |
| Emissão do token JWT pela API | Confirmada |
| Armazenamento de autenticação | Implementado |
| Tela inicial do aluno | Implementada |
| Análise estática | Aprovada |
| Testes automatizados existentes | Aprovados |
| Compilação Web | Concluída |
| Login pelo navegador | Testado com sucesso |
| Consultas de matérias, notas e frequência | Pendentes de integração |
| Teste em dispositivo Android físico | Não registrado nesta etapa |

## 10. Próximas etapas

1. Integrar a consulta das matérias do aluno.
2. Integrar a consulta de notas.
3. Integrar a consulta de frequência.
4. Implementar a tela de perfil.
5. Tratar a expiração do token e o encerramento da sessão.
6. Realizar testes adicionais de navegação e de falhas.
7. Avaliar testes em dispositivo Android ou emulador.
8. Revisar a segurança da API antes de disponibilizar o sistema publicamente.

## 11. Conclusão

O aplicativo mobile do Sistema de Estudo HELP possui uma base funcional desenvolvida em Flutter e integrada à API REST do projeto.

Foram implementados a tela de login, o envio de credenciais à API, o recebimento das informações de autenticação e a navegação para a tela inicial do aluno. A análise estática, os testes automatizados existentes e a compilação Web foram concluídos com sucesso.

Também foi identificado e solucionado um problema de acesso relacionado ao túnel do GitHub Codespaces durante o teste integrado.

As funcionalidades de consulta de matérias, notas, frequência e perfil ainda precisam ser conectadas à API. Dessa forma, a documentação registra tanto os resultados comprovados quanto as etapas necessárias para a continuidade do desenvolvimento.
