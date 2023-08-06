import { isClerkAPIResponseError } from "@clerk/nextjs"
import { clsx, type ClassValue } from "clsx"
import { toast } from "sonner"
import { twMerge } from "tailwind-merge"
import { z } from "zod"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function catchClerkError(err: unknown) {
  const unknownError = "Algo deu errado, por favor tente novamente mais tarde"
  if (isClerkAPIResponseError(err)) {
    toast.error(err.errors[0]?.longMessage ?? unknownError)
  } else {
    toast.error(unknownError)
  }
}

export function catchError(err: unknown) {
  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => {
      return issue.message
    })
    return toast(errors.join("\n"))
  } else if (err instanceof Error) {
    return toast(err.message)
  } else {
    return toast("Something went wrong, please try again later.")
  }
}
