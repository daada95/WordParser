from fastapi import FastAPI, UploadFile
from minio import Minio
import tempfile

app = FastAPI()


@app.post("/upload")
async def upload_file(file: UploadFile):
    with tempfile.NamedTemporaryFile() as tmpfile:
        print(tmpfile.name)
        minio_client = Minio(
            "minio:9000",
            access_key="ROOTNAME",
            secret_key="CHANGEME123",
            secure=False,
            region="my-region",
        )
        bucket_name = "python-test-bucket"
        if not minio_client.bucket_exists(bucket_name):
            minio_client.make_bucket(bucket_name, location="my-region")
        minio_client.fput_object(
            bucket_name, file.filename, tmpfile.name,
        )
    return {"filename": file.filename}
