import _ from "lodash";
import { getRandomAmount, getRandomDuration } from "./calculation";
export interface TTwitterUser {
  photo: string;
  trustDate: string;
  name: string;
  twitterName: string;
  selectable: boolean;
  amount: string;
  holding: string;
  proximity: string;
}

export const twitterUsers = [
  {
    photo: "https://pbs.twimg.com/profile_images/1625144132942561282/iduIzbk__400x400.jpg",
    trustDate: "1",
    name: "Nicoalz",
    twitterName: "0xNicoalz",
    selectable: false,
    amount: getRandomAmount({ min: 10000, max: 40000 }),
    holding: "PSG Fan Token",
    proximity: "N+1",
  },
  {
    photo: "https://pbs.twimg.com/profile_images/1085757468158742528/0jwhEGnX_400x400.jpg",
    trustDate: getRandomDuration({ min: 100, max: 400 }),
    name: "Kartik Talwar",
    selectable: true,
    amount: getRandomAmount({ min: 10000, max: 40000 }),
    twitterName: "TheRealKartik",
    holding: "ApeCoin",
    proximity: "N+1",
  },
  {
    photo: "https://pbs.twimg.com/profile_images/1730696978906972161/J2zHNQRm_400x400.jpg",
    trustDate: getRandomDuration({ min: 100, max: 400 }),
    name: "Stani",
    twitterName: "StaniKulechov",
    selectable: true,
    amount: getRandomAmount({ min: 10000, max: 40000 }),
    holding: "PSG Fan Token",
    proximity: "N+1",
  },
  {
    photo: "https://pbs.twimg.com/profile_images/1484336102693490689/bmhym86N_400x400.jpg",
    trustDate: getRandomDuration({ min: 100, max: 400 }),
    name: "Austin Griffith",
    twitterName: "austingriffith",
    selectable: true,
    amount: getRandomAmount({ min: 10000, max: 40000 }),
    holding: "PSG Fan Token",
    proximity: "N+1",
  },
  {
    photo: "https://pbs.twimg.com/profile_images/632301429424816128/OwT0LdXU_400x400.jpg",
    trustDate: getRandomDuration({ min: 100, max: 400 }),
    name: "Justin Drake",
    twitterName: "drakefjustin",
    selectable: true,
    amount: getRandomAmount({ min: 10000, max: 40000 }),
    holding: "ApeCoin",
    proximity: "N+1",
  },
  {
    photo: "https://pbs.twimg.com/profile_images/1085263128521293827/yA7Jc_5u_400x400.jpg",
    trustDate: getRandomDuration({ min: 100, max: 400 }),
    name: "Tomasz Stanczak",
    twitterName: "tkstanczak",
    selectable: true,
    amount: getRandomAmount({ min: 10000, max: 40000 }),
    holding: "ApeCoin",
    proximity: "N+2",
  },
  {
    photo: "https://pbs.twimg.com/profile_images/1634913914696736769/u2GDuAyH_400x400.jpg",
    trustDate: getRandomDuration({ min: 100, max: 400 }),
    name: "Makoto Inoue",
    twitterName: "makoto_inoue",
    selectable: true,
    amount: getRandomAmount({ min: 10000, max: 40000 }),
    holding: "ApeCoin",
    proximity: "N+2",
  },
  {
    photo: "https://pbs.twimg.com/profile_images/1634964585621880833/_lp8Pjr__400x400.jpg",
    trustDate: getRandomDuration({ min: 100, max: 400 }),
    name: "Lukas Schor",
    twitterName: "SchorLukas",
    selectable: true,
    amount: getRandomAmount({ min: 10000, max: 40000 }),
    holding: "PSG Fan Token",
    proximity: "N+2",
  },
  {
    photo: "https://pbs.twimg.com/profile_images/1514738672603734016/k4xQ0nt1_400x400.jpg",
    trustDate: getRandomDuration({ min: 100, max: 400 }),
    name: "Carl Fluke",
    twitterName: "CarlFluke",
    selectable: true,
    amount: getRandomAmount({ min: 10000, max: 40000 }),
    holding: "Vitality Fan Token",
    proximity: "N+2",
  },
  {
    photo: "https://pbs.twimg.com/profile_images/1430872843747840002/qxMzDq-G_400x400.jpg",
    trustDate: getRandomDuration({ min: 100, max: 400 }),
    name: "James Scicluna",
    twitterName: "jamesxik",
    selectable: true,
    amount: getRandomAmount({ min: 10000, max: 40000 }),
    holding: "Vitality Fan Token",
    proximity: "N+3",
  },
  {
    photo: "https://pbs.twimg.com/profile_images/1756803608228577280/lN7SliX3_400x400.jpg",
    trustDate: getRandomDuration({ min: 100, max: 400 }),
    name: "Ian Dilick",
    twitterName: "0xPenryn",
    selectable: true,
    amount: getRandomAmount({ min: 10000, max: 40000 }),
    holding: "Vitality Fan Token",
    proximity: "N+3",
  },
];

export const getTrustPeople = (id: string): { trustedBy: TTwitterUser[]; trustingPeople: TTwitterUser[] } => {
  const userSelectable = twitterUsers.filter((user) => user.selectable);
  const useswWithoutMe = userSelectable.filter((user) => user.twitterName.toLowerCase() !== id.toLowerCase());
  const shuflled = _.shuffle(useswWithoutMe);
  const random = Math.floor(Math.random() * (7 - 3 + 1)) + 3;
  const sliced = shuflled.slice(0, random);
  const orderedByAmount = _.orderBy(sliced, ["amount"], ["desc"]);
  const trustedOrder = orderedByAmount;
  const kartik = twitterUsers.find((user) => user.twitterName.toLowerCase() === "TheRealKartik".toLowerCase());
  if (kartik && id === "true") {
    trustedOrder.push(kartik);
  }
  const trustedBy = trustedOrder.slice(0, random);
  const trustingPeople = orderedByAmount.slice(random - 2, random + 2);
  return { trustedBy, trustingPeople };
};

export const getRecommandPeople = (id: string): TTwitterUser[] => {
  const userSelectable = twitterUsers.filter((user) => user.selectable);
  const useswWithoutMe = userSelectable.filter((user) => user.twitterName.toLowerCase() !== id.toLowerCase());
  const random = Math.floor(Math.random() * (7 - 3 + 1)) + 3;
  const shuflled = _.shuffle(useswWithoutMe);
  const sliced = shuflled.slice(0, random);
  const kartik = twitterUsers.find((user) => user.twitterName.toLowerCase() === "TheRealKartik".toLowerCase());
  if (kartik && id === "true") {
    sliced.push(kartik);
  }
  const orderedByAmount = _.orderBy(sliced, ["amount"], ["desc"]);
  return orderedByAmount;
};
