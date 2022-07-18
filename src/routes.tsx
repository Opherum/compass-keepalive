import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "pages/Login";
import Home from "pages/Home";
import Register from "pages/Register";


function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router;