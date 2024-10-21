import 'package:flutter/material.dart';

class RectangleDrawer extends StatefulWidget {
  const RectangleDrawer();

  
  @override
  RectangleDrawerState createState() => RectangleDrawerState();
}

class RectangleDrawerState extends State<RectangleDrawer> {
  Offset _startPoint = Offset.zero; // Ponto inicial
  Offset _endPoint = Offset.zero; // Ponto final
  bool _drawing = false; // Para controlar se estamos desenhando

  // Variáveis para armazenar informações do retângulo
  double _centerX = 0;
  double _centerY = 0;
  double _width = 0;
  double _height = 0;

  void _onPanStart(DragStartDetails details) {
    setState(() {
      _drawing = true;
      _startPoint = details.localPosition; // Ponto onde o gesto começou
    });
  }

  void _onPanUpdate(DragUpdateDetails details) {
    setState(() {
      _endPoint = details.localPosition; // Ponto onde o gesto está
    });
  }

  void _onPanEnd(DragEndDetails details) {
    setState(() {
      _drawing = false;

      // Calcular o centro, largura e altura do retângulo
      double left = _startPoint.dx < _endPoint.dx ? _startPoint.dx : _endPoint.dx;
      double top = _startPoint.dy < _endPoint.dy ? _startPoint.dy : _endPoint.dy;
      _width = (_endPoint.dx - _startPoint.dx).abs();
      _height = (_endPoint.dy - _startPoint.dy).abs();
      _centerX = left + _width / 2; // Centro X
      _centerY = top + _height / 2; // Centro Y
    });
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
        onPanStart: _onPanStart,
        onPanUpdate: _onPanUpdate,
        onPanEnd: _onPanEnd,
        child: CustomPaint(
          size: Size.infinite,
          painter: RectanglePainter(_startPoint, _endPoint, _drawing),
        ),
      );
  }
}

class RectanglePainter extends CustomPainter {
  final Offset startPoint;
  final Offset endPoint;
  final bool drawing;

  RectanglePainter(this.startPoint, this.endPoint, this.drawing);

  @override
  void paint(Canvas canvas, Size size) {
    if (drawing) {
      // Desenhar o retângulo enquanto está desenhando
      double left = startPoint.dx < endPoint.dx ? startPoint.dx : endPoint.dx;
      double top = startPoint.dy < endPoint.dy ? startPoint.dy : endPoint.dy;
      double width = (endPoint.dx - startPoint.dx).abs();
      double height = (endPoint.dy - startPoint.dy).abs();

      canvas.drawRect(
        Rect.fromLTWH(left, top, width, height),
        Paint()
          ..color = Colors.blue.withOpacity(0.5)
          ..style = PaintingStyle.fill,
      );
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) {
    return true; // Sempre repinta
  }
}
