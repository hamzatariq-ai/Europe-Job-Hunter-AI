from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Europe Job Hunter AI",
    version="1.0.0"
)

# Frontend ko backend se connect karne ke liye
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "status": "online",
        "message": "Welcome to Europe Job Hunter AI Backend 🚀"
    }

@app.get("/jobs")
def get_jobs():
    return [
        {
            "id": 1,
            "title": "Warehouse Worker",
            "country": "Germany",
            "salary": "€2800/month",
            "visa": "Sponsored"
        },
        {
            "id": 2,
            "title": "Bike Rider",
            "country": "Netherlands",
            "salary": "€2600/month",
            "visa": "Sponsored"
        },
        {
            "id": 3,
            "title": "Factory Worker",
            "country": "Poland",
            "salary": "€2200/month",
            "visa": "Available"
        }
    ]