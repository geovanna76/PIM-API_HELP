import 'package:flutter_test/flutter_test.dart';
import 'package:mobile/main.dart';

void main() {
  testWidgets('Exibe o login do estudante do HELP', (tester) async {
    await tester.pumpWidget(const HelpApp());

    expect(find.text('HELP'), findsOneWidget);
    expect(find.text('Sistema de Estudo'), findsOneWidget);
    expect(find.text('Acesse sua área de estudante'), findsOneWidget);
    expect(find.text('Matrícula'), findsOneWidget);
    expect(find.text('Senha'), findsOneWidget);
    expect(find.text('Entrar'), findsOneWidget);
  });
}
