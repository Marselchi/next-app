import express from "express"
import cors from "cors"

import { errorHandler } from "@/middleware/error-handler"
import authRoutes from "./server/routes/auth.routes"
import userItemRoutes from "./server/routes/user-item.routes"
import manyEntityRoutes from "./server/routes/many-entity.routes"
import { toNodeHandler } from "better-auth/node"
import { auth } from "./lib/auth"

const app = express()

app.disable("x-powered-by")

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
)

app.all("/api/auth/*splat", toNodeHandler(auth))

app.use(express.json())

app.use("/auth", authRoutes)

app.use("/many-entities", manyEntityRoutes)

app.use("/user-item", userItemRoutes)

app.use(errorHandler)

export default app
