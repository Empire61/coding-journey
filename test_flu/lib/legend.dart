import 'package:flutter/material.dart';

class IamLegend extends StatefulWidget {
  const IamLegend({super.key});

  @override
  State<IamLegend> createState() => _IamLegendState();
}

class _IamLegendState extends State<IamLegend> {
  int strength = 1;
  int booksRead = 1;

  void increaseStrength() {
    setState(() {
      strength = strength < 6 ? strength + 1 : 1;
    });
  }

  void increaseBooksRead(){
    setState(() {
      booksRead = booksRead < 7 ? booksRead + 1 : 0;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(
          children: [
            const Text('Days: '),
            Text('$strength'),
            Image.asset('assets/img/h_logo.png', 
            width: 50),

            const Expanded(child: SizedBox()),
            FilledButton(
              style:FilledButton.styleFrom(
                backgroundColor: Colors.blue[100],
                foregroundColor: Colors.blue[900],
              ),
              onPressed:increaseStrength,
              child: const Text('+'),
            ),
          ]
        ),
        Row(
          children: [
            const Text('BooksRead: '),

            if (booksRead == 0)
              const Text('No books read yet...', style: TextStyle(
                color: Colors.red,
              )),

            for (int i= 0; i < booksRead; i++)
              Image.asset('assets/img/logo.png', 
              width: 50),

            const Expanded(child: SizedBox()),
            FilledButton(
              style:FilledButton.styleFrom(
                backgroundColor: Colors.blue[100],
                foregroundColor: Colors.blue[900],
              ),
              onPressed: increaseBooksRead,
              child: const Text('+'),
            ),
          ],
        ),
      ],
    );
  }
}