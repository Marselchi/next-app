import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

export function useSignIn() {
  return useMutation({
    mutationFn: (body: {
      email: string;
      password: string;
    }) =>
      api.post("/auth/sign-in", body),
  });
}