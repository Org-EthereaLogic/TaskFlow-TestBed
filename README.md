# TaskFlow

A full-stack task management application for testing the ADWS (AI Developer Workflow System).

## Tech Stack

### Backend
- **Framework:** FastAPI
- **Database:** PostgreSQL + SQLAlchemy
- **Auth:** JWT tokens
- **Testing:** pytest

### Frontend
- **Framework:** React 18 + TypeScript
- **Styling:** Tailwind CSS
- **State:** React Query + Zustand
- **Testing:** Vitest + Testing Library

## Quick Start

### Prerequisites
- Python 3.11+
- Node.js 20+
- Docker & Docker Compose
- UV (Python package manager)

### Backend Setup

```bash
cd backend
uv sync
uv run uvicorn app.main:app --reload --port 8000
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Database Setup

```bash
docker compose up -d postgres
cd backend
uv run alembic upgrade head
```

## Project Structure

```
taskflow/
├── backend/
│   ├── app/
│   │   ├── api/          # API routes
│   │   ├── models/       # SQLAlchemy models
│   │   ├── services/     # Business logic
│   │   ├── core/         # Config, security, deps
│   │   └── tests/        # pytest tests
│   ├── migrations/       # Alembic migrations
│   └── pyproject.toml
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── hooks/        # Custom hooks
│   │   ├── pages/        # Page components
│   │   ├── utils/        # Utilities
│   │   └── types/        # TypeScript types
│   └── package.json
├── docs/                 # Documentation
└── docker-compose.yml
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | List all tasks |
| POST | /api/tasks | Create task |
| GET | /api/tasks/{id} | Get task by ID |
| PUT | /api/tasks/{id} | Update task |
| DELETE | /api/tasks/{id} | Delete task |
| POST | /api/auth/login | User login |
| POST | /api/auth/register | User registration |

## Testing

```bash
# Backend tests
cd backend && uv run pytest

# Frontend tests
cd frontend && npm test
```

## License

MIT - For ADWS testing purposes only.
