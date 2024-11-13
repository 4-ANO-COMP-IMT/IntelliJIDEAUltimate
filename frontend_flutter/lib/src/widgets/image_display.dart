import 'dart:math';

import 'package:flutter/material.dart';
import 'package:frontend_flutter/src/widgets/rectangle_drawer.dart';
import 'package:provider/provider.dart';

class ImageNotifier extends ChangeNotifier {
  
  String? _imageUrl;

  String? get imageUrl => _imageUrl;

  void removeImage() {
    _imageUrl = null;
    notifyListeners();
  }

  void changeImage(String newUrl) {
    _imageUrl = newUrl;
    notifyListeners();
  }
}

class ImageDisplay extends StatefulWidget {

  final String _token;
  final Future<void> Function(BuildContext, String) _onImageLoaded;

  static final double displayWidth = 640;
  static final double displayHeight = 480;

  const ImageDisplay(this._token, this._onImageLoaded, {super.key});


  @override
  ImageDisplayState createState() => ImageDisplayState();
}

class ImageDisplayState extends State<ImageDisplay> {

  bool _isFirstBuild = true;
  final ValueNotifier<bool> _isImageLoaded = ValueNotifier(false);

  late Size containedImageSize;

  @override
  Widget build(BuildContext context) {

    if(_isFirstBuild) {
      _isFirstBuild = false;
      WidgetsBinding.instance.addPostFrameCallback((_) {
      widget._onImageLoaded(context, widget._token);
      });
    }

    final Widget loadingWidget = Stack(
      alignment: Alignment.center,
      children: [
        Container(
          decoration: BoxDecoration(
            border: Border.all(width: 4),
          ),
          width: ImageDisplay.displayWidth + 8,
          height: ImageDisplay.displayHeight + 8,
        ),
        Image.asset(
          'LoadingImage.png',
          fit: BoxFit.cover,
          width: ImageDisplay.displayWidth,
          height: ImageDisplay.displayHeight,
        ),
        CircularProgressIndicator(),
      ],
    );
    

    return Consumer<ImageNotifier>(
      builder: (context, imageNotifier, child) {
        String? imageUrl = imageNotifier.imageUrl;
        if(imageUrl != null) {

          _isImageLoaded.value = false;
          final NetworkImage networkImage = NetworkImage(imageUrl);
          networkImage.resolve(ImageConfiguration()).addListener(
            ImageStreamListener((ImageInfo info, bool _) {
              containedImageSize = _convertSizeToContain(info.image.width, info.image.height);
              Provider.of<RectanglesNotifier>(context, listen: false).imageSize = containedImageSize;
              _isImageLoaded.value = true;
              print("imageSize = ${info.image.width}, ${info.image.height}");
              print("containedImageSize = $containedImageSize");
            })
          );
          

          return ValueListenableBuilder<bool>(
            valueListenable: _isImageLoaded,
            builder: (context, isLoaded, child) {
              if (isLoaded) {
                return Stack(
                  alignment: Alignment.center,
                  children: [
                    Container(
                      decoration: BoxDecoration(
                        border: Border.all(width: 4),
                      ),
                      width: containedImageSize.width + 8,
                      height: containedImageSize.height + 8,
                    ),
                    Image(
                      image: networkImage,
                      fit: BoxFit.contain,
                      width: ImageDisplay.displayWidth,
                      height: ImageDisplay.displayHeight,
                    ),
                    const RectangleDrawer()
                  ]
                );
              } else {
                return loadingWidget;
              }
            },
          );
          
        }
        else {
          return loadingWidget;
        }
      },
    );
    
    
  }

  @override
  void dispose() {
    _isImageLoaded.dispose();
    super.dispose();
  }

  Size _convertSizeToContain(int width, int height) {
    double resizeScale = min(ImageDisplay.displayWidth / width, ImageDisplay.displayHeight / height);
    return Size(width * resizeScale, height * resizeScale);
  }
}