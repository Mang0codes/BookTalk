import { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        // Login request
        const res = await axios.post("http://localhost:3000/auth/login", {
          email,
          password,
        });

        localStorage.setItem("token", res.data.token);

        navigate("/");
        console.log('Login success:', res.data);
      } else {
        // Signup request
        const res = await axios.post("http://localhost:3000/auth/signup",  { 
          name, 
          email, 
          password 
        });

        localStorage.setItem("token", res.data.token);
        
        navigate("/");
        console.log('Login success:', res.data);
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };


  return (
    <div>
      <Header />
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center">
      <div className="backdrop-blur-xl bg-white/10 p-8 rounded-xl shadow-md w-full max-w-md text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <form className="space-y-4"
        onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label className="block mb-1">Name</label>
              <input
                name="name"
                type="text"
                value={name}
                 onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent border border-white/30 rounded-lg px-4 py-2 focus:outline-none focus:ring-0"
                placeholder="Enter your name"
                required
              />
            </div>
          )}
          <div>
            <label className="block mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={email}
               onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border border-white/30 rounded-lg px-4 py-2 focus:outline-none focus:ring-0"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <input
              name="password"
              type="password"
              value={password}
               onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border border-white/30 rounded-lg px-4 py-2 focus:outline-none focus:ring-0"
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-white/20 hover:bg-white/30 transition rounded-lg py-2 font-semibold"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            className="underline text-white/80 hover:text-white"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>
      </div>
    </div>
    </div>
  );
}
