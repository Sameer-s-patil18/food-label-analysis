import cv2
import numpy as np
import sys
import json
import base64
from io import BytesIO
from PIL import Image

def preprocess_image(image_data):
    try:
        # Decode base64 image
        image_bytes = base64.b64decode(image_data.split(',')[1])
        nparr = np.frombuffer(image_bytes, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        # Image preprocessing steps
        # 1. Convert to grayscale
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        
        # 2. Apply thresholding to handle shadows
        thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]
        
        # 3. Noise removal using median blur
        denoised = cv2.medianBlur(thresh, 3)
        
        # 4. Edge enhancement
        kernel = np.array([[-1,-1,-1],
                         [-1, 9,-1],
                         [-1,-1,-1]])
        sharpened = cv2.filter2D(denoised, -1, kernel)
        
        # Convert processed image back to base64
        _, buffer = cv2.imencode('.png', sharpened)
        processed_image = base64.b64encode(buffer).decode('utf-8')
        
        return json.dumps({
            'success': True,
            'processed_image': f'data:image/png;base64,{processed_image}'
        })
    except Exception as e:
        return json.dumps({
            'success': False,
            'error': str(e)
        })

if __name__ == '__main__':
    # Read input from stdin
    input_data = sys.stdin.read()
    result = preprocess_image(input_data)
    print(result)