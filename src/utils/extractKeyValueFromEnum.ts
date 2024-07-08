export const extractKeyValueFromEnum = (paramEnum: any) =>
  Object.keys(paramEnum).map((objKey) => ({
    key: objKey,
    value: paramEnum[objKey],
  }));
