const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"
).replace(/\/+$/, "");

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export interface ApiUser {
  id: string;
  name: string;
  email: string;
  profileImage?: string | null;
  bio?: string;
  location?: string;
  preferences?: Record<string, unknown>;
  role?: string;
  isActive?: boolean;
  lastLoginAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthPayload {
  user: ApiUser;
  accessToken: string;
}

export class ApiError extends Error {
  public status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
  token?: string | null
): Promise<ApiResponse<T>> {
  const headers = new Headers(options.headers);

  if (
    options.body &&
    typeof FormData !== "undefined" &&
    !(options.body instanceof FormData) &&
    !headers.has("Content-Type")
  ) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  let response: Response;

  try {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;

    response = await fetch(`${API_URL}${normalizedPath}`, {
      ...options,
      headers,
      cache: "no-store",
    });
  } catch {
    throw new ApiError(
      "Unable to reach LeafLens. Check whether the backend is running.",
      0
    );
  }

  const result: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      typeof result === "object" &&
      result !== null &&
      "message" in result &&
      typeof result.message === "string"
        ? result.message
        : "Something went wrong. Please try again.";

    throw new ApiError(message, response.status);
  }

  if (result === null || typeof result !== "object") {
    throw new ApiError("The server returned an invalid response.", response.status);
  }

  return result as ApiResponse<T>;
}
