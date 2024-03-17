export interface TTwitterUser {
  photo: string;
  trustDate: string;
  name: string;
  twitterName: string;
  selectable: boolean;
  amount: string;
}

export const getRandomAmount = ({ min, max }: { min: number; max: number }): string => {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export const getRandomDuration = ({ min, max }: { min: number; max: number }): string => {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num.toString();
};

export const getRank = (_user: string): string => {
  return getRandomAmount({ min: 1, max: 8 });
};

export const getTrustedByTotalValue = (array: TTwitterUser[]): string => {
  return getRandomAmount({ min: array.length * 30000, max: array.length * 60000 });
};

export const twitterUsers = [
  {
    photo: "https://pbs.twimg.com/profile_images/1085757468158742528/0jwhEGnX_400x400.jpg",
    trustDate: getRandomDuration({ min: 100, max: 400 }),
    name: "Kartik Talwar",
    twitterName: "TheRealKartik",
    selectable: true,
    amount: getRandomAmount({ min: 10000, max: 40000 }),
  },
  {
    photo: "https://pbs.twimg.com/profile_images/1730696978906972161/J2zHNQRm_400x400.jpg",
    trustDate: getRandomDuration({ min: 100, max: 400 }),
    name: "Stani",
    twitterName: "StaniKulechov",
    selectable: true,
    amount: getRandomAmount({ min: 10000, max: 40000 }),
  },
  {
    photo: "https://pbs.twimg.com/profile_images/1484336102693490689/bmhym86N_400x400.jpg",
    trustDate: getRandomDuration({ min: 100, max: 400 }),
    name: "Austin Griffith",
    twitterName: "austingriffith",
    selectable: true,
    amount: getRandomAmount({ min: 10000, max: 40000 }),
  },
  {
    photo: "https://pbs.twimg.com/profile_images/632301429424816128/OwT0LdXU_400x400.jpg",
    trustDate: getRandomDuration({ min: 100, max: 400 }),
    name: "Justin Drake",
    twitterName: "drakefjustin",
    selectable: true,
    amount: getRandomAmount({ min: 10000, max: 40000 }),
  },
  {
    photo: "https://pbs.twimg.com/profile_images/1625144132942561282/iduIzbk__400x400.jpg",
    trustDate: getRandomDuration({ min: 100, max: 400 }),
    name: "Nicoalz",
    twitterName: "0xNicoalz",
    selectable: false,
    amount: getRandomAmount({ min: 10000, max: 40000 }),
  },

  {
    photo: "https://pbs.twimg.com/profile_images/1085263128521293827/yA7Jc_5u_400x400.jpg",
    trustDate: getRandomDuration({ min: 100, max: 400 }),
    name: "Tomasz Stanczak",
    twitterName: "tkstanczak",
    selectable: true,
    amount: getRandomAmount({ min: 10000, max: 40000 }),
  },
  {
    photo: "https://pbs.twimg.com/profile_images/1634913914696736769/u2GDuAyH_400x400.jpg",
    trustDate: getRandomDuration({ min: 100, max: 400 }),
    name: "Makoto Inoue",
    twitterName: "makoto_inoue",
    selectable: true,
    amount: getRandomAmount({ min: 10000, max: 40000 }),
  },
  {
    photo: "https://pbs.twimg.com/profile_images/1634964585621880833/_lp8Pjr__400x400.jpg",
    trustDate: getRandomDuration({ min: 100, max: 400 }),
    name: "Lukas Schor",
    twitterName: "SchorLukas",
    selectable: true,
    amount: getRandomAmount({ min: 10000, max: 40000 }),
  },
  {
    photo: "https://pbs.twimg.com/profile_images/1514738672603734016/k4xQ0nt1_400x400.jpg",
    trustDate: getRandomDuration({ min: 100, max: 400 }),
    name: "Carl Fluke",
    twitterName: "CarlFluke",
    selectable: true,
    amount: getRandomAmount({ min: 10000, max: 40000 }),
  },
  {
    photo: "https://pbs.twimg.com/profile_images/1430872843747840002/qxMzDq-G_400x400.jpg",
    trustDate: getRandomDuration({ min: 100, max: 400 }),
    name: "James Scicluna",
    twitterName: "jamesxik",
    selectable: true,
    amount: getRandomAmount({ min: 10000, max: 40000 }),
  },
  {
    photo: "https://pbs.twimg.com/profile_images/1756803608228577280/lN7SliX3_400x400.jpg",
    trustDate: getRandomDuration({ min: 100, max: 400 }),
    name: "Ian Dilick",
    twitterName: "0xPenryn",
    selectable: true,
    amount: getRandomAmount({ min: 10000, max: 40000 }),
  },
];
