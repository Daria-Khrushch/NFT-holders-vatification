import { FC, ReactNode } from "react";
import ResetButton from "./ResetButton";

type layoutProps = {
  children: ReactNode,
}

const Layout:FC<layoutProps> = ({ children }) => {
  return (
    <>
      <ResetButton/>
      {children}
    </>
  );
}

export default Layout;