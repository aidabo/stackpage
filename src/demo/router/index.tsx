import { createBrowserRouter } from "react-router-dom";
import StackPageList from "@/demo/pages/StackPageList"
import StackPageEdit from "@/demo/pages/StackPageEdit"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <StackPageList />,
  },
  {
    path: "/edit/:pageid",
    element: <StackPageEdit mode="edit" />,
  },
]);