# import time
# import pika
# import requests
# import torch
# import json  # Para fazer o parsing do JSON
# import numpy as np
# from PIL import Image
# from io import BytesIO

# # Configurações do RabbitMQ (com suas credenciais)
# credentials = pika.PlainCredentials('rabbitmq', 'rabbitmq')
# connection = pika.BlockingConnection(
#     pika.ConnectionParameters(host='localhost', port=5672, credentials=credentials)
# )
# channel = connection.channel()

# channel.exchange_declare(exchange='on_image-exchange', exchange_type='fanout', durable=True)
# channel.queue_declare(queue='image-processor-on_image-queue', durable=True)
# channel.queue_bind(exchange='on_image-exchange', queue='image-processor-on_image-queue')

# # Carregar o modelo YOLOv5 uma vez
# print("Loading YOLO model...")
# model = torch.hub.load('ultralytics/yolov5', 'yolov5s', pretrained=True)
# print("YOLO model loaded successfully.")
# # Mapeamento das classes COCO para nomes de objetos
# # Mapping of COCO classes to object names
# coco_classes = {
#     0: u'__background__',
#     1: u'person',
#     2: u'bicycle',
#     3: u'car',
#     4: u'motorcycle',
#     5: u'airplane',
#     6: u'bus',
#     7: u'train',
#     8: u'truck',
#     9: u'boat',
#     10: u'traffic light',
#     11: u'fire hydrant',
#     12: u'stop sign',
#     13: u'parking meter',
#     14: u'bench',
#     15: u'bird',
#     16: u'cat',
#     17: u'dog',
#     18: u'horse',
#     19: u'sheep',
#     20: u'cow',
#     21: u'elephant',
#     22: u'bear',
#     23: u'zebra',
#     24: u'giraffe',
#     25: u'backpack',
#     26: u'umbrella',
#     27: u'handbag',
#     28: u'tie',
#     29: u'suitcase',
#     30: u'frisbee',
#     31: u'skis',
#     32: u'snowboard',
#     33: u'sports ball',
#     34: u'kite',
#     35: u'baseball bat',
#     36: u'baseball glove',
#     37: u'skateboard',
#     38: u'surfboard',
#     39: u'tennis racket',
#     40: u'bottle',
#     41: u'wine glass',
#     42: u'cup',
#     43: u'fork',
#     44: u'knife',
#     45: u'spoon',
#     46: u'bowl',
#     47: u'banana',
#     48: u'apple',
#     49: u'sandwich',
#     50: u'orange',
#     51: u'broccoli',
#     52: u'carrot',
#     53: u'hot dog',
#     54: u'pizza',
#     55: u'donut',
#     56: u'cake',
#     57: u'chair',
#     58: u'couch',
#     59: u'potted plant',
#     60: u'bed',
#     61: u'dining table',
#     62: u'toilet',
#     63: u'tv',
#     64: u'laptop',
#     65: u'mouse',
#     66: u'remote',
#     67: u'keyboard',
#     68: u'cell phone',
#     69: u'microwave',
#     70: u'oven',
#     71: u'toaster',
#     72: u'sink',
#     73: u'refrigerator',
#     74: u'book',
#     75: u'clock',
#     76: u'vase',
#     77: u'scissors',
#     78: u'teddy bear',
#     79: u'hair drier',
# 80: u'toothbrush'
# }


# # Function to process the image and return results with explicit names
# def process_image(image_url):
#     try:
#         start_timestamp = time.time()
#         # Download the image using the URL
#         response = requests.get(image_url)
#         image = Image.open(BytesIO(response.content))
#         image = np.array(image)

#         # Get the image width and height
#         image_height, image_width = image.shape[:2]
#         image_loaded_timestamp = time.time()

#         # Perform object detection using the YOLO model
#         results = model(image)

#         # Get the bounding box results
#         bounding_boxes = results.xyxy[0].cpu().numpy()

#         # Convert to (x_center, y_center, width, height) and normalize
#         detected_objects = []
#         for box in bounding_boxes:
#             x1, y1, x2, y2 = box[0], box[1], box[2], box[3]
            
#             # Center of the box
#             x_center = (x1 + x2) / 2 / image_width
#             y_center = (y1 + y2) / 2 / image_height
            
#             # Width and height of the box
#             width = (x2 - x1) / image_width
#             height = (y2 - y1) / image_height
            
#             # Confidence and class
#             confidence = box[4]
#             class_id = int(box[5])

#             # Get the class name from the class ID
#             class_name = coco_classes.get(class_id, f"class_{class_id}")  # Default to "class_X" if not in the mapping
            
#             # Add the detected object to the list
#             detected_objects.append({
#                 "class_name": class_name,
#                 "x_center": x_center,
#                 "y_center": y_center,
#                 "width": width,
#                 "height": height,
#                 "confidence": confidence
#             })
#         end_timestamp = time.time()
#         # Return the list of detected objects
#         return {
#             start_timestamp: start_timestamp,
#             image_loaded_timestamp: image_loaded_timestamp,
#             end_timestamp: end_timestamp,
#             detected_objects:detected_objects
#             }

#     except Exception as e:
#         print(f"Error processing image: {e}")
#         return None


# # Callback quando uma mensagem é recebida
# def callback(ch, method, properties, body):
#     try:
#         # Fazer o parsing do JSON recebido
#         message = json.loads(body.decode())
#         image_url = message['image_url']  # Extrair o campo 'image_url'
#         image_id = message['image_id']  # Extrair o campo 'image_id'

#         print(f"Received URL: {image_url}")

#         # Processar a imagem
#         info = process_image(image_url)

#         print(f"Processed results: {bounding_boxes}")
#         #spread operator in python to get info values and keys in new_message
#         new_message = {
#             "service_name": "ai_service",
#             **info
#         }

#         # if bounding_boxes:
#         #     channel.basic_publish(
#         #         exchange='on_image-exchange',
#         #         routing_key='',
#         #         body=str(bounding_boxes),
#         #         properties=pika.BasicProperties(delivery_mode=2)
#         #     )
#         #     print(f"Processed and published results for {image_url}")

#         # Acknowledge que a mensagem foi processada
#         ch.basic_ack(delivery_tag=method.delivery_tag)
#     except Exception as e:
#         print(f"Failed to process message: {e}")
#         ch.basic_nack(delivery_tag=method.delivery_tag)

# # Consumir mensagens da fila
# channel.basic_consume(queue='image-processor-on_image-queue', on_message_callback=callback)

# print("Waiting for messages. To exit press CTRL+C")
# channel.start_consuming()
