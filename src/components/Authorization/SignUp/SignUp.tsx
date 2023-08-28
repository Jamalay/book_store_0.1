import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authSignUp } from "../../../features/applicationSlice";

const SignUp = () => {
  const [login, setLogin] = useState<String>("");
  const [password, setPassword] = useState<String>("");

  const dispath = useDispatch();

  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispath<any>(authSignUp({ login, password }));
  };

  return (
    <main>
      <form>
        <input placeholder="Login" onChange={(e) => setLogin(e.target.value)} />
        <input
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSubmit}>Зарегистрироваться</button>
      </form>
    </main>
  );
};

export { SignUp };
