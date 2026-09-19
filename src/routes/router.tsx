import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./routes";
import App from "../app/app";
import UsersPage from "../pages/users";
import CreateUserPage from "../pages/users/create";
import HomePage from "../pages/home-page/home-page";
import { TodosContent } from "../components/todos/ui/todos-content";
import { CreateTodo } from "../components/todos/ui/create-todo";

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ROUTES.USERS,
        element: <UsersPage />,
      },
      {
        path: ROUTES.CREATE_USER,
        element: <CreateUserPage />,
      },
      {
        path: ROUTES.TODOS,
        element: <TodosContent />
      },
      {
        path: ROUTES.CREATE_TODO,
        element: <CreateTodo />
      }
    ],
  },
]);
