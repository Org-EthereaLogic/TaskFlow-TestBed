"""Tests for task API endpoints."""

import pytest
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.task import Task, TaskStatus, TaskPriority
from app.models.user import User


@pytest.fixture
async def test_user(db_session: AsyncSession) -> User:
    """Create a test user."""
    from app.api.auth import get_password_hash
    
    user = User(
        email="test@example.com",
        username="testuser",
        hashed_password=get_password_hash("testpass"),
        full_name="Test User",
    )
    db_session.add(user)
    await db_session.commit()
    await db_session.refresh(user)
    return user


@pytest.fixture
async def test_task(db_session: AsyncSession, test_user: User) -> Task:
    """Create a test task."""
    task = Task(
        title="Test Task",
        description="A test task description",
        status=TaskStatus.TODO,
        priority=TaskPriority.MEDIUM,
        owner_id=test_user.id,
    )
    db_session.add(task)
    await db_session.commit()
    await db_session.refresh(task)
    return task


@pytest.mark.asyncio
async def test_list_tasks_empty(client: AsyncClient):
    """Test listing tasks when none exist."""
    response = await client.get("/api/tasks")
    assert response.status_code == 200
    data = response.json()
    assert data["items"] == []
    assert data["total"] == 0


@pytest.mark.asyncio
async def test_list_tasks_with_data(client: AsyncClient, test_task: Task):
    """Test listing tasks with existing data."""
    response = await client.get("/api/tasks")
    assert response.status_code == 200
    data = response.json()
    assert len(data["items"]) == 1
    assert data["items"][0]["title"] == "Test Task"


@pytest.mark.asyncio
async def test_get_task(client: AsyncClient, test_task: Task):
    """Test getting a single task."""
    response = await client.get(f"/api/tasks/{test_task.id}")
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Test Task"
    assert data["status"] == "todo"


@pytest.mark.asyncio
async def test_get_task_not_found(client: AsyncClient):
    """Test getting a non-existent task."""
    response = await client.get("/api/tasks/999")
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_create_task(client: AsyncClient, test_user: User):
    """Test creating a new task."""
    response = await client.post(
        "/api/tasks",
        json={
            "title": "New Task",
            "description": "A new task",
            "priority": "high",
        },
    )
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "New Task"
    assert data["priority"] == "high"
    assert data["status"] == "todo"


@pytest.mark.asyncio
async def test_update_task(client: AsyncClient, test_task: Task):
    """Test updating a task."""
    response = await client.put(
        f"/api/tasks/{test_task.id}",
        json={"status": "in_progress"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "in_progress"


@pytest.mark.asyncio
async def test_delete_task(client: AsyncClient, test_task: Task):
    """Test deleting a task."""
    response = await client.delete(f"/api/tasks/{test_task.id}")
    assert response.status_code == 204
    
    # Verify deletion
    response = await client.get(f"/api/tasks/{test_task.id}")
    assert response.status_code == 404
