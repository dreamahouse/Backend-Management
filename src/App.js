import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./router";
function App() {
  return (
    <div className="app">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
