import { FC } from "react";
import style from "./style.module.css";

export const Loading: FC<{id: string}> = (props) => {
  return (
    <div {...props} className={style.loading} />
  )
}
