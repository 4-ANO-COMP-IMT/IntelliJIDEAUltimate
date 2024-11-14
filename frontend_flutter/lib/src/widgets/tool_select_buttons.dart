import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

enum ClassificationOption {
  none,
  cachorro,
  gato;

  Color get color => switch(this) {
    ClassificationOption.cachorro => Color.fromARGB(255, 51, 255, 87),
    ClassificationOption.gato => Color.fromARGB(255, 150, 51, 255),
    _ => Colors.black12
  };

  String get text => name.characters.first.toUpperCase() + name.substring(1);
}

class ClassificationProvider extends ChangeNotifier {
  ClassificationOption _currentClassificationTool = ClassificationOption.none;
  final List<bool> _selectedButtonList = List.filled(ClassificationOption.values.length - 1, false);

  ClassificationOption get currentClassificationTool => _currentClassificationTool;
  List<bool> get selectedButtonList => _selectedButtonList;

  void selectDrawingTool(ClassificationOption tool) {
    _currentClassificationTool = tool;
    _selectedButtonList.fillRange(0, _selectedButtonList.length, false);
    _selectedButtonList[tool.index - 1] = true;
    notifyListeners();
  }
}

class ToolButtons extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.only(top: 16),
        child: ToggleButtons(
          textStyle: TextStyle(fontWeight: FontWeight.bold),
          borderRadius: BorderRadius.circular(8.0),
          fillColor: Colors.blue,
          color: Colors.black,
          selectedBorderColor: Colors.blue,
          borderColor: Colors.grey,
          isSelected: Provider.of<ClassificationProvider>(context)._selectedButtonList,
          onPressed: (int index) {
            Provider.of<ClassificationProvider>(context, listen: false).selectDrawingTool(ClassificationOption.values[index + 1]);
          },
          children: List.generate(ClassificationOption.values.length - 1, (int index) {
            return Padding(
              padding: EdgeInsets.symmetric(horizontal: 24.0),
              child: Text(
                ClassificationOption.values[index + 1].text,
                style: TextStyle(fontSize: 20, color: ClassificationOption.values[index + 1].color),
              ),
            );
          })
        ),
      ),
    );
  }
}