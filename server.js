import dotenv from "dotenv"
dotenv.config()

import app from "./app.ts"

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`)
})
