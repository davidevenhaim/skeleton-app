export type UserRole = "admin" | "editor" | "viewer";

export type User = {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
  role?: UserRole;
};

export type AuthToken = string;
