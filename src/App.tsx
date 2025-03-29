import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
// import Dashboard from "./pages/dashboard";

import Classe from "./pages/classe";
import Home from "./pages/home";
import Reclamation from "./pages/reclamation";
import Note from "./pages/note";
export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/dashboard" element={<Dashboard />}> */}
          <Route path="/home" element={<Home />} />
          <Route path="/classe" element={<Classe />} />
          <Route path="/reclamation" element={<Reclamation />} />
          <Route path="/note" element={<Note />} />
          {/* <Route path="agents" element={<AgentsPage />} />
              <Route path="agents/:id" element={<AgentDetail />} />
              <Route path="reports" element={<ReportsPage />} /> */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}
