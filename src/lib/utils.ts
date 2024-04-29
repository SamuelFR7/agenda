import { type User } from "@/db/schema"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type ActionResponseType<Output> =
  | {
      success: true
      data: Output
    }
  | {
      success: false
      error: string
    }

export function translateRole(role: User["role"]) {
  switch (role) {
    case "admin":
      return "Administrador"
    case "user":
      return "Usuário"
  }
}
