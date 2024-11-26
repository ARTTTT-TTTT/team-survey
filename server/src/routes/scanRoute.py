from fastapi import APIRouter, HTTPException, UploadFile, File, status
import os
from tempfile import NamedTemporaryFile
from ..ai.scanFn import process_id_card

router = APIRouter()


@router.post("/process-id-card")
async def process_uploaded_image(image_file: UploadFile = File(...)):
    try:
        # Ensure the uploaded file is an image
        if image_file.content_type not in ["image/jpeg", "image/png"]:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid file type for file {image_file.filename}. Allowed types are image/jpeg, image/png."
            )
        
        # Save the uploaded image to a temporary file
        with NamedTemporaryFile(delete=False, suffix=".jpg") as temp_file:
            temp_file.write(await image_file.read())  # Binary data
            temp_file_path = temp_file.name
        
        # Process the image using `process_id_card`
        result, normalized_image, cropped_image, portrait_image = process_id_card(temp_file_path)
        
        # Clean up the temporary file
        os.remove(temp_file_path)
        
        # Return the result
        return result

    except ValueError as ve:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(ve)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
