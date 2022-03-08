import { FC } from "react";
import style from "./style.module.css";

export const Input: FC<React.InputHTMLAttributes<HTMLInputElement>> = props => {
  return (
    <input {...props} className={style.Input} />
  )
}
