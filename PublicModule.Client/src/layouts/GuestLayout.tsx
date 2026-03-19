import { useEffect } from "react";
import { Header } from "components";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "store/hooks";
import { userAcions } from "store/userStore";

export const GuestLayout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userAcions.fetchMe());
  }, []);

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};
