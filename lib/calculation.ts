export const getRandomAmount = ({ min, max }: { min: number; max: number }): string => {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export const getRandomDuration = ({ min, max }: { min: number; max: number }): string => {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num.toString();
};
