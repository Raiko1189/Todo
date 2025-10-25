from pydantic import BaseModel
from datetime import datetime

class TaskBase(BaseModel):
    title:str
    description:str | None = None
    is_completed : bool | None = None

class Taskcreate(TaskBase):
    pass

class TaskResponse(TaskBase):
    id : int

    class Config:
        orm_mode = True