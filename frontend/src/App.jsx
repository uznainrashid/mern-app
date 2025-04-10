import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { useState } from "react";
import RefreshHandler from "./pages/RefreshHandler";

function App() {
  const [IsAuthenicated, setIsAuthenicated] = useState(false);

  const PrivateRouting = ({ element }) => {
    return IsAuthenicated ? element : <Navigate to="/login" />;
  };
  return (
    <div>
      <RefreshHandler setIsAuthenicated={setIsAuthenicated} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<PrivateRouting element={<Home />} />} />
      </Routes>
    </div>
  );
}

export default App;
