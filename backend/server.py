from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Arky Allogist Ant Book Launch API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    read: bool = False

class ContactMessageCreate(BaseModel):
    name: str
    email: str
    message: str

class NewsletterSubscriber(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    subscribed_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    active: bool = True

class NewsletterSubscribe(BaseModel):
    email: str

class BookOrder(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    address: str
    city: str
    state: str
    zip_code: str
    quantity: int = 1
    order_type: str = "paperback"  # paperback or ebook
    status: str = "pending"  # pending, processing, shipped, delivered
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    notes: Optional[str] = None

class BookOrderCreate(BaseModel):
    name: str
    email: str
    address: str
    city: str
    state: str
    zip_code: str
    quantity: int = 1
    order_type: str = "paperback"
    notes: Optional[str] = None


# Routes
@api_router.get("/")
async def root():
    return {"message": "Welcome to The Adventures of Arky Allogist Ant API"}

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "book": "The Adventures of Arky Allogist Ant"}


# Contact endpoints
@api_router.post("/contact", response_model=ContactMessage)
async def create_contact_message(input: ContactMessageCreate):
    contact_dict = input.model_dump()
    contact_obj = ContactMessage(**contact_dict)
    
    doc = contact_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.contact_messages.insert_one(doc)
    return contact_obj

@api_router.get("/contact", response_model=List[ContactMessage])
async def get_contact_messages():
    messages = await db.contact_messages.find({}, {"_id": 0}).to_list(1000)
    
    for msg in messages:
        if isinstance(msg['created_at'], str):
            msg['created_at'] = datetime.fromisoformat(msg['created_at'])
    
    return messages


# Newsletter endpoints
@api_router.post("/newsletter/subscribe", response_model=NewsletterSubscriber)
async def subscribe_newsletter(input: NewsletterSubscribe):
    # Check if already subscribed
    existing = await db.newsletter_subscribers.find_one(
        {"email": input.email},
        {"_id": 0}
    )
    
    if existing:
        if existing.get('active', True):
            raise HTTPException(status_code=400, detail="Email already subscribed")
        else:
            # Reactivate subscription
            await db.newsletter_subscribers.update_one(
                {"email": input.email},
                {"$set": {"active": True}}
            )
            existing['active'] = True
            if isinstance(existing['subscribed_at'], str):
                existing['subscribed_at'] = datetime.fromisoformat(existing['subscribed_at'])
            return NewsletterSubscriber(**existing)
    
    subscriber_obj = NewsletterSubscriber(email=input.email)
    doc = subscriber_obj.model_dump()
    doc['subscribed_at'] = doc['subscribed_at'].isoformat()
    
    await db.newsletter_subscribers.insert_one(doc)
    return subscriber_obj

@api_router.get("/newsletter/subscribers", response_model=List[NewsletterSubscriber])
async def get_newsletter_subscribers():
    subscribers = await db.newsletter_subscribers.find(
        {"active": True},
        {"_id": 0}
    ).to_list(1000)
    
    for sub in subscribers:
        if isinstance(sub['subscribed_at'], str):
            sub['subscribed_at'] = datetime.fromisoformat(sub['subscribed_at'])
    
    return subscribers


# Book order endpoints (for direct paperback orders)
@api_router.post("/orders", response_model=BookOrder)
async def create_book_order(input: BookOrderCreate):
    order_dict = input.model_dump()
    order_obj = BookOrder(**order_dict)
    
    doc = order_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.book_orders.insert_one(doc)
    return order_obj

@api_router.get("/orders", response_model=List[BookOrder])
async def get_book_orders():
    orders = await db.book_orders.find({}, {"_id": 0}).to_list(1000)
    
    for order in orders:
        if isinstance(order['created_at'], str):
            order['created_at'] = datetime.fromisoformat(order['created_at'])
    
    return orders

@api_router.get("/orders/{order_id}", response_model=BookOrder)
async def get_book_order(order_id: str):
    order = await db.book_orders.find_one({"id": order_id}, {"_id": 0})
    
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    if isinstance(order['created_at'], str):
        order['created_at'] = datetime.fromisoformat(order['created_at'])
    
    return order

@api_router.patch("/orders/{order_id}/status")
async def update_order_status(order_id: str, status: str):
    valid_statuses = ["pending", "processing", "shipped", "delivered"]
    if status not in valid_statuses:
        raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of: {valid_statuses}")
    
    result = await db.book_orders.update_one(
        {"id": order_id},
        {"$set": {"status": status}}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Order not found")
    
    return {"message": "Order status updated", "status": status}


# Book info endpoint
@api_router.get("/book/info")
async def get_book_info():
    return {
        "title": "The Adventures of Arky Allogist Ant",
        "author": "Poopah (Moises Mendoza)",
        "description": "Join Arky on a faith-based adventure! A heartwarming tale for the whole family.",
        "chapters": 8,
        "target_audience": "Children & Families",
        "themes": ["Faith", "Family", "Adventure", "Values"],
        "dedication": "For the Crunch Bunch: Maliyah, Natalia, Jonas, Draco, Silas, Jasper, Sarah, and Violet"
    }


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
