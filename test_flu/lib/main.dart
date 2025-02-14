import 'package:flutter/material.dart';
import 'package:test_flu/home.dart';

void main() {
  runApp(const MyApp());
}

class SandBox extends StatelessWidget {
  const SandBox({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          backgroundColor: Colors.grey[400],
          title: const Text('Lecstu'),
        ),
        body: Row(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              color: Colors.red,
              height: 100,
              child: const Text('one'),
            ),
            Container(
              color: Colors.green,
              height: 200,
              child: const Text('two'),
            ),
            Container(
              color: Colors.blue,
              height: 300,
              child: const Text('three'),
            ),
          ]
        ),
      ),
    );
  }
}