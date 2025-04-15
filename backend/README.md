# Blog API Backend

A FastAPI-based RESTful API for a blog application with user authentication, blog posts, categories, tags, and comments.

## Features

- User authentication with JWT tokens
- Blog post management
- Category and tag organization
- Comment system
- User profiles
- RESTful API design
- SQLite database (easily configurable for other databases)
- CORS middleware for frontend integration

## Prerequisites

- Python 3.8+
- pip (Python package installer)
- virtualenv (recommended)

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd backend
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create environment variables file:
```bash
cp .env.example .env
```

5. Edit the `.env` file with your configuration values.

## Running the Application

1. Start the development server:
```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`

## API Documentation

Once the application is running, you can access:
- Interactive API documentation (Swagger UI): `http://localhost:8000/docs`
- Alternative API documentation (ReDoc): `http://localhost:8000/redoc`

## API Endpoints

### Authentication
- POST `/api/auth/token` - Login to get access token
- POST `/api/auth/register` - Register a new user

### Blog
- GET `/api/blog/posts` - List all posts
- POST `/api/blog/posts` - Create a new post
- GET `/api/blog/posts/{post_id}` - Get a specific post
- GET `/api/blog/categories` - List all categories
- POST `/api/blog/categories` - Create a new category
- GET `/api/blog/tags` - List all tags
- POST `/api/blog/tags` - Create a new tag
- GET `/api/blog/posts/{post_id}/comments` - Get comments for a post
- POST `/api/blog/posts/{post_id}/comments` - Add a comment to a post

### Users
- GET `/api/users/me` - Get current user profile
- GET `/api/users` - List all users
- GET `/api/users/{user_id}` - Get a specific user
- PUT `/api/users/me` - Update current user profile

## Development

### Project Structure
```
backend/
├── app/
│   ├── api/
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   ├── blog.py
│   │   └── users.py
│   ├── __init__.py
│   ├── database.py
│   ├── deps.py
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   └── security.py
├── .env.example
├── requirements.txt
└── README.md
```

### Database Migrations

This project uses SQLAlchemy for database operations. The models are automatically created when the application starts. For production use, consider using Alembic for database migrations.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License.