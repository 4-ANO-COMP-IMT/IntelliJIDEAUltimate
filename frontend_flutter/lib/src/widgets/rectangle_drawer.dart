import 'package:flutter/material.dart';
import 'package:frontend_flutter/src/widgets/tool_select_buttons.dart';
import 'package:provider/provider.dart';

class ClassifiedRect {
  late Rect rectangle;
  late ClassificationOption classification;

  ClassifiedRect (this.rectangle, this.classification);

}

class RectanglesNotifier extends ChangeNotifier {
  
  final List<ClassifiedRect> _rectangles = [];
  Size? _imageSize;

  List<ClassifiedRect> get rectangles => _rectangles;
  Size? get imageSize => _imageSize;

  void addRectangle(ClassifiedRect rect) {
    _rectangles.add(rect);
    notifyListeners();
  }

  void clearRectangles() {
    _rectangles.clear();
    notifyListeners();
  }

  set imageSize(Size? value) {
    _imageSize = value;
    notifyListeners();
  }
}

class RectangleDrawer extends StatefulWidget {

  const RectangleDrawer({super.key});

  @override
  RectangleDrawerState createState() => RectangleDrawerState();
}

class RectangleDrawerState extends State<RectangleDrawer> {

  Offset _startPoint = Offset.zero;
  Offset _endPoint = Offset.zero;
  bool _drawing = false;
  late ClassificationProvider _classificationProvider;
  late Size imageSize;
  final double _paintWidth = 3;

  @override
  Widget build(BuildContext context) {

    _classificationProvider = Provider.of(context, listen: false);

    return GestureDetector(
        onPanStart: _onPanStart,
        onPanUpdate: _onPanUpdate,
        onPanEnd: _onPanEnd,
        child: Consumer<RectanglesNotifier>(
          builder: (context, rectanglesProvider, child) {
            
            if(rectanglesProvider._imageSize == null) {
              print("imageSize é null !!!");
            }
            
            imageSize = rectanglesProvider._imageSize ?? Size.zero;

            return Stack(
              children: [
                CustomPaint(
                  size: imageSize,
                  painter: DrawingRectanglePainter(
                    _startPoint,
                    _endPoint,
                    _paintWidth,
                    _drawing,
                    rectanglesProvider.rectangles,
                    _classificationProvider
                  ),
                ),
              ],
            );
          }
        )
      );
  }

  Offset _clampPointToImageExtents(Offset point) {
    final imageRect = Rect.fromLTWH(0, 0, imageSize.width, imageSize.height).deflate(_paintWidth/2);
    if (!imageRect.contains(point)) {
      
      final adjustedX = point.dx.clamp(imageRect.left, imageRect.right);
      final adjustedY = point.dy.clamp(imageRect.top, imageRect.bottom);
      return Offset(adjustedX, adjustedY);
    }
    else {
      return point;
    }
  }

  void _onPanStart(DragStartDetails details) {
    if(_classificationProvider.currentClassificationTool != ClassificationOption.none) {
      setState(() {
        _drawing = true;
        _startPoint = _clampPointToImageExtents(details.localPosition);// Clamp para caso fizermos o espaço de desenho ser maior que a imagem
        _endPoint = _startPoint;
      });
    }
  }

  void _onPanUpdate(DragUpdateDetails details) {
    if(_drawing) {
      setState(() {
        _endPoint = _clampPointToImageExtents(details.localPosition);
      });
    }
  }

  void _onPanEnd(DragEndDetails details) {
    if (_drawing) {
      setState(() {
        _drawing = false;
        _endPoint = _clampPointToImageExtents(details.localPosition);
        final drawnRectangle = Rect.fromPoints(_startPoint, _endPoint);
      
        final ClassificationOption classification = Provider.of<ClassificationProvider>(context, listen: false).currentClassificationTool;
        Provider.of<RectanglesNotifier>(context, listen: false).addRectangle(ClassifiedRect(drawnRectangle, classification));
        
      });
    }
  }
}

class DrawingRectanglePainter extends CustomPainter {
  final Offset _startPoint;
  final Offset _endPoint;
  final double _paintWidth;
  final bool _drawing;
  final List<ClassifiedRect> _rectangles;
  final ClassificationProvider _classificationProvider;

  DrawingRectanglePainter(this._startPoint, this._endPoint, this._paintWidth, this._drawing, this._rectangles, this._classificationProvider);

  @override
  void paint(Canvas canvas, Size size) {
    
    final paintObject = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = _paintWidth;
    
    if (_drawing) {

      canvas.drawRect(
        Rect.fromPoints(_startPoint, _endPoint),
        paintObject..color = _classificationProvider.currentClassificationTool.color
      );
    }
    for (var classRect in _rectangles) {

      paintObject.color = classRect.classification.color;
      canvas.drawRect(
        classRect.rectangle,
        paintObject
      );
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) {
    return true;
  }
}

