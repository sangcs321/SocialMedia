import React, { useEffect, useState } from "react";
import { Header } from "components";
import { Outlet } from "react-router-dom";
import { UserApiService } from "api";

export const GuestLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = async () => {
    try {
      const usersRes = await UserApiService.getUsers();
      if (usersRes.success) {
        setUsers(usersRes.value);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};
