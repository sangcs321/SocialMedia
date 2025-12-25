import React, { useState } from "react";

export const useHeader = () => {
  const [activeKey, setActiveKey] = useState("home");

  const handleChangeActiveKey = (key: string) => {
    setActiveKey(key);
  };

  return {
    activeKey,
    handleChangeActiveKey,
  };
};
