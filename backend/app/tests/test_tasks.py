"""Tests for task API endpoints."""

import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_health_check(client: AsyncClient) -> None:
    """Test health check endpoint."""
    response = await client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "version" in data


@pytest.mark.asyncio
async def test_list_tasks_empty(client: AsyncClient) -> None:
    """Test listing tasks when database is empty."""
    response = await client.get("/api/tasks")
    assert response.status_code == 200
    data = response.json()
    assert data["items"] == []
    assert data["total"] == 0
    assert data["page"] == 1


@pytest.mark.asyncio
async def test_get_task_not_found(client: AsyncClient) -> None:
    """Test getting a non-existent task."""
    response = await client.get("/api/tasks/999")
    assert response.status_code == 404
    assert "not found" in response.json()["detail"].lower()
