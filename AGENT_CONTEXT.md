# ADWS Agent Context Document

> **Purpose**: This document provides complete context for AI coding agents operating within the TaskFlow-TestBed repository. Read this document in full before beginning any work.

---

## 1. SYSTEM OVERVIEW

### What is ADWS?

ADWS (AI Developer Workflow System) is an automated development pipeline that enables AI coding agents to autonomously handle software development tasks from issue creation through PR merge. The system implements a **fully agentic development paradigm** where AI agents handle 95% of implementation work while humans provide strategic oversight.

### Architecture Components

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           ADWS ARCHITECTURE                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  GitHub Issue          n8n Workflow           ADWS Bridge         AI Agent  │
│  (with 'adws' label)   (Orchestrator)         (VPS API)          (You)      │
│         │                    │                     │                 │      │
│         │  webhook POST      │                     │                 │      │
│         ├───────────────────►│                     │                 │      │
│         │                    │  HTTP /execute      │                 │      │
│         │                    ├────────────────────►│                 │      │
│         │                    │                     │  spawn process  │      │
│         │                    │                     ├────────────────►│      │
│         │                    │                     │                 │      │
│         │                    │                     │◄────────────────┤      │
│         │                    │◄────────────────────┤  return result  │      │
│         │                    │                     │                 │      │
│         │  (repeat for each SDLC phase)            │                 │      │
│         │                    │                     │                 │      │
└─────────────────────────────────────────────────────────────────────────────┘
```

### SDLC Phases (Executed Sequentially)

| Phase | Script | Purpose |
|-------|--------|---------|
| **Plan** | `adw_plan_iso` | Analyze issue, create implementation specification |
| **Build** | `adw_build_iso` | Implement the solution in an isolated worktree |
| **Test** | `adw_test_iso` | Run tests, verify implementation |
| **Review** | `adw_review_iso` | Code review, quality checks |
| **Document** | `adw_document_iso` | Update documentation, add comments |
| **Ship** | `adw_ship_iso` | Create PR, merge to main branch |

---

## 2. TASKFLOW-TESTBED PROJECT

### Purpose

TaskFlow-TestBed is a full-stack task management application created specifically to validate the ADWS system. It provides a realistic codebase with intentional gaps and enhancement opportunities for testing the autonomous development pipeline.

### Technology Stack

**Backend:**
- FastAPI (Python 3.11)
- SQLAlchemy (async)
- PostgreSQL database
- pytest for testing
- JWT authentication

**Frontend:**
- React 18 with TypeScript
- Tailwind CSS
- Zustand for state management
- React Query for data fetching
- Vitest for testing

**Infrastructure:**
- Docker Compose orchestration
- PostgreSQL + Redis services

### Repository Locations

| Location | Path |
|----------|------|
| **Local Development** | `/Users/etherealogic/Dev/ADWS-TestBed/taskflow` |
| **VPS Deployment** | `/opt/adws/projects/TaskFlow-TestBed` |
| **GitHub** | `https://github.com/Org-EthereaLogic/TaskFlow-TestBed` |

### Directory Structure

```
TaskFlow-TestBed/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth.py          # JWT authentication endpoints
│   │   │   ├── tasks.py         # Task CRUD endpoints
│   │   │   └── users.py         # User management endpoints
│   │   ├── core/
│   │   │   ├── config.py        # Pydantic settings
│   │   │   └── database.py      # SQLAlchemy async setup
│   │   ├── models/
│   │   │   ├── task.py          # Task SQLAlchemy model
│   │   │   └── user.py          # User SQLAlchemy model
│   │   ├── tests/
│   │   │   ├── conftest.py      # pytest fixtures
│   │   │   └── test_tasks.py    # Task endpoint tests
│   │   └── main.py              # FastAPI application
│   ├── pyproject.toml           # UV dependencies
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Header.tsx       # Navigation header
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx    # Home dashboard
│   │   │   ├── Login.tsx        # Authentication page
│   │   │   ├── TaskList.tsx     # Task listing
│   │   │   └── TaskDetail.tsx   # Single task view
│   │   ├── hooks/
│   │   │   └── useAuthStore.ts  # Zustand auth store
│   │   ├── types/
│   │   │   ├── task.ts          # Task TypeScript interfaces
│   │   │   └── user.ts          # User TypeScript interfaces
│   │   ├── utils/
│   │   │   └── api.ts           # Axios instance
│   │   ├── styles/
│   │   │   └── index.css        # Tailwind entry
│   │   ├── App.tsx              # Route definitions
│   │   └── main.tsx             # React entry point
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── Dockerfile
├── docker-compose.yml           # Multi-service orchestration
├── README.md
└── .gitignore
```

---

## 3. INFRASTRUCTURE DETAILS

### Active Endpoints

| Service | URL | Purpose |
|---------|-----|---------|
| **n8n Workflow Engine** | `https://n8n.srv1192041.hstgr.cloud` | Workflow orchestration |
| **ADWS Bridge API** | `http://72.62.129.98:8001` | Script execution gateway |
| **TaskFlow Webhook** | `https://n8n.srv1192041.hstgr.cloud/webhook/taskflow-github-trigger` | GitHub event receiver |

