import 'package:flutter/material.dart';
import 'package:test_flu/legend.dart';

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          backgroundColor: const Color.fromRGBO(0, 188, 212, 1),
          title: const Text('Lecstu', style:TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.bold,
            letterSpacing: 3,
          )),
          centerTitle: true,
        ),
        body: const Center(
          child: MainBody(),
        ),
      ),
    );
  }
}
 
class MainBody extends StatelessWidget {
  const MainBody({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: [
        Container(
          color: Colors.blue[100],
          padding: const EdgeInsets.all(20),
          child: const Text('Personal'),
        ),
        Container(
          color: Colors.blue[300],
          padding: const EdgeInsets.all(20),
          child: const IamLegend(),
        ),
        Expanded(
          child: Image.asset('assets/img/logo.webp',
            fit: BoxFit.fill,
          ),
          ),
      ],
    );
  }
}