export const validateObjectKeys = (
  obj: { [key: string]: any },
  requiredKeys: string[]
): boolean => {
  return requiredKeys.every((key) => Object.keys(obj).includes(key));
};
