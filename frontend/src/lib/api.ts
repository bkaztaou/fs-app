export interface DbHealthResponse {
  status: "healthy" | "unhealthy";
  database: string;
  latency?: string;
  message: string;
  error?: string;
}

export interface GreetResponse {
  status: string;
  message: string;
  project: string;
  stack: {
    frontend: string;
    backend: string;
    runtime: string;
  };
}

/**
 * Lightweight HTTP client for interacting with the Django REST backend.
 * Built directly on native fetch to leverage Next.js caching and avoid external dependencies.
 */
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   * Internal generic request helper handling JSON parsing and HTTP error assertions.
   */
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!res.ok) {
      throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }

    return res.json();
  }

  /**
   * Checks database connectivity and latency from the backend service.
   */
  async checkDb(): Promise<DbHealthResponse> {
    return this.request<DbHealthResponse>("/api/health/db/");
  }

  /**
   * Fetches the initial greeting and stack confirmation payload.
   */
  async getGreet(): Promise<GreetResponse> {
    return this.request<GreetResponse>("/api/greet/");
  }

  // ===========================================================================
  // HOW TO EXTEND THIS CLIENT:
  // Add your domain specific API calls below following these patterns.
  //
  // Example GET request with dynamic parameters:
  //   async getUser(userId: string): Promise<UserResponse> {
  //     return this.request<UserResponse>(`/api/users/${userId}/`);
  //   }
  //
  // Example POST request with a JSON payload:
  //   async createItem(payload: CreateItemInput): Promise<ItemResponse> {
  //     return this.request<ItemResponse>("/api/items/", {
  //       method: "POST",
  //       body: JSON.stringify(payload),
  //     });
  //   }
  //
  // ARCHITECTURE & SCALING TIP:
  // As your application grows beyond 5-10 endpoints, avoid keeping all types
  // and methods inside this single file. Instead:
  // 1. Keep the core ApiClient class here (or move it to `src/lib/api/client.ts`).
  // 2. Separate types into domain driven files (e.g., `types/auth.ts`, `types/users.ts`).
  // 3. Create dedicated service modules (e.g., `services/authService.ts`) that use
  //    the shared `api` instance to perform feature specific requests.
  // ===========================================================================
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/**
 * Singleton API client instance ready for import across the frontend application.
 */
export const api = new ApiClient(API_BASE_URL);