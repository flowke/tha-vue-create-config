
let typeRegExp = new RegExp('\\[object\\s(\\w+)\\]', 'i');

function getType(val) {
  let str = Object.prototype.toString.call(val);
  return str.replace(typeRegExp, '$1').toLowerCase();
}

// debounce with interval
// and execute after interval at last time call
export function debounceExec(interval, cb) {

  let timer = null;

  return (...rest) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb(...rest);
    }, interval);
  }
}

// debounce with interval
// return value immediately and will cache value during interval
// cb accept : 
  //  fresh: boolean , should return fresh value 
export function debounceCache(interval, cb) {

  let cacheVal = undefined;

  let timerRunning = false;

  return (fresh, ...rest) => {

    if (fresh) timerRunning = false;

    if (!timerRunning) {
      timerRunning = true;
      setTimeout(() => {
        timerRunning = false;
      }, interval);

      cacheVal = cb(...rest);
      return cacheVal;
    } else {
      return cacheVal
    }

  }
}

// value: value you test
// type: string, boolean, null .....
//   incoming types would like some of it valid, it valid.
export function isType(val, ...tps){
  tps = tps.reduce(function (acc, val) {
    return acc.concat(val)
  }, []);

  return tps.some(function (tp) {
    return getType(val) === tp.toLowerCase();
  }) 
}


export function execOnce(fn) {

  let isExecd = false;

  return function (...rest) {
    if (!isExecd) {
      isExecd = true

      fn(...rest)
    }
  }
}

// resolve object's values, keys
export function toArr(obj){
  let val = {
    keys: [],
    values: [],
    raw: obj
  }
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const elt = obj[key];
      val.keys.push(key);
      val.values.push(elt);
    }
  }
  return val;
}

export {
  getType
}