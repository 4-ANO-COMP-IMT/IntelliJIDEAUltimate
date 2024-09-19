# publishers/result_publisher.py

import json
import pika
import numpy as np
from connection.rabbitmq import setup_exchange
from config.settings import OUTPUT_EXCHANGE, OUTPUT_EXCHANGE_TYPE

# Global channel variable
channel = None

def start_publisher():
    global channel  # Declare that we are using the global variable
    if channel is None:  # Only initialize the channel if it's not already initialized
        channel = setup_exchange(OUTPUT_EXCHANGE)
    return channel

# Helper function to convert NumPy types to native Python types
def convert_numpy_to_native(obj):
    if isinstance(obj, np.ndarray):
        return obj.tolist()  # Convert NumPy arrays to lists
    elif isinstance(obj, (np.float32, np.float64)):
        return float(obj)  # Convert NumPy floats to Python float
    elif isinstance(obj, (np.int32, np.int64)):
        return int(obj)  # Convert NumPy integers to Python int
    elif isinstance(obj, np.bool_):
        return bool(obj)  # Convert NumPy booleans to Python bool
    elif isinstance(obj, dict):
        return {k: convert_numpy_to_native(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [convert_numpy_to_native(i) for i in obj]
    return obj

def publish_results(message):
    global channel  # Use the global channel variable
    if channel is None:
        channel = start_publisher()  # Initialize channel only if not already initialized

    try:
        # print(f"Publishing processed results for image_id: {message.get('image_id')}")
        # print(f"Detected objects: {message.get('detected_objects')}")
        # Ensure the message is JSON serializable
        serializable_message = convert_numpy_to_native(message)
        
        channel.basic_publish(
            exchange=OUTPUT_EXCHANGE,
            routing_key='',  # Not needed for fanout
            body=json.dumps(serializable_message),
            properties=pika.BasicProperties(
                delivery_mode=2  # Make message persistent
            )
        )
        print(f"Published processed results for image_id: {message.get('image_id')}")
    except Exception as e:
        print(f"Failed to publish results: {e}")
