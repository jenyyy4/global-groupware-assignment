import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import UsersList from "./UsersList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users-list" element={<UsersList />} />
      </Routes>
    </Router>
  );
}

export default App;