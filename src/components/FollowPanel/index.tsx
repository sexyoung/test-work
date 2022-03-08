import cx from 'classnames';
import { FC, useEffect, useState, useCallback, useRef } from "react";
import { Follower } from "type";
import * as Comp from "components";
import style from "./style.module.css";
import { isScrolledIntoView } from 'utils';

const { REACT_APP_API: API } = process.env;

let page = 0;
let isEnd = false;
let isLoading = false;

const followerPath = `${API}/users/all`;
const followingPath = `${API}/users/friends`;

export const FollowPanel: FC = () => {
  const ListDOM = useRef<HTMLUListElement>(null);
  const [data, setData] = useState<Follower[]>();
  const [showFollowing, setShowFollowing] = useState<boolean>(false);
  const fetchResult = useCallback(async () => {
    if(isLoading) return;
    isLoading = true;
    page += 1;
    const API_URL = showFollowing ? followingPath : followerPath;
    const promise = await fetch(`${API_URL}?page=${page}&pageSize=10`);
    const result = await promise.json();
    isLoading = false;
    if(!result.data.length) {
      isEnd = true;
      ListDOM.current?.removeEventListener('scroll', handleScroll);
    }
    setData(data => [ ...(data || []), ...result.data]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showFollowing]);

  const handleChange = (value: boolean) => {
    page = 0;
    isEnd = false;
    isLoading = false;
    setData([]);
    setShowFollowing(value);
  }

  const handleScroll: EventListener = useCallback(() => {
    if(!document.getElementById('followerLoading')) return;
    if(isScrolledIntoView(document.getElementById('followerLoading')!, ListDOM.current!.clientHeight + 40)) {
      fetchResult();
    }
  }, [fetchResult]);

  useEffect(() => {
    fetchResult();
    ListDOM.current!.addEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => ListDOM.current?.removeEventListener('scroll', handleScroll)
  }, [fetchResult, handleScroll]);

  return (
    <div className={style.FollowPanel}>
      <ul className={style.tabs}>
        <li className={cx({[style.active]: !showFollowing})} onClick={handleChange.bind(null, false)}>Follower</li>
        <li className={cx({[style.active]: showFollowing})} onClick={handleChange.bind(null, true)}>Following</li>
      </ul>
      <ul className={style.friendList} ref={ListDOM}>
        {data && data.map(item =>
          <li key={item.id}>
            <div className={style.profile}><img src={item.avater} alt={item.name} /></div>
            <div className={style.name}>1{item.name}</div>
            <div className={style.button}>
              {item.isFollowing ?
                <Comp.Button theme={'Outlined'}>Follow</Comp.Button>:
                <Comp.Button theme={'Contained'}>Following</Comp.Button>
              }
            </div>
          </li>
        )}
        {!isEnd && <li><Comp.Loading id="followerLoading" /></li>}
      </ul>
    </div>
  )
}
