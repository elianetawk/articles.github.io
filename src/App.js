import { Route, Routes } from "react-router-dom";
import LogIn from "./pages/LogIn";
import Dashboard from "./pages/Dashboard";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <Routes>
      <Route path="*" element={<LogIn />} />
      <Route path="logIn" element={<LogIn />} />
      <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
