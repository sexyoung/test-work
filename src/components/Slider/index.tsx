import cx from "classnames";
import { FC, useState, useRef, useEffect, useCallback } from "react";
import style from "./style.module.css";

interface ISlider {
  range: any[];
  width?: number | string;
  defaultValue?: number;
  onChange?: Function;
}

let isDrop = false;
let isRelease = false;

const findCloseIndex = (ul: HTMLUListElement, pageX: number) => {
  let minDistance = 9999;
  let closestIndex = -1;
  ul.childNodes.forEach((li, index) => {
    const distance = Math.abs((li as HTMLLIElement).getBoundingClientRect().x - pageX + 6);
    if(distance < minDistance) {
      closestIndex = index;
      minDistance = distance;
    }
  });
  return closestIndex;
}

export const Slider: FC<ISlider> = ({ width = 300, range, onChange }) => {
  const ulDOM = useRef<HTMLUListElement>(null);
  const trackDOM = useRef<HTMLDivElement>(null);
  const sliderDOM = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState('');
  const [left, setLeft] = useState(0);
  const [barWidth, setBarWidth] = useState(0);
  const [sliderIndex, setSliderIndex] = useState(0);

  const handleDragStart = () => {
    isDrop = true;
  }

  const handleDragDrop: EventListener = useCallback((event) => {
    if(!isDrop) return;

    const { x: sliderX } = sliderDOM.current!.getBoundingClientRect();
    const { width: trackWidth } = trackDOM.current!.getBoundingClientRect();
    let pageX = -1;
    if(event instanceof TouchEvent) {
      pageX = event.touches[0].pageX;
    } else if(event instanceof MouseEvent) {
      pageX = event.pageX;
    }
    
    const closestIndex = findCloseIndex(ulDOM.current!, pageX);
    setSliderIndex(closestIndex);

    let updateLeft = (
      pageX - sliderX - 4 < 0 ? 0:
      pageX - sliderX - 4 > trackWidth ?
      trackWidth: pageX - sliderX - 4
    );
    setLeft(updateLeft);
    setBarWidth(updateLeft + 4)
  }, []);

  const handleMouseUp = useCallback(() => {
    const { x: trackX } = trackDOM.current!.getBoundingClientRect();
    const liDOM = (ulDOM.current!.childNodes[sliderIndex] as HTMLLIElement).getBoundingClientRect();
    const left = liDOM.x + liDOM.width / 2 - trackX;

    isRelease = true;
    setTimeout(() => isRelease = false, 200);
    setLeft(left);
    isDrop = false;
    setBarWidth(!sliderIndex ? 0: left + 4);
    setValue(range[sliderIndex]);
    onChange && onChange(range[sliderIndex]);
  }, [range, sliderIndex, onChange]);

  useEffect(() => {
    document.body.addEventListener('mousemove', handleDragDrop);
    document.body.addEventListener('touchmove', handleDragDrop);
    document.body.addEventListener('mouseup', handleMouseUp);
    document.body.addEventListener('touchend', handleMouseUp);
    return () => {
      document.body.removeEventListener('mousemove', handleDragDrop);
      document.body.removeEventListener('touchmove', handleDragDrop);
      document.body.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('touchend', handleMouseUp);
    }
  }, [handleMouseUp, handleDragDrop]);

  return (
    <div ref={sliderDOM} style={{ width }} className={style.Slider}>
      <input type="text" value={value} name="pageSize" readOnly />
      <div className={style.track} ref={trackDOM}>
        <div className={cx(style.bar, {
          [style.release]: isRelease
        })} style={{ width: barWidth}} />
        <div className={cx(style.thumb, {
          [style.release]: isRelease
        })}
          style={{ left }}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        />
      </div>
      <ul ref={ulDOM}>
        {range.map((item, index) =>
          <li key={index} className={sliderIndex === index ? style.active: ''}>{item}</li>
        )}
      </ul>
    </div>
  )
}
