// src/hooks/use-sign-up.ts

import { useMutation } from "@tanstack/react-query"

import { api } from "@/lib/api-client"

export function useSignUp() {
  return useMutation({
    mutationFn: (body: {
      name: string
      email: string
      password: string
      confirmPassword: string
    }) => api.post("/auth/sign-up", body),
  })
}
