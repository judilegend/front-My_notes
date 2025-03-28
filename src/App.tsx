import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { TicketProvider } from "./contexts/TicketContext";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
// import Dashboard from "./pages/dashboard";
import Home from "./pages/home";
export default function App() {
  return (
    <Router>
      <AuthProvider>
        <TicketProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* <Route path="/dashboard" element={<Dashboard />}> */}
            <Route path="/home" element={<Home />}>
              {/* <Route path="agents" element={<AgentsPage />} />
              <Route path="agents/:id" element={<AgentDetail />} />
              <Route path="reports" element={<ReportsPage />} /> */}
            </Route>
          </Routes>
        </TicketProvider>
      </AuthProvider>
    </Router>
  );
}
