export const throttle = (func: Function, delay: number) => {
  let lastTime: number;
  let timerId: NodeJS.Timeout | null;

  const clearTimer = (cb?: Function) => {
    return setTimeout(() => {
      cb && cb();
      lastTime = 0;
      timerId && clearTimeout(timerId);
    }, delay);
  }

  return (...args: any[]) => {
    if(!lastTime) {
      func(...args);
      lastTime = +Date.now();
      return timerId = clearTimer();
    }
    timerId && clearTimeout(timerId);
    timerId = clearTimer(func.bind(null, ...args));;
  }
}

export const isScrolledIntoView = (el: HTMLElement, parentHeight: number) => {
  const {
    top,
    bottom,
  } = el.getBoundingClientRect();
  const elemTop = top;
  const elemBottom = bottom;
  console.clear();
  console.log(`elemTop`, elemTop);
  console.log(`elemBottom`, elemBottom);
  console.log(`parentHeight`, parentHeight);
  
  const isVisible = (elemTop >= 0) && (elemBottom <= parentHeight);
  return isVisible;
}
