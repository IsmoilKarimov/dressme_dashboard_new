import React from "react";

import { Outlet } from "react-router-dom";

export default function MarketStore() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <div>
      <Outlet />
    </div>
  );
}
