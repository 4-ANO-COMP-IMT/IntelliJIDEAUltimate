# consumers/image_consumer.py

import json
from connection.rabbitmq import get_rabbitmq_connection, setup_queue
from config.settings import (
    INPUT_EXCHANGE,
    INPUT_QUEUE,
    OUTPUT_EXCHANGE,
    OUTPUT_EXCHANGE_TYPE,
    SERVICE_NAME
)
from ai.yolo import YOLOProcessor
from publishers.result_publisher import publish_results

def callback(ch, method, properties, body, yolo_processor):
    try:
        message = json.loads(body.decode())
        image_url = message['image_url']
        image_id = message['image_id']

        print(f"Received image_id: {image_id}, URL: {image_url}")
        info = yolo_processor.process_image(image_url)

        print(f"info: {info}")
        print("----")
        print(f"time to load image: {info['image_loaded_timestamp'] - info['start_timestamp']}")
        print(f"time to process image: {info['end_timestamp'] - info['image_loaded_timestamp']}")
        print("-----------------")
        if info is not None:
            new_message = {
                "service_name": SERVICE_NAME,
                "image_id": image_id,
                **info
            }
            publish_results(new_message)

        ch.basic_ack(delivery_tag=method.delivery_tag)
    except Exception as e:
        print(f"Failed to process message: {e}")
        ch.basic_nack(delivery_tag=method.delivery_tag)

def start_consumer():
    channel = setup_queue(INPUT_QUEUE, INPUT_EXCHANGE)

    yolo_processor = YOLOProcessor()

    consumer_callback = lambda ch, method, properties, body: callback(
        ch, method, properties, body, yolo_processor
    )

    channel.basic_consume(queue=INPUT_QUEUE, on_message_callback=consumer_callback)

    print("Waiting for messages. To exit press CTRL+C")
    channel.start_consuming()
