from fastapi import FastAPI, UploadFile

app = FastAPI()

@app.post("/upload")
async def upload_file(file: UploadFile):
    return {"filename": file.name}
