import 'dart:async';
import 'package:flutter/material.dart';
import 'package:lecstu/home.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _fadeAnimation;

  @override
  void initState() {
    super.initState();

    //Animation Controller (controls faded effect)
    _controller = AnimationController(
      duration: Duration(seconds:3), // Fade-in duration
      vsync: this,
    );

    // Fade effect from 0 (invincible) to 1 (fully visible)
    _fadeAnimation = Tween<double>(begin: 0, end: 1).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeIn),
    );

    //Start the animation
    _controller.forward();

    //Navigate to home screen after 4 seconds
    Timer(Duration(seconds: 4),() {
      Navigator.pushReplacement(
        context, 
        MaterialPageRoute(builder: (context) => HomeScreen()),
      );
    });

  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context){
    return Scaffold(
        body: FadeTransition(
        opacity: _fadeAnimation,
        child: Container(
          width: double.infinity,
          height: double.infinity,
          decoration: BoxDecoration(
            image: DecorationImage(
              image: AssetImage("assets/img/comb.png"),
              fit: BoxFit.contain,
              ),
          ),
        ),
      ),
    );
  }
}