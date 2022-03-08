import { useSearchParams } from "react-router-dom";
import { FC, useEffect, useState, useCallback } from "react";

import { Follower } from "type";
import * as Comp from "components";
import style from "./style.module.css";
import { isScrolledIntoView } from "utils";

const { REACT_APP_API: API } = process.env;

let page = 0;
let isEnd = false;
let isLoading = false;

export const ResultsPage: FC = () => {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState<Follower[]>();
  const keyword = searchParams.get('keyword') as string;
  const pageSize = searchParams.get('pageSize') as string;

  const fetchResult = useCallback(async (keyword: string, pageSize: string) => {
    if(isLoading) return;
    isLoading = true;
    page += 1;
    const promise = await fetch(`${API}/users/all?page=${page}&pageSize=${pageSize}&keyword=${keyword}`);
    const result = await promise.json();
    isLoading = false;
    if(!result.data.length) {
      isEnd = true;
      window.removeEventListener('scroll', handleScroll);
    }
    setData(data => [ ...(data || []), ...result.data]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll: EventListener = useCallback(() => {
    if(isScrolledIntoView(document.getElementById('loading')!, window.innerHeight)) {
        fetchResult(keyword, pageSize);
    }
  }, [keyword, pageSize, fetchResult]);

  useEffect(() => {
    fetchResult(keyword, pageSize);
    window.addEventListener('scroll', handleScroll);
    return () => {
      isEnd = false;
      window.removeEventListener('scroll', handleScroll);
    }
  }, [keyword, pageSize, fetchResult, handleScroll]);
  
  return (
    <main className={style.ResultsPage}>
      <div className={style.wrapper}>
        <div className={style.page}>
          <h3 className={style.title}>Results</h3>
          <div className={style.resultList}>
            {data && data.map(item =>
              <div key={item.id} className={style.item}>
                <img src={item.avater} alt={item.name} />
                <div className={style.name}>{item.name}</div>
                <div className={style.username}>by {item.username}</div>
              </div>
            )}
            {!isEnd && <Comp.Loading id="loading" />}
          </div>
        </div>
        <Comp.FollowPanel />
      </div>
    </main>
  )
}
