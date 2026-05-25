import type { Request } from "express"

import { auth } from "@/lib/auth"

import { getRequestHeaders } from "@/utils/request-headers"
import { SignUpDto, SignInDto } from "@/types/dto/auth.dto"

export class AuthService {
  static async signUp(dto: SignUpDto, req: Request) {
    await auth.api.signUpEmail({
      body: {
        name: dto.name,
        email: dto.email,
        password: dto.password,
      },

      headers: getRequestHeaders(req),
    })

    return {
      email: dto.email,
    }
  }

  static async signIn(dto: SignInDto, req: Request) {
    await auth.api.signInEmail({
      body: {
        email: dto.email,
        password: dto.password,
      },

      headers: getRequestHeaders(req),
    })

    return {
      email: dto.email,
    }
  }

  static async signOut(req: Request) {
    await auth.api.signOut({
      headers: getRequestHeaders(req),
    })

    return null
  }
}
