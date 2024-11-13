import 'dart:js' as js;
import 'package:flutter/material.dart';
import 'package:frontend_flutter/src/widgets/image_display.dart';
import 'package:provider/provider.dart';

import 'src/pages/home_page.dart';
import 'src/pages/forbidden_page.dart';
import 'src/widgets/tool_select_buttons.dart';
import 'src/widgets/rectangle_drawer.dart';

class _MyApp extends StatelessWidget {

  @override
  Widget build(BuildContext context) {

    String? token = getSessionToken();
    //print("token: $token");

    

    return MaterialApp(
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: token != null ? HomePage(token) : ForbiddenPage()
    );
  }

  String? getSessionToken() {
    final sessionToken = js.context.callMethod('eval', ['document.cookie']);
    final tokenMatch = RegExp(r'session_token=([^;]+)').firstMatch(sessionToken);
    return tokenMatch?.group(1);
  }

}

void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (context) => RectanglesNotifier()),
        ChangeNotifierProvider(create: (context) => ClassificationProvider()),
        ChangeNotifierProvider(create: (context) => ImageNotifier()),
      ],
      child: _MyApp(),
    )
  );
}