import React, { useState } from "react";
import { useAppSelector } from "store/hooks";

export const useHeader = () => {
  const user = useAppSelector((state) => state.user.user);
  const [activeKey, setActiveKey] = useState("home");

  const handleChangeActiveKey = (key: string) => {
    setActiveKey(key);
  };

  return {
    activeKey,
    user,
    handleChangeActiveKey,
  };
};
