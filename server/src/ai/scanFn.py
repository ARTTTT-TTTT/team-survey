
import cv2 as cv
import pandas as pd
from ultralytics import YOLO
import pytesseract
import numpy as np
import re
import base64
import matplotlib.pyplot as plt
from rapidfuzz import process

# Load YOLO models

# ID Card detection model
# model_card = YOLO('C:\work\Team-Survey\server\src/ai/best_new.pt')  
model_card = YOLO('/Users/natthanichasamanchat/Downloads/Development/GitHub/Team-Survey/server/src/ai/best_new.pt')  
model_card.to('cpu')  # Force to run on CPU
# Portrait detection model
# model_portrait = YOLO('C:\work\Team-Survey\server\src/ai/yolov8x.pt')
model_portrait = YOLO('/Users/natthanichasamanchat/Downloads/Development/GitHub/Team-Survey/server/src/ai/yolov8x.pt')  

# Set Tesseract executable path
pytesseract.pytesseract.tesseract_cmd = r"/opt/homebrew/bin/tesseract"
# pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

def ocr_text(img, lang='eng'):
    """Perform OCR on the given image."""
    return pytesseract.image_to_string(img, lang=lang)

def img_base64(img):
    """Convert image to Base64."""
    _, buffer = cv.imencode('.jpg', img)
    img_bytes = buffer.tobytes()
    return base64.b64encode(img_bytes).decode('utf-8')

def detect_and_crop(img, model):
    """Detect and crop object in image using YOLO model."""
    detections = model.predict(img)
    if detections[0].boxes is not None and len(detections[0].boxes) > 0:
        for box in detections[0].boxes:
            x1, y1, x2, y2 = map(int, box.xyxy[0])
            confidence = box.conf[0]
            return img[y1:y2, x1:x2]
    return None

def clean_address(text):
    """Clean address by extracting numeric data."""
    match = re.search(r'\d', text)
    if match:
        first_digit_index = match.start()
        cleaned_text = text[first_digit_index:]
        return cleaned_text
    return text

def norm_img(img):
    """Normalize and preprocess image."""
    clahe = cv.createCLAHE(clipLimit=3.0, tileGridSize=(8, 8))
    img = clahe.apply(img)

    norm_img = np.zeros((img.shape[0], img.shape[1]))
    img = cv.normalize(img, norm_img, 0, 240, cv.NORM_MINMAX)
    img = cv.threshold(img, 100, 200, cv.THRESH_BINARY)[1]
    img = cv.GaussianBlur(img, (1, 1), 0)

    if len(img.shape) == 2:  # Grayscale image
        img = cv.cvtColor(img, cv.COLOR_GRAY2BGR)

    return img
# def perspectiveFLANN_and_transform(image_card, template_gray_path = r"C:\work\Team-Survey\server\src\ai\p1_gray.jpg"
def perspectiveFLANN_and_transform(image_card, template_gray_path = r"/Users/natthanichasamanchat/Downloads/Development/GitHub/Team-Survey/server/src/ai/p1_gray.jpg"
):
    """Apply perspective transformation using FLANN."""
    gray_card = image_card  # Grayscale cropped image
    gray_template = cv.imread(template_gray_path)  # Template grayscale image

    # Resize images
    gray_card = cv.resize(gray_card, (640, 480))
    gray_template = cv.resize(gray_template, (640, 480))

    sift = cv.SIFT_create()

    # Detect keypoints and descriptors
    keypoints_card, descriptors_card = sift.detectAndCompute(gray_card, None)
    keypoints_template, descriptors_template = sift.detectAndCompute(gray_template, None)

    # Set up FLANN parameters
    FLANN_INDEX_KDTREE = 1
    indexParams = dict(algorithm=FLANN_INDEX_KDTREE, trees=5)
    searchParams = dict(checks=50)

    # FLANN-based matcher
    flann = cv.FlannBasedMatcher(indexParams, searchParams)

    # Find k-nearest matches
    matches = flann.knnMatch(descriptors_card, descriptors_template, k=2)

    # Apply ratio test to filter good matches
    good_matches = []
    points_card = []
    points_template = []
    ratio_thresh = 0.75
    for m, n in matches:
        if m.distance < ratio_thresh * n.distance:
            good_matches.append(m)
            points_card.append(keypoints_card[m.queryIdx].pt)
            points_template.append(keypoints_template[m.trainIdx].pt)

    # Convert points to numpy arrays
    points_card = np.float32(points_card).reshape(-1, 1, 2)
    points_template = np.float32(points_template).reshape(-1, 1, 2)

    # Compute Homography Matrix
    if len(points_card) >= 4:
        homography, mask = cv.findHomography(points_card, points_template, cv.RANSAC, 5.0)
        h, w = gray_template.shape[:2]
        transformed_image = cv.warpPerspective(gray_card, homography, (w, h))

        return transformed_image
    else:
        #print("Not enough matches found to compute homography.")
        return None

