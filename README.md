# Easify

Easify is a Task management web application built with Django (backend) and React (frontend).

## Features

- User registration and authentication
- Task creation and management
- Invitation system for workspace collaboration
- Deadline reminders

## Tech Stack

- **Backend:** Django, Django REST Framework
- **Frontend:** React
- **API Auth:** (e.g., djoser or dj-rest-auth, configure as needed)

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- PostgreSQL (or SQLite for development)

### Backend Setup

1. Install dependencies:
    ```bash
    cd backend
    python -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    ```

2. Apply migrations:
    ```bash
    python manage.py migrate
    ```

3. Create a superuser:
    ```bash
    python manage.py createsuperuser
    ```

4. Run the backend server:
    ```bash
    python manage.py runserver
    ```

### Frontend Setup

1. Install dependencies:
    ```bash
    cd frontend
    npm install
    ```

2. Start the frontend server:
    ```bash
    npm start
    ```

### Configuration

- Update API endpoints in `frontend/src/services/api.js` if needed.
- Configure CORS in Django settings for local development.

### Registration

- Visit `/register` on the frontend to create a new account.
- Registration form requires username, email, password, and password confirmation.

### API Endpoints

- `/api/auth/users/` - Register a new user
- `/api/auth/jwt/create/` - Obtain JWT token
- `/api/workspaces/` - Manage workspaces
- `/api/projects/` - Manage projects

## Folder Structure

```
easify/
  backend/
    workspace/
    manage.py
    ...
  frontend/
    src/
      pages/
      services/
      ...
```

## Troubleshooting

- If registration fails, check backend logs and ensure the registration endpoint is enabled.
- For CORS errors, install and configure `django-cors-headers`.

## License

MIT License