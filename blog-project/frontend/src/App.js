import "./App.css";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import MyBlogs from "./pages/MyBlogs";
import CreateBlog from "./pages/CreateBlog";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>This is the homepage</h1>}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/homepage" element={<Homepage />}></Route>
        <Route path="/myblogs" element={<MyBlogs />}></Route>
        <Route path="/createblog" element={<CreateBlog />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
