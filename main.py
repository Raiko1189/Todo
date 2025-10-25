from fastapi import FastAPI
import models , database,schema
from routers import task_router

app = FastAPI(title = "Task Manager API")

models.Base.metadata.create_all(bind= database.engine)

app.include_router(task_router.router)

# main.py
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return{"message":" welcome to Task Manager API"}