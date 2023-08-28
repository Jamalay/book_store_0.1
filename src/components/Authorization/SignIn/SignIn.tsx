import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authSignIn } from "../../../features/applicationSlice";

const SignIn = () => {
  const [login, setLogin] = useState<String>("");
  const [password, setPassword] = useState<String>("");

  const dispath = useDispatch();

  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispath<any>(authSignIn({ login, password }));
  };

  return (
    <main>
      <form>
        <input placeholder="Login" onChange={(e) => setLogin(e.target.value)} />
        <input
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSubmit}>Войти</button>
      </form>
    </main>
  );
};

export { SignIn };
