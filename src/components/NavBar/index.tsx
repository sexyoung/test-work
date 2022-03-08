import cx from "classnames";
import { FC } from "react";
import { NavItem } from "./components/NavItem";
import { Link, useLocation } from "react-router-dom";

import style from "./style.module.css";

const TagPath = ['/tags'];
const HomePath = ['/', '/results'];

export const NavBar: FC = () => {
  const { pathname } = useLocation();
  return (
    <div className={cx(style.NavBar, style[pathname])}>
      <div className={style.logoWrapper}>
        <div className={style.logo}>LOGO</div>
        <Link className={style.back} to={"/"}>&lt; Home Page</Link>
      </div>
      <nav className={style.Menu}>
        <ul>
          <li><Link to="/"><NavItem isActived={HomePath.includes(pathname)}>Home</NavItem></Link></li>
          <li><Link to="/tags"><NavItem isActived={TagPath.includes(pathname)}>Tags</NavItem></Link></li>
        </ul>
      </nav>
    </div>
  );
}
