const parseNumberFromDots = (value: string | number): number => {
  return Number(value.toString().replace(/\./g, ""));
};

export default parseNumberFromDots;
