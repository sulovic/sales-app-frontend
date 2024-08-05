import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../Context/AuthContext";
import { toast } from "react-toastify";


const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {authUser, handleLogin} = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin({ type: "password", email, password })
    }

    const handleGoogleLoginSuccess = async (res) => {
        handleLogin({ type: "google", credential: res?.credential });
    };

  return (
    <div className="w-full h-dvh flex justify-center items-center dark:bg-gray-900">
      <div className="flex flex-col gap-8 min-w-96 justify-center items-center text-center shadow-2xl p-8 rounded-xl">
        <h3>Sales App Admin</h3>
        <h3>{authUser? authUser.firstName : "Nema"}</h3>

        <div className="my-2 w-full h-0.5 bg-zinc-400"></div>

        <h5>Prijavite se pomoću Google</h5>
        <div className="w-full">
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
          <input type="text" className="w-full p-2" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
          <input type="password" className="w-full p-2" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password}/>
          <button className="button button-sky">Prijavi se</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
