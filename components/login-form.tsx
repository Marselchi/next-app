"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useSignIn } from "@/hooks/use-sign-in"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

import { Input } from "@/components/ui/input"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter()
  const signInMutation = useSignIn()
  async function onSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    try {
      await signInMutation.mutateAsync({
        email,
        password,
      })

      toast.success("Вход успешен")

      router.push("/dashboard")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Ошибка входа")
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Войдите в ваш аккаунт</h1>

          <p className="text-sm text-balance text-muted-foreground">
            Введите вашу почту ниже чтобы войти в аккаунт
          </p>
        </div>

        <Field>
          <FieldLabel htmlFor="email">Почта</FieldLabel>
          <Input
            name="email"
            id="email"
            type="email"
            placeholder="email@example.com"
            required
            className="bg-background"
          />
        </Field>

        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Пароль</FieldLabel>
          </div>
          <Input
            name="password"
            id="password"
            type="password"
            required
            className="bg-background"
          />
        </Field>
        <Field>
          <Button type="submit" disabled={signInMutation.isPending}>
            {signInMutation.isPending ? "Вход..." : "Войти"}
          </Button>
        </Field>
        <Field>
          <FieldDescription className="text-center">
            У вас нет аккаунта?
            <Link href="/signup" className="underline underline-offset-4">
              Регистрация
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
