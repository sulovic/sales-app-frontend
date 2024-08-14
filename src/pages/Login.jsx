import React, { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, authUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      navigate("/SalesAppAdmin/dashboard");
    }
  }, [authUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({ type: "password", email, password });
  };

  const handleGoogleLoginSuccess = async (res) => {
    handleLogin({ type: "google", credential: res?.credential });
  };

  return !authUser && (
    <div className="w-full h-dvh flex justify-center items-center bg-gray-200 dark:bg-gray-900">
      <div className="flex flex-col gap-4 min-w-96 justify-center items-center bg-white dark:bg-gray-600 text-center shadow-2xl p-8 rounded-xl">
        <h3>Sales App Admin</h3>

        <div className="my-2 w-full h-0.5 bg-zinc-400"></div>

        <h5>Prijavite se pomoću Google naloga</h5>
        <div className="w-full flex justify-center">
          <GoogleLogin
            onSuccess={(res) => {
              handleGoogleLoginSuccess(res);
            }}
            onError={(err) => {
              toast.warning(`Ups! Došlo je do greške pri prijavljivanju: ${err}`, {
                position: "top-center",
              });
            }}
            shape={"square"}
          />
        </div>
        <div className="my-2 w-full h-0.5 bg-zinc-400"></div>

        <h5>Ili se prijavite pomoću lozinke</h5>
        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
          <input type="email" required className="w-full p-2" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
          <input type="password" required className="w-full p-2" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
          <button className="button button-sky">Prijavi se</button>
        </form>
        <a className="hover:text-gray-600 dark:hover:text-gray-400 cursor-pointer" onClick={() => console.log("Reset lozinke", email)}>
          <h6>Zaboravili ste lozinku?</h6>
        </a>
      </div>
    </div>
  );
};

export default Login;
