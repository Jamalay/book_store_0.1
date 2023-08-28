import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useEffect } from "react";
import { getUser } from "../../features/usersSlice";

const Cart = (): JSX.Element => {
  const user = useSelector((state: RootState) => state.usersSlice.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(getUser());
  }, [dispatch]);

  console.log(user);

  return (
    // <main>
    //   <h1>Корзина</h1>
    //   <h2>Эта страница находится в разработке</h2>
    // </main>
    <main>
      {user?.cart?.map((elem) => {
        return <p>{elem}</p>;
      })}
      ...
    </main>
  );
};

export { Cart };
