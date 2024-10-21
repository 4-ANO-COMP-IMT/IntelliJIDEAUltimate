import 'package:flutter/material.dart';
import '../src/widgets/rectangle_drawer.dart';

void main() {
  var app = MaterialApp(
    home: Scaffold(
      appBar: AppBar(
        title: const Text("Sistema Geral de Classificação"),
        backgroundColor: const Color.fromARGB(255, 100, 100, 100),
      ),
      body: Stack(
        children: [
          const RectangleDrawer(),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Image.network(
                'https://picsum.photos/150',/* URL obtida com o allocate - algo como localhost:30003. O POSTGRE TEM Q GUARDAR 30000 AGORA */
                fit: BoxFit.contain,
                width: 500,
                height: 500,)
            ],
          )
        ],
      )
    )
  );

  runApp(app);
}