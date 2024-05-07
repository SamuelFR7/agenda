import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Role } from "./db/schema"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function combineHeaders(
  ...headers: Array<ResponseInit["headers"] | null | undefined>
) {
  const combined = new Headers()
  for (const header of headers) {
    if (!header) continue
    for (const [key, value] of new Headers(header).entries()) {
      combined.append(key, value)
    }
  }
  return combined
}

export function combineResponseInits(
  ...responseInits: Array<ResponseInit | null | undefined>
) {
  let combined: ResponseInit = {}
  for (const responseInit of responseInits) {
    combined = {
      ...responseInit,
      headers: combineHeaders(combined.headers, responseInit?.headers),
    }
  }
  return combined
}

export function translateRole(role: Role) {
  switch (role) {
    case "admin":
      return "Administrador"
    case "user":
      return "Usuário"
  }
}
