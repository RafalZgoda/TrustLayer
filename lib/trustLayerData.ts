import { TTwitterUser } from "./twitterApi";
import { getRandomAmount, getRandomDuration } from "./calculation";

export const getRank = (_user: string): string => {
  return getRandomAmount({ min: 1, max: 8 });
};

export const getTrustedByTotalValue = (array: TTwitterUser[]): string => {
  return getRandomAmount({ min: array.length * 30000, max: array.length * 60000 });
};

export const getLastAprover = (id: string) => {
  return lastApprover;
};

export const lastApprover = {
  photo: "https://pbs.twimg.com/profile_images/1625144132942561282/iduIzbk__400x400.jpg",
  trustDate: getRandomDuration({ min: 100, max: 400 }),
  name: "Nicoalz",
  twitterName: "0xNicoalz",
  selectable: false,
  amount: getRandomAmount({ min: 10000, max: 40000 }),
};