### n8n Workflows

| Workflow | ID | Status | Purpose |
|----------|-----|--------|---------|
| **ADWS Issue Handler** | `swv0TMUyanr9qFge` | ✅ Active | Original ADWS-Greenfield handler |
| **TaskFlow TestBed Handler** | `cSlkfu47ufovArdm` | ✅ Active | TaskFlow-specific handler |

### Credentials (Pre-configured in n8n)

| Credential | ID | Used By |
|------------|-----|---------|
| **ADWS Bridge Token** | `I76LMoewqnTKd05w` | All HTTP Request nodes |
| **GitHub EthereaLogic** | `rTcdnsPTy1JYXKyG` | GitHub Trigger nodes |

---

## 4. WORKFLOW TRIGGER MECHANISM

### How Issues Trigger ADWS

1. **Create Issue** on GitHub with the `adws` label
2. **Webhook fires** to n8n at `/webhook/taskflow-github-trigger`
3. **n8n validates** the event (action=labeled, label.name=adws)
4. **Pipeline executes** all 6 SDLC phases sequentially
5. **PR created** with implementation, tests, and documentation

### Issue Requirements

For ADWS to process an issue correctly:

```markdown
## Title
Clear, actionable description (e.g., "Add dark mode toggle to header")

## Body
- Detailed requirements
- Acceptance criteria
- Any constraints or preferences
- Expected behavior
```

### Labels Available

| Label | Color | Purpose |
|-------|-------|---------|
| `adws` | #7C3AED | **Required** - Triggers automation |
| `frontend` | #61DAFB | Frontend changes |
| `backend` | #3776AB | Backend changes |
| `enhancement` | #A2EEEF | New features |
| `bug` | #D73A4A | Bug fixes |
| `refactor` | #FEF2C0 | Code refactoring |
| `documentation` | #0075CA | Documentation updates |
| `security` | #EE0701 | Security-related |
| `performance` | #FFC107 | Performance improvements |
| `edge-case` | #E4E669 | Edge case handling |

---

## 5. DEVELOPMENT GUIDELINES

### Git Workflow

ADWS uses **isolated git worktrees** for each development session:

```bash
# Worktrees are created at:
/opt/adws/projects/TaskFlow-TestBed/trees/<adw_id>/

# Each worktree has its own branch:
adw/<adw_id>
```

### Port Allocation

| Range | Purpose |
|-------|---------|
| 9100-9114 | Backend services |
| 9200-9214 | Frontend services |

### State Management

ADWS maintains state in JSON files:

```
/opt/adws/projects/TaskFlow-TestBed/
├── agents/           # Agent session data
├── specs/            # Generated specifications
└── trees/            # Git worktrees
```

---

## 6. TEST SCENARIOS

### Pre-Defined Test Issues

Reference the full test plan at `/Users/etherealogic/Dev/ADWS-TestBed/ADWS_TEST_PLAN.md`

**Quick Reference - Smoke Tests:**

| ID | Title | Labels |
|----|-------|--------|
| FE-001 | Add dark mode toggle to header | `adws`, `frontend`, `enhancement` |
| BE-001 | Add comments API endpoint | `adws`, `backend`, `enhancement` |
| DO-001 | Generate OpenAPI schema documentation | `adws`, `documentation` |

### Creating a Test Issue

```bash
gh issue create \
  --repo Org-EthereaLogic/TaskFlow-TestBed \
  --title "Add dark mode toggle to header" \
  --body "## Requirements
- Add toggle button to Header component
- Persist preference in localStorage
- Apply 'dark' class to document root
- Use sun/moon icons for visual state

## Acceptance Criteria
- [ ] Toggle switches between light/dark themes
- [ ] Preference persists across page reloads
- [ ] Accessible keyboard navigation" \
  --label "adws,frontend,enhancement"
```

---

## 7. ANTI-SHORTCUT COMPLIANCE

### Mandatory Requirements

All implementations MUST comply with these non-negotiable rules:

1. **Complete Implementation Only**
   - Write EVERY line of code explicitly
   - NO placeholders (`# ... rest of code`, `// TODO`)
   - NO ellipsis (`...`) in code output
   - Every function must have complete, working implementation

2. **No Simulation Mode**
   - All API calls must be REAL (not mocked)
   - NO `asyncio.sleep()` to simulate processing
   - Files must actually persist to disk
   - All operations must execute genuinely

3. **No Test Manipulation**
   - Fix the IMPLEMENTATION, not the test
   - Never weaken assertions
   - Never remove failing tests
   - Never add try/except to suppress failures

### Forbidden Patterns

```python
# FORBIDDEN - Will fail validation
pass                          # Empty stub
raise NotImplementedError     # Unfinished code
return {"mock": True}         # Fake data
asyncio.sleep(N)              # Simulated delay
# TODO: implement later       # Deferred work
# ... rest of code            # Incomplete
```

### Validation Commands

