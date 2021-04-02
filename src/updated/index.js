import { isDate, isObject, properObject } from '../utils';

const updatedDiff = (lhs, rhs) => {

  if (lhs === rhs) return [];

  if (!isObject(lhs) || !isObject(rhs)) return [lhs,rhs];

  const l = properObject(lhs);
  const r = properObject(rhs);

  if (isDate(l) || isDate(r)) {
    if (l.valueOf() == r.valueOf()) return [];
    return [l,r];
  }
 
  return Object.keys(r).reduce((acc, key) => {
    if (l.hasOwnProperty(key)) {
      const difference = updatedDiff(l[key], r[key]);

      if (difference.length===0) return acc;

      return { ...acc, [key]: difference };
    }

    return acc;
  }, []);
  
};

export default updatedDiff;
