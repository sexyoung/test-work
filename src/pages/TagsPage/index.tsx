import { FC, useEffect, useState, useCallback } from "react";
import style from "./style.module.css";

const { REACT_APP_API: API } = process.env;

export const TagsPage:FC = () => {
  const [data, setData] = useState<{
    id: string;
    name: string;
    count: number;
  }[]>();

  const fetchResult = useCallback(async () => {
    const promise = await fetch(`${API}/tags`);
    const result = await promise.json();
    setData(result);
  }, []);

  useEffect(() => {
    fetchResult();
  }, [fetchResult]);

  return (
    <main className={style.TagsPage}>
      <div className={style.wrapper}>
        <h3 className={style.title}>Tags</h3>
        <div className={style.tagsList}>
          {!data && <div className="loading">loading</div>}
          {data && data.map(item =>
            <div className={style.tagItem} key={item.id}>
              <div className={style.box}>
                <div className={style.name}>{item.name}</div>
              </div>
              <div className={style.name}>{item.name}</div>
              <div className={style.count}>{item.count} Questions</div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
