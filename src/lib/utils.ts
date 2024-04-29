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
