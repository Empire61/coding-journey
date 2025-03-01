import 'package:flutter/material.dart';
import 'package:lecstu/registration/registration.dart';

class HomeStu extends StatelessWidget {
  const HomeStu({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.blue,
        title: Text('LecStu'),
        centerTitle: true,
      ),
      body: Center(
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text("welcome to MY App"),
            SizedBox(width: 5),
            Splash(),
            SizedBox(width: 5),
            Splash(),
            SizedBox(width: 5),
            Splash(),
          ],
        ),
      ),
    );
  }
}