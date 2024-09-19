# config/settings.py

RABBITMQ_HOST = 'localhost'
RABBITMQ_PORT = 5672
RABBITMQ_USER = 'rabbitmq'
RABBITMQ_PASSWORD = 'rabbitmq'

INPUT_EXCHANGE = 'on_image-exchange'
INPUT_QUEUE = 'ia_service-on_image-queue'

OUTPUT_EXCHANGE = 'on_ai_processed-exchange'
OUTPUT_EXCHANGE_TYPE = 'fanout'

SERVICE_NAME = 'ai_service'

COCO_CLASSES = {
    0: 'background',
    1: 'person',
    2: 'bicycle',
    3: 'car',
    4: 'motorcycle',
    16: 'cat',
    17: 'dog',
    # Add more classes here...
}