def compare_address(address):
    # path_to_excel = r"C:\work\Team-Survey\server\src\ai\Address2col_prepared.xlsx"
    path_to_excel = r"/Users/natthanichasamanchat/Downloads/Development/GitHub/Team-Survey/server/src/ai/Address2col_prepared.xlsx"
    df = pd.read_excel(path_to_excel)

    # Input address to match
    address = address

    # Combine TambonThai, DistrictThai, and ProvinceThai into a single column for matching
    df['FullAddress'] = df['TambonThai'] + df['DistrictThai'] + df['ProvinceThai']

    # Use rapidfuzz to find the best match
    matched_address = process.extractOne(address, df['FullAddress'])
    matched_row_index = df[df['FullAddress'] == matched_address[0]].index[0]

    # Get the matched row's values
    matched_tambon = df.at[matched_row_index, 'TambonThai']
    matched_district = df.at[matched_row_index, 'DistrictThai']
    matched_province = df.at[matched_row_index, 'ProvinceThai']

    # Print the results
    print(f"Matched Address: {matched_address[0]}")
    print(f"Matched TambonThai: {matched_tambon}")
    print(f"Matched DistrictThai: {matched_district}")
    print(f"Matched ProvinceThai: {matched_province}")
    print(f"Matched Address: {matched_address[0]}\nMatched TambonThai: {matched_tambon},Matched DistrictThai: {matched_district},Matched ProvinceThai: {matched_province}")
    return matched_tambon,matched_district,matched_province

def process_id_card(image_file):
    """Process the ID Card image received as input."""
    img = cv.imread(image_file, cv.IMREAD_COLOR)
    if img is None:
        #print("Error: Image not found.")
        return

    # Detect and crop the card
    img_crop = detect_and_crop(img, model_card)
    if img_crop is None:
        #print("No objects detected in the image.")
        return

    # Resize the detected card area and detect portrait within it
    img_resized = cv.resize(img_crop, (640, 480))
    img_portrait = detect_and_crop(img_resized, model_portrait)

    # Convert to grayscale and normalize for OCR
    img_resized_gray = cv.cvtColor(img_resized, cv.COLOR_BGR2GRAY)
    img_resized_norm = norm_img(img_resized_gray)

    # Apply perspective transformation
    img_resized_norm = perspectiveFLANN_and_transform(img_resized_norm)

    # Perform OCR on various regions of the image
    img_ID = ocr_text(img_resized_norm[45:85, 280:640], lang='eng')  # ID number
    img_name_TH = ocr_text(img_resized_norm[85:150, 180:640], lang='tha')  # Thai name
    img_name_EN = ocr_text(img_resized_norm[140:180, 260:640], lang='eng')  # English first name
    img_lastname_EN = ocr_text(img_resized_norm[175:215, 290:640], lang='eng')  # English last name
    img_address = ocr_text(img_resized_norm[310:385, 70:450], lang='tha')  # Address

    # Clean address and prepare results
    cleaned_address = clean_address(img_address)
    img_address_new = compare_address(img_address)

    result = {
        "id_card": img_ID,
        "name_th": img_name_TH,
        "name_en": img_name_EN,
        "lastname_en": img_lastname_EN,
        "address": cleaned_address,
        "new_address":img_address_new
    }

    # Convert portrait image to base64 if detected
    img_portrait_base64 = None
    if img_portrait is not None:
        img_portrait_gray = cv.cvtColor(img_portrait, cv.COLOR_BGR2GRAY)
        img_portrait_base64 = img_base64(img_portrait_gray)

    result["portrait_base64"] = img_portrait_base64

    print(result)
    return result, img_resized_norm, img_crop, img_portrait