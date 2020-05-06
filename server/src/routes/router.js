import auth from "./authRoutes"
import user from "./userRoutes"

const router = (app) => {
  // Authentication routes 
  app.use("/api/v1", auth)
  // User information routes
  app.use("/api/v1", user)
}

export default router