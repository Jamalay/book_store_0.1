import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { User, getUser } from "../../features/usersSlice";
import { useEffect } from "react";
import { LogOut } from "../../features/applicationSlice";
import { useNavigate } from "react-router-dom";
import { log } from "console";

const Profile = (): JSX.Element => {
  const user = useSelector((state: RootState) => state.usersSlice.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const logOut = (e: React.MouseEvent<HTMLElement>) => {
    localStorage.removeItem("token");
    dispatch(LogOut());

    navigate("/auth_sign_in");
    window.location.reload();
    e.preventDefault();
  };

  useEffect(() => {
    dispatch<any>(getUser());
  }, []);

  return (
    <main>
      <div>
        <div>{user?.login}</div>
        <div>{user?.role}</div>
      </div>
      <div>
        <div>
          <button>Редактировать</button>
          <button onClick={logOut}>Выйти</button>
        </div>
      </div>
    </main>
  );
};

export { Profile };
