# ai/yolo.py

import torch
import requests
import numpy as np
from PIL import Image
from io import BytesIO
import time
from config.settings import COCO_CLASSES

class YOLOProcessor:
    def __init__(self):
        print("Loading YOLO model...")
        self.model = torch.hub.load('ultralytics/yolov5', 'yolov5s', pretrained=True)
        print("YOLO model loaded successfully.")
    
    def process_image(self, image_url):
        try:
            start_timestamp = time.time()
            response = requests.get(image_url)
            image = Image.open(BytesIO(response.content))
            image = np.array(image)

            image_height, image_width = image.shape[:2]
            image_loaded_timestamp = time.time()

            results = self.model(image)
            bounding_boxes = results.xyxy[0].cpu().numpy()

            detected_objects = []
            for box in bounding_boxes:
                x1, y1, x2, y2 = box[0], box[1], box[2], box[3]

                x_center = (x1 + x2) / 2 / image_width
                y_center = (y1 + y2) / 2 / image_height

                width = (x2 - x1) / image_width
                height = (y2 - y1) / image_height

                confidence = box[4]
                class_id = int(box[5])

                class_name = COCO_CLASSES.get(class_id, f"class_{class_id}")

                detected_objects.append({
                    "class_name": class_name,
                    "x_center": x_center,
                    "y_center": y_center,
                    "width": width,
                    "height": height,
                    "confidence": confidence
                })

            end_timestamp = time.time()

            return {
                "start_timestamp": start_timestamp,
                "image_loaded_timestamp": image_loaded_timestamp,
                "end_timestamp": end_timestamp,
                "detected_objects": detected_objects
            }

        except Exception as e:
            print(f"Error processing image: {e}")
            return None
