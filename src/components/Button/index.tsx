import cx from "classnames";
import { FC } from "react";
import style from "./style.module.css";

interface IButton {
  children?: string;
  theme?: 'Outlined' | 'Contained' | ''
}

export const Button: FC<React.ButtonHTMLAttributes<HTMLButtonElement> & IButton> = ({ children = "BUTTON", theme = '', ...props }) => {
  return (
    <button className={cx(style.Button, style[theme])} {...props}>{children}</button>
  )
}
