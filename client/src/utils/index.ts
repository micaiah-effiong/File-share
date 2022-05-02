export function debounce(cb: Function, delay: number): Function {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}

export function throttle(cb: Function, delay: number): Function {
  let shouldWait: boolean = false;
  return (...args: any[]) => {
    if (shouldWait) return;

    cb(...args);
    shouldWait = true;

    setTimeout(() => {
      shouldWait = false;
    }, delay);
  };
}
