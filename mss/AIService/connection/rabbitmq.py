# connection/rabbitmq.py

import pika
from config.settings import (
    RABBITMQ_HOST,
    RABBITMQ_PORT,
    RABBITMQ_USER,
    RABBITMQ_PASSWORD
)

# Global connection variable
global_connection = None

def get_rabbitmq_connection():
    global global_connection  # Use the global variable
    if global_connection:  # If the connection already exists, return it
        return global_connection
    # Otherwise, create a new connection
    credentials = pika.PlainCredentials(RABBITMQ_USER, RABBITMQ_PASSWORD)
    global_connection = pika.BlockingConnection(
        pika.ConnectionParameters(
            host=RABBITMQ_HOST,
            port=RABBITMQ_PORT,
            credentials=credentials
        )
    )
    return global_connection

def get_channel():
    # Get the connection and create a channel
    connection = get_rabbitmq_connection()
    channel = connection.channel()
    return channel

def setup_queue(queue_name, exchange_name):
    # Get channel and declare queue and exchange
    channel = get_channel()
    channel.queue_declare(queue=queue_name, durable=True)
    channel.exchange_declare(exchange=exchange_name, exchange_type='fanout', durable=True)
    channel.queue_bind(exchange=exchange_name, queue=queue_name)
    return channel

def setup_exchange(exchange_name):
    # Get channel and declare exchange
    channel = get_channel()
    channel.exchange_declare(exchange=exchange_name, exchange_type='fanout', durable=True)
    return channel
