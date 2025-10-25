from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv
load_dotenv()

Database_URL =os.getenv("Database_URL")
engine = create_engine(Database_URL)
SessionLocal = sessionmaker(autocommit = False ,autoflush = False , bind=engine)
Base = declarative_base()