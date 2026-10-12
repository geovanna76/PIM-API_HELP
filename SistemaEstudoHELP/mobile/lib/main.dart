import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;

const apiBaseUrl = String.fromEnvironment(
  'API_BASE_URL',
  defaultValue: 'http://localhost:5026',
);

const secureStorage = FlutterSecureStorage();
const azulHelp = Color(0xFF173B70);
const fundoHelp = Color(0xFFF4F6FA);

void main() {
  runApp(const HelpApp());
}

class HelpApp extends StatelessWidget {
  const HelpApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sistema de Estudo HELP',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: azulHelp,
          primary: azulHelp,
        ),
        scaffoldBackgroundColor: fundoHelp,
        inputDecorationTheme: InputDecorationTheme(
          filled: true,
          fillColor: Colors.white,
          border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: const BorderSide(color: Color(0xFFD9E0EA)),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: const BorderSide(color: azulHelp, width: 1.5),
          ),
        ),
      ),
      home: const LoginPage(),
    );
  }
}

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _formKey = GlobalKey<FormState>();
  final _matriculaController = TextEditingController();
  final _senhaController = TextEditingController();

  bool _carregando = false;
  bool _mostrarSenha = false;
  String? _erro;

  Future<void> _entrar() async {
    FocusScope.of(context).unfocus();
    if (!_formKey.currentState!.validate()) return;

    setState(() {
      _carregando = true;
      _erro = null;
    });

    try {
      // Endpoint de estudantes será implementado na próxima etapa da API.
      final resposta = await http
          .post(
            Uri.parse('$apiBaseUrl/api/alunos/login'),
            headers: {'Content-Type': 'application/json'},
            body: jsonEncode({
              'matricula': _matriculaController.text.trim(),
              'senha': _senhaController.text,
            }),
          )
          .timeout(const Duration(seconds: 20));

      final dados = jsonDecode(resposta.body) as Map<String, dynamic>;

      if (resposta.statusCode == 200) {
        final token = dados['token'] as String?;
        final aluno = dados['aluno'] as Map<String, dynamic>?;

        if (token == null || aluno == null) {
          throw const FormatException('Resposta de login inválida.');
        }

        await secureStorage.write(key: 'help_token', value: token);
        await secureStorage.write(
          key: 'help_token_expira',
          value: dados['expiraEm']?.toString() ?? '',
        );
        await secureStorage.write(
          key: 'help_aluno_nome',
          value: aluno['nome']?.toString() ?? '',
        );
        await secureStorage.write(
          key: 'help_aluno_matricula',
          value: aluno['matricula']?.toString() ?? '',
        );

        if (!mounted) return;

        Navigator.of(context).pushReplacement(
          MaterialPageRoute(
            builder: (_) => HomeAlunoPage(
              nome: aluno['nome']?.toString() ?? 'Estudante',
              matricula: aluno['matricula']?.toString() ?? '',
            ),
          ),
        );
      } else {
        setState(() {
          _erro =
              dados['mensagem']?.toString() ??
              'Não foi possível realizar o login.';
        });
      }
    } on FormatException {
      setState(() {
        _erro = 'A API retornou uma resposta inválida.';
      });
    } catch (_) {
      setState(() {
        _erro = 'Não foi possível conectar. Verifique a API e tente novamente.';
      });
    } finally {
      if (mounted) setState(() => _carregando = false);
    }
  }

  @override
  void dispose() {
    _matriculaController.dispose();
    _senhaController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(24),
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 420),
              child: Card(
                color: Colors.white,
                elevation: 1,
                shadowColor: azulHelp.withValues(alpha: 0.08),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(24),
                  side: const BorderSide(color: Color(0xFFE9EDF4)),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(28),
                  child: Form(
                    key: _formKey,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        Container(
                          width: 76,
                          height: 76,
                          decoration: BoxDecoration(
                            color: azulHelp.withValues(alpha: 0.08),
                            borderRadius: BorderRadius.circular(22),
                          ),
                          child: const Icon(
                            Icons.school_rounded,
                            color: azulHelp,
                            size: 44,
                          ),
                        ),
                        const SizedBox(height: 20),
                        const Text(
                          'HELP',
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            fontSize: 30,
                            fontWeight: FontWeight.bold,
                            letterSpacing: 2,
                            color: azulHelp,
                          ),
                        ),
                        const SizedBox(height: 8),
                        const Text(
                          'Sistema de Estudo',
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        const SizedBox(height: 8),
                        const Text(
                          'Acesse sua área de estudante',
                          textAlign: TextAlign.center,
                          style: TextStyle(color: Colors.black54),
                        ),
                        const SizedBox(height: 30),
                        const Text(
                          'Matrícula',
                          style: TextStyle(fontWeight: FontWeight.w600),
                        ),
                        const SizedBox(height: 8),
                        TextFormField(
                          controller: _matriculaController,
                          keyboardType: TextInputType.text,
                          autocorrect: false,
                          textCapitalization: TextCapitalization.characters,
                          decoration: const InputDecoration(
                            hintText: 'Digite sua matrícula',
                            prefixIcon: Icon(Icons.badge_outlined),
                          ),
                          validator: (valor) {
                            if (valor == null || valor.trim().isEmpty) {
                              return 'Informe sua matrícula.';
                            }
                            return null;
                          },
                        ),
                        const SizedBox(height: 20),
                        const Text(
                          'Senha',
                          style: TextStyle(fontWeight: FontWeight.w600),
                        ),
                        const SizedBox(height: 8),
                        TextFormField(
                          controller: _senhaController,
                          obscureText: !_mostrarSenha,
                          decoration: InputDecoration(
                            hintText: 'Digite sua senha',
                            prefixIcon: const Icon(Icons.lock_outline),
                            suffixIcon: IconButton(
                              onPressed: () => setState(
                                () => _mostrarSenha = !_mostrarSenha,
                              ),
                              icon: Icon(
                                _mostrarSenha
                                    ? Icons.visibility_off
                                    : Icons.visibility,
                              ),
                            ),
                          ),
                          validator: (valor) {
                            if (valor == null || valor.isEmpty) {
                              return 'Informe sua senha.';
                            }
                            return null;
                          },
                          onFieldSubmitted: (_) => _entrar(),
                        ),
                        if (_erro != null) ...[
                          const SizedBox(height: 16),
                          Text(
                            _erro!,
                            style: const TextStyle(
                              color: Colors.red,
                              fontSize: 14,
                            ),
                          ),
                        ],
                        const SizedBox(height: 24),
                        SizedBox(
                          height: 52,
                          child: FilledButton(
                            onPressed: _carregando ? null : _entrar,
                            style: FilledButton.styleFrom(
                              backgroundColor: azulHelp,
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(12),
                              ),
                            ),
                            child: _carregando
                                ? const SizedBox(
                                    width: 22,
                                    height: 22,
                                    child: CircularProgressIndicator(
                                      strokeWidth: 2,
                                      color: Colors.white,
                                    ),
                                  )
                                : const Text(
                                    'Entrar',
                                    style: TextStyle(
                                      fontSize: 16,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                          ),
                        ),
                        const SizedBox(height: 20),
                        const Text(
                          'Acesso exclusivo para estudantes.',
                          textAlign: TextAlign.center,
                          style: TextStyle(color: Colors.black54, fontSize: 12),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class HomeAlunoPage extends StatelessWidget {
  final String nome;
  final String matricula;

  const HomeAlunoPage({super.key, required this.nome, required this.matricula});

  Future<void> _sair(BuildContext context) async {
    await secureStorage.deleteAll();
    if (!context.mounted) return;

    Navigator.of(context).pushAndRemoveUntil(
      MaterialPageRoute(builder: (_) => const LoginPage()),
      (_) => false,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'HELP • Estudante',
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
        backgroundColor: azulHelp,
        foregroundColor: Colors.white,
        actions: [
          IconButton(
            tooltip: 'Sair',
            onPressed: () => _sair(context),
            icon: const Icon(Icons.logout),
          ),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          Container(
            padding: const EdgeInsets.all(22),
            decoration: BoxDecoration(
              color: azulHelp,
              borderRadius: BorderRadius.circular(20),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Icon(
                  Icons.waving_hand_rounded,
                  color: Colors.white,
                  size: 32,
                ),
                const SizedBox(height: 14),
                const Text(
                  'Olá, estudante!',
                  style: TextStyle(color: Colors.white70, fontSize: 15),
                ),
                const SizedBox(height: 4),
                Text(
                  nome,
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 23,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  'Matrícula: $matricula',
                  style: const TextStyle(color: Colors.white70),
                ),
              ],
            ),
          ),
          const SizedBox(height: 24),
          const Text(
            'Minha área acadêmica',
            style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 14),
          _AtalhoAluno(
            icone: Icons.menu_book_rounded,
            titulo: 'Minhas matérias',
            descricao: 'Consulte suas disciplinas',
            aoTocar: () => _mostrarEmConstrucao(context, 'Minhas matérias'),
          ),
          _AtalhoAluno(
            icone: Icons.grade_rounded,
            titulo: 'Minhas notas',
            descricao: 'Acompanhe seu desempenho',
            aoTocar: () => _mostrarEmConstrucao(context, 'Minhas notas'),
          ),
          _AtalhoAluno(
            icone: Icons.fact_check_outlined,
            titulo: 'Minha frequência',
            descricao: 'Consulte sua frequência acadêmica',
            aoTocar: () => _mostrarEmConstrucao(context, 'Minha frequência'),
          ),
          _AtalhoAluno(
            icone: Icons.person_outline_rounded,
            titulo: 'Meu perfil',
            descricao: 'Seus dados de estudante',
            aoTocar: () => _mostrarEmConstrucao(context, 'Meu perfil'),
          ),
        ],
      ),
    );
  }

  void _mostrarEmConstrucao(BuildContext context, String tela) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('$tela será integrada nas próximas etapas.')),
    );
  }
}

class _AtalhoAluno extends StatelessWidget {
  final IconData icone;
  final String titulo;
  final String descricao;
  final VoidCallback aoTocar;

  const _AtalhoAluno({
    required this.icone,
    required this.titulo,
    required this.descricao,
    required this.aoTocar,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      color: Colors.white,
      elevation: 0,
      margin: const EdgeInsets.only(bottom: 12),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
        side: const BorderSide(color: Color(0xFFE3E8F0)),
      ),
      child: ListTile(
        contentPadding: const EdgeInsets.symmetric(horizontal: 18, vertical: 8),
        leading: Container(
          width: 46,
          height: 46,
          decoration: BoxDecoration(
            color: azulHelp.withValues(alpha: 0.08),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Icon(icone, color: azulHelp),
        ),
        title: Text(
          titulo,
          style: const TextStyle(fontWeight: FontWeight.w600),
        ),
        subtitle: Text(descricao),
        trailing: const Icon(Icons.chevron_right_rounded),
        onTap: aoTocar,
      ),
    );
  }
}
