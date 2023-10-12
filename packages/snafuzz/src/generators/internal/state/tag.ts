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

export const tag = <T>(value: T): T => {
  setTagged(value);
  return value;
};
