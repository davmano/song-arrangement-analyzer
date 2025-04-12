from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import librosa
import os
import uuid
import shutil
import json

app = FastAPI()

@app.post("/analyze")
async def analyze_song(file: UploadFile = File(...)):
    # Save uploaded file temporarily
    temp_dir = "temp_audio"
    os.makedirs(temp_dir, exist_ok=True)
    temp_path = os.path.join(temp_dir, f"{uuid.uuid4()}-{file.filename}")
    
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        # Load audio file
        y, sr = librosa.load(temp_path)

        # Get song duration
        duration = librosa.get_duration(y=y, sr=sr)

        # MOCKED structure (we can improve this later)
        structure = [
            {"label": "Intro", "start": 0.0, "end": duration * 0.15},
            {"label": "Verse", "start": duration * 0.15, "end": duration * 0.45},
            {"label": "Chorus", "start": duration * 0.45, "end": duration * 0.65},
            {"label": "Bridge", "start": duration * 0.65, "end": duration * 0.85},
            {"label": "Outro", "start": duration * 0.85, "end": duration}
        ]

        return JSONResponse(content=structure)

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

    finally:
        os.remove(temp_path)

@app.get("/")
def root():
    return {"message": "FastAPI analyzer is running"}
