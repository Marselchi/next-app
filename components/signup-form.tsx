"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useSignUp } from "@/hooks/use-sign-up"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"

import { Input } from "@/components/ui/input"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter()

  const signUpMutation = useSignUp()

  async function onSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirm-password") as string
    try {
      await signUpMutation.mutateAsync({
        name,
        email,
        password,
        confirmPassword,
      })
      toast.success("Успешная регистрация")
      router.push("/dashboard")
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Ошибка создания аккаунта"
      )
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
          <h1 className="text-2xl font-bold">Создайте аккаунт</h1>

          <p className="text-sm text-balance text-muted-foreground">
            Заполните все данные ниже для регистрации
          </p>
        </div>

        <Field>
          <FieldLabel htmlFor="name">Имя</FieldLabel>
          <Input
            name="name"
            id="name"
            type="text"
            placeholder="Иван Иванов"
            required
            className="bg-background"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
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
          <FieldLabel htmlFor="password">Пароль</FieldLabel>

          <Input
            name="password"
            id="password"
            type="password"
            required
            className="bg-background"
          />

          <FieldDescription>Как минимум 8 символов.</FieldDescription>
        </Field>

        <Field>
          <FieldLabel htmlFor="confirm-password">Подтвердите пароль</FieldLabel>

          <Input
            name="confirm-password"
            id="confirm-password"
            type="password"
            required
            className="bg-background"
          />

          <FieldDescription>Пожалуйста подтвердите пароль.</FieldDescription>
        </Field>

        <Field>
          <Button type="submit" disabled={signUpMutation.isPending}>
            {signUpMutation.isPending ? "Регистрируем..." : "Создать аккаунт"}
          </Button>
        </Field>

        <FieldSeparator>Or continue with</FieldSeparator>

        <Field>
          <FieldDescription className="px-6 text-center">
            Уже есть аккаунт? <Link href="/login">Войти</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
