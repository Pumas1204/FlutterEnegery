import { __CookiesEnum } from "types/general";

interface AuthResponse {
  status: string;
  message: string;
  tokens: {
    access: string;
    refresh: string;
  };
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  };
}

interface LoginRequest {
  username: string;
  password: string;
}

interface RegisterRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export const authApi = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const result = await response.json();
    if (result.status === "success" && result.tokens?.access) {
      // Set cookie only on the client side
      if (typeof window !== "undefined") {
        document.cookie = `${__CookiesEnum.accessToken}=${result.tokens.access}; path=/; secure=${process.env.NODE_ENV === "production"}; samesite=lax`;
      }
    }
    return result;
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response = await fetch("/api/signup", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    const result = await response.json();
    if (result.status === "success" && result.tokens?.access) {
      // Set cookie only on the client side
      if (typeof window !== "undefined") {
        document.cookie = `${__CookiesEnum.accessToken}=${result.tokens.access}; path=/; secure=${process.env.NODE_ENV === "production"}; samesite=lax`;
      }
    }
    return result;
  },

  async logout(): Promise<void> {
    // Remove cookie only on the client side
    if (typeof window !== "undefined") {
      document.cookie = `${__CookiesEnum.accessToken}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
  },
};
