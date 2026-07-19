import requests
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import engine, SessionLocal
from models import Base, Job , User
from schemas import UserCreate, UserLogin, JobCreate

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)


@app.get("/")
def home():
    return {
        "message": "Welcome to Europe Job Hunter AI Backend 🚀"
    }


@app.get("/jobs")
def get_jobs():

    db: Session = SessionLocal()

    jobs = db.query(Job).all()

    if len(jobs) == 0:
        sample_jobs = [
            Job(title="Warehouse Worker", country="Germany", salary="€2800/month", visa="Sponsored"),
            Job(title="Bike Rider", country="Netherlands", salary="€2600/month", visa="Sponsored"),
            Job(title="Factory Worker", country="Poland", salary="€2200/month", visa="Available"),
        ]

        db.add_all(sample_jobs)
        db.commit()

        jobs = db.query(Job).all()

    data = []

    for job in jobs:
        data.append({
            "id": job.id,
            "title": job.title,
            "country": job.country,
            "salary": job.salary,
            "visa": job.visa
        })

    db.close()

    return data
@app.post("/signup")
def signup(user: UserCreate):

    db: Session = SessionLocal()

    existing_user = db.query(User).filter(User.email == user.email).first()

    if existing_user:
        db.close()
        return {"message": "Email already exists"}

    new_user = User(
        name=user.name,
        email=user.email,
        password=user.password
    )

    db.add(new_user)
    db.commit()

    db.close()

    return {
        "message": "Signup Successful"
    }
@app.post("/login")
def login(user: UserLogin):

    db: Session = SessionLocal()

    existing_user = db.query(User).filter(
        User.email == user.email,
        User.password == user.password
    ).first()

    db.close()

    if existing_user:
        return {
            "message": "Login Successful",
            "name": existing_user.name,
            "email": existing_user.email
        }

    return {
        "message": "Invalid email or password"
    }

@app.post("/admin/add-job")
def add_job(job: JobCreate):

    db: Session = SessionLocal()

    new_job = Job(
        title=job.title,
        country=job.country,
        salary=job.salary,
        visa=job.visa
    )

    db.add(new_job)
    db.commit()
    db.refresh(new_job)

    db.close()

    return {
        "message": "Job Added Successfully",
        "job_id": new_job.id
    }

@app.get("/live-jobs")
def live_jobs():

    url = "https://www.arbeitnow.com/api/job-board-api"

    response = requests.get(url)

    data = response.json()

    return data