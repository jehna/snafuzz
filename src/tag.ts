let currTagged: any[] = [];

const setTagged = (value: any) => {
  currTagged.push(value);
};

export const resetTagged = () => {
  currTagged = [];
};

export const getTagged = () => {
  return currTagged;
};

export const tag = <T extends Function>(fn: T): T => {
  return ((...args: any[]) => {
    setTagged(args);
    return fn(...args);
  }) as any;
};
