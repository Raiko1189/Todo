from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session
import models,database,schema

router = APIRouter( prefix="/tasks", tags =["tasks"])

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/" , response_model= list[schema.TaskResponse])
def get_task(db:Session = Depends(get_db)):
    return db.query(models.Task).all()

@router.post("/", response_model= schema.TaskResponse)
def create_task( task: schema.Taskcreate , db:Session = Depends(get_db)):
    new_task = models.Task(**task.dict())
    db.add(new_task)
    db.commit()
    return new_task

@router.put("/{task_id}",response_model=schema.TaskResponse)
def update_task(task_id:int,task: schema.Taskcreate ,db:Session = Depends(get_db)):
    db_task = db.query(models.Task).filter(task_id == models.Task.id).first()
    if not db_task:
        raise HTTPException ( status_code= 404 , detail ="Task not found")
    for key,value in task.dict().items (): 
        setattr (db_task,key,value)
    db.commit()
    db.refresh(db_task)
    return db_task
@router.delete("/{task_id}")
def delete_task(task_id: int , db:Session = Depends(get_db)):
    task = db.query(models.Task).filter(task_id == models.Task.id).first()
    if not task:
        raise HTTPException (status_code= 404 , detail = "Task not found")
    db.delete(task)
    db.commit()
    return {"message " : " Task deleted successfully "}
    
    