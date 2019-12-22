// 移除对象中的空值
export function removeEmpty(params: Object) {
  const result = {};
  Object.keys(params).forEach(key => {
    if (params[key]) {
      result[key] = params[key];
    }
  });
  return result;
}

export function isNumber(value: number| string) {
  return !isNaN(+value);
}