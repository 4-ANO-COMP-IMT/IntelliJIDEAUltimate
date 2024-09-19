# main.py

from consumers.image_consumer import start_consumer
from publishers.result_publisher import start_publisher 

if __name__ == "__main__":
    start_publisher()
    start_consumer()

    
