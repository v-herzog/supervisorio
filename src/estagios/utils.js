import { useEffect, useRef } from 'react';

export function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export function random(initial, percentage, repeat = 1) {
    let result = 0;

    for (let i = 0; i < repeat; i++) {
        let max = initial + initial * percentage
        let min = initial - initial * percentage

        result += Math.random() * (max - min) + min;
    }

    return (result / repeat).toFixed(1)
}

export function interpolation(x0, x1, y0, y1, x) {
    let result = y0 + ((y1 - y0) / (x1 - x0)) * (x - x0)

    return result.toFixed(1)
}