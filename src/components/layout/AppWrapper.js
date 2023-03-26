import { useLayoutStore } from "@/stores/layout";
import React from "react";

const AppWrapper = ({ children }) => {
  const layoutState = useLayoutStore((state) => state.close);
  return (
    <div className={`vertical  dark ${layoutState && "collapsed"}`}>
      <div className="wrapper">{children}</div>;
    </div>
  );
};

export default AppWrapper;