```bash
# Check for forbidden patterns (should return 0 results)
grep -rE "TODO|FIXME|NotImplementedError|^\s+pass\s*$" --include="*.py" .

# Check for simulation patterns (should return 0 results)
grep -rE "asyncio\.sleep|return.*mock|return.*fake" --include="*.py" .
```

---

## 8. EXECUTION CONTEXT

### When You Are Invoked

You (the AI coding agent) are invoked by the ADWS Bridge during one of the SDLC phases. The bridge passes:

- **Project**: `TaskFlow-TestBed`
- **Issue Number**: The GitHub issue being processed
- **ADW ID**: Unique 8-character hex identifier for this workflow
- **Phase**: Current SDLC phase (plan, build, test, review, document, ship)

### Your Working Directory

```
/opt/adws/projects/TaskFlow-TestBed/trees/<adw_id>/
```

This is an isolated git worktree branched from `main`. Your changes are contained here until the `ship` phase merges them.

### Environment Variables Available

```bash
ADWS_PROJECT=TaskFlow-TestBed
ADWS_ISSUE_NUMBER=<issue_number>
ADWS_ADW_ID=<8_char_hex>
ADWS_PHASE=<current_phase>
ADWS_WORKTREE=/opt/adws/projects/TaskFlow-TestBed/trees/<adw_id>
```

---

## 9. PHASE-SPECIFIC GUIDANCE

### Plan Phase

**Objective**: Analyze the issue and create an implementation specification.

**Actions**:
1. Parse issue title and body
2. Identify affected files and components
3. Create detailed implementation steps
4. Estimate complexity and dependencies
5. Output specification to `/specs/<adw_id>.json`

### Build Phase

**Objective**: Implement the solution.

**Actions**:
1. Read specification from plan phase
2. Create/modify necessary files
3. Follow existing code patterns and conventions
4. Ensure all imports are complete
5. No placeholders or TODOs

### Test Phase

**Objective**: Verify the implementation works.

**Actions**:
1. Run existing test suite
2. Add new tests for new functionality
3. Ensure all tests pass
4. Check type hints (mypy)
5. Check linting (ruff for Python, eslint for TypeScript)

### Review Phase

**Objective**: Quality assurance.

**Actions**:
1. Check code style consistency
2. Verify anti-shortcut compliance
3. Review for security issues
4. Validate documentation
5. Generate review report

### Document Phase

**Objective**: Update documentation.

**Actions**:
1. Update README if needed
2. Add inline code comments
3. Update API documentation
4. Document any configuration changes

### Ship Phase

**Objective**: Create and merge PR.

**Actions**:
1. Commit all changes
2. Push branch to origin
3. Create pull request
4. Auto-merge if all checks pass
5. Update issue status

---

## 10. QUICK REFERENCE

### Useful Commands

```bash
# Backend testing
cd backend && uv run pytest -v

# Frontend testing
cd frontend && npm test

# Type checking
cd backend && uv run mypy app/

# Linting
cd backend && uv run ruff check app/
cd frontend && npm run lint

# Start services locally
docker-compose up -d

# View logs
docker-compose logs -f backend
```

### Key Files to Know

| File | Purpose |
|------|---------|
| `backend/app/main.py` | FastAPI app entry point |
| `backend/app/core/config.py` | Environment configuration |
| `backend/app/core/database.py` | Database session management |
| `frontend/src/App.tsx` | React router configuration |
| `frontend/src/utils/api.ts` | Axios API client |
| `docker-compose.yml` | Service orchestration |

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Health check |
| `POST` | `/api/auth/register` | User registration |
| `POST` | `/api/auth/login` | User login (returns JWT) |
| `GET` | `/api/auth/me` | Current user info |
| `GET` | `/api/tasks` | List tasks (paginated) |
| `POST` | `/api/tasks` | Create task |
| `GET` | `/api/tasks/{id}` | Get task by ID |
| `PUT` | `/api/tasks/{id}` | Update task |
| `DELETE` | `/api/tasks/{id}` | Delete task |

---

## 11. CONFIRMATION CHECKLIST

Before completing any phase, confirm:

- [ ] I have written complete code with no placeholders
- [ ] I have not used TODO, FIXME, pass, or NotImplementedError
- [ ] I have not simulated any operations - all code is functional
- [ ] I have not modified any tests to force them to pass
- [ ] The code can run without any modifications
- [ ] All imports are present and valid
- [ ] All error handling is in place

---

## 12. SUPPORT RESOURCES

| Resource | Location |
|----------|----------|
| **Test Plan** | `/Users/etherealogic/Dev/ADWS-TestBed/ADWS_TEST_PLAN.md` |
| **Test Issues** | `/Users/etherealogic/Dev/ADWS-TestBed/TEST_ISSUES.md` |
| **GitHub Repo** | `https://github.com/Org-EthereaLogic/TaskFlow-TestBed` |
| **n8n Dashboard** | `https://n8n.srv1192041.hstgr.cloud` |
| **Bridge API Health** | `http://72.62.129.98:8001/health` |

---

**Document Version**: 1.0.0  
**Last Updated**: 2025-12-25  
**Author**: ADWS System (Claude Opus 4.5)
