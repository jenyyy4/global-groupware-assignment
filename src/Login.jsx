import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    
    const response = await fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      localStorage.setItem("token", data.token);
      navigate("/users-list");
    } else {
      setError("Invalid Credentials.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#ffe5ec] p-20">
        <h2 className="text-5xl text-[#ff8fab] font-bold mb-30 text-center">Login</h2>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border border-pink-500 mb-5"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border border-pink-500 mb-5"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-1/2 block mx-auto mt-20 bg-[#ffafcc] hover:bg-[#edafb8] text-white py-4 rounded-4xl"
          >
            Login
          </button>
        </form>
    </div>
  );
};

export default Login;
