import { createHashRouter, RouterProvider } from "react-router"
import Register from "./Pages/Register"
import Dashboard from "./Pages/Dashboard"
import Verify from "./Pages/Verify"
import ProtectedRoute from "./components/ProtectedRoute"
import { Toaster } from "react-hot-toast"

function App() {

  // Define the main routes of the application
  const router = createHashRouter([
    {
      path: "/register",
      element: <ProtectedRoute redirectIfAuth>
        <Register />
      </ProtectedRoute>
    },
    {
      path: "/",
      element: <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    },
    {
      path: "/verify/:id",
      element: <Verify />

    }
  ])

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  )
}

export default App
