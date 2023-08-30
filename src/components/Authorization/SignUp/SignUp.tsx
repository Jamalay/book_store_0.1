import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authSignUp } from "../../../features/applicationSlice";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [login, setLogin] = useState<String>("");
  const [password, setPassword] = useState<String>("");

  const dispath = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispath<any>(authSignUp({ login, password }));
    navigate("/books");
  };

  return (
    <main>
      <form>
        <input placeholder="Login" onChange={(e) => setLogin(e.target.value)} />
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSubmit}>Зарегистрироваться</button>
      </form>
      <div>
        <p>
          Уже есть аккаунт? <Link to="/auth_sign_in">Войти</Link>
        </p>
      </div>
    </main>
  );
};

export { SignUp };
