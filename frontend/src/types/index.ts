/** Task status enumeration */
export type TaskStatus = "todo" | "in_progress" | "review" | "done";

/** Task priority enumeration */
export type TaskPriority = "low" | "medium" | "high" | "urgent";

/** Task entity */
export interface Task {
  id: number;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  due_date: string | null;
  owner_id: number;
  assignee_id: number | null;
  created_at: string;
  updated_at: string;
}

/** Task creation payload */
export interface TaskCreate {
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  due_date?: string;
  assignee_id?: number;
}

/** Task update payload */
export interface TaskUpdate {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  due_date?: string;
  assignee_id?: number;
}

/** Paginated response wrapper */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  per_page: number;
}

/** User entity */
export interface User {
  id: number;
  email: string;
  username: string;
  full_name: string | null;
  is_active: boolean;
  created_at: string;
}

/** Authentication token response */
export interface TokenResponse {
  access_token: string;
  token_type: string;
}

/** Login credentials */
export interface LoginCredentials {
  username: string;
  password: string;
}

/** API error response */
export interface ApiError {
  detail: string;
}
