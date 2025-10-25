from sqlalchemy import Integer,Column,String,Boolean,DateTime,func
from database import Base

class Task(Base):
  __tablename__="tasks"
  
  id = Column(Integer, primary_key = True , index = True)
  title = Column(String(200),nullable = False)
  description = Column(String(400),nullable = False)
  is_completed = Column(Boolean,default = False)
  created_at = Column(DateTime(timezone=True),server_default=func.now())