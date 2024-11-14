import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../widgets/rectangle_drawer.dart';
import '../widgets/tool_select_buttons.dart';
import '../widgets/image_display.dart';

class HomePageState extends State<HomePage> {

  int? _imageId;

  @override
  Widget build(BuildContext context) {

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Color.fromARGB(255, 42, 54, 100),
        toolbarHeight: 80,
        title: Text(
          'Sistema Geral de Classificação (SGC)',
          style: TextStyle(
            fontSize: 54,
            color: Colors.white
          ),
        ),
      ),
      body: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Center(child: ImageDisplay(widget.token, _getNewImage)),
              ToolButtons(),
            ]
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        label: Text("Enviar", textScaler: TextScaler.linear(2.5),),
        icon: const Icon(Icons.send),
        onPressed: () async => await _sendRectangles(context, widget.token),
      ),
    );
  }

  Future<void> _sendRectangles(BuildContext context, String token) async {
    
    List<ClassifiedRect> rectangles = Provider.of<RectanglesNotifier>(context, listen: false).rectangles;
    Size imageSize = Provider.of<RectanglesNotifier>(context, listen: false).imageSize!;

    final List<Map<String, dynamic>> rectanglesMaps = rectangles
        .map((classRect) => {
              "class_name": classRect.classification.name,
              "center_x": classRect.rectangle.center.dx / imageSize.width,
              "center_y": classRect.rectangle.center.dy / imageSize.height,
              "width": classRect.rectangle.width / imageSize.width,
              "height": classRect.rectangle.height / imageSize.height
            })
        .toList();
    
    if(_imageId == null) {
      print("Image id é nulo!");
      return;
    }

    final Map<String, Object> reqBodyMap = {
      "image_id": _imageId!,
      "rectangles": rectanglesMaps
    };

    final String reqBodyJson = json.encode(reqBodyMap);

    try {
      final response = await http.post(
        Uri.parse('http://localhost:30002/api/classification'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $token'
          },
        body: reqBodyJson,
      );

      if(context.mounted) {
        if (response.statusCode == 200) {
          Provider.of<RectanglesNotifier>(context, listen: false).clearRectangles();
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Retângulos enviados com sucesso!')),
          );
          
          _getNewImage(context, token);
        }
        else {
          Map<String, dynamic> responseMessage = json.decode(response.body);
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Falha na conexão!\nCódigo: ${response.statusCode}\nErro: ${responseMessage['message']}')),
          );
        }
      }
    }
    catch(err) {
      print("Erro ao enviar: $err");
    }
  }

  Future<void> _getNewImage(BuildContext context, String token) async {
    
    Provider.of<ImageNotifier>(context, listen: false).removeImage();
    setState(() {
      _imageId = null;
    });

    try {
      final response = await http.post(
        Uri.parse('http://localhost:30002/api/allocate'),
        headers: {
          'Content-Length': '0',
          'Authorization': 'Bearer $token'
          },
      );

      if(context.mounted) {
        Map<String, dynamic> responseBody = json.decode(response.body);
        if (response.statusCode == 200) {
          context.read<ImageNotifier>().changeImage(responseBody['image_url']);
            _imageId = responseBody['image_id'];
            print(_imageId);
        }
        else {
          if(response.statusCode == 500) {
            ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Sem imagens disponíveis para classificar')),
          );  
          }
          else {
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(content: Text('Falha ao obter imagem!\nCódigo: ${response.statusCode}\nErro: ${responseBody['message']}')),
            );
          }
        }
      }
    }
    catch(err) {
      print("Erro ao obter imagem: $err");
    }

  }

}

class HomePage extends StatefulWidget {

  final String token;

  HomePage(this.token, {super.key});

  @override
  HomePageState createState() => HomePageState();
}