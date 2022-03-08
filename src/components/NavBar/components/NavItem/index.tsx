import { FC } from "react";
import cx from "classnames";
import style from "./style.module.css";

interface NavItemProps {
  isActived?: boolean;
}

export const NavItem: FC<NavItemProps> = ({ isActived = false, children }) => {
  return (
    <div className={style.NavItem}>
      <div className={cx(style.box, { [style.actived]: isActived })} />
      <div className={style.text}>{children}</div>
    </div>
  )
}
