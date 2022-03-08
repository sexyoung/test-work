import { FC, useState } from "react";
import * as Comp from "components";

import style from "./style.module.css";

export const HomePage: FC = () => {
  const [pageSize, setPageSize] = useState(3);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const input = form.querySelector("input") as HTMLInputElement;
    const value = formData.get('keyword')!;
    const pageSize = formData.get('pageSize')!;
    input.value = "";
    if (value) {
      const url = `/results?keyword=${value}&pageSize=${pageSize}`;
      window.location.href = url;
    }
  };
  return (
    <main className={style.HomePage}>
      <div className={style.wrapper}>
        <form className={style.form} onSubmit={handleSubmit}>
          <h3 className={style.title}>Search</h3>
          <Comp.Input style={{width: `100%`}} name="keyword" required placeholder="Keyword" />
          <hr />
          <div className={style.hint}># of Result Per Page</div>
          <span className={style.pageSize}>{pageSize}</span>results
          <Comp.Slider range={[3, 6,9,12,15,50]} width={`100%`} onChange={setPageSize} />
          <hr />
          <Comp.Button>SEARCH</Comp.Button>
        </form>
        <Comp.FollowPanel />
      </div>
    </main>
  )
}

/**
  <div><Comp.Button /></div>
  <div><Comp.Button theme={'Outlined'}>Outlined</Comp.Button></div>
  <div><Comp.Button theme={'Contained'}>Contained</Comp.Button></div>
  <div><Comp.Input defaultValue={'abc'} placeholder="Keyword" /></div>
  <div><Comp.Slider range={[3, 6,9,12,15,50]} onChange={x => console.log(x)} /></div>
 */
