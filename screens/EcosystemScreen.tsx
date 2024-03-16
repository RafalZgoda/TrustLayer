import Image from "next/image";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
const EcosystemScreen: React.FC = () => {
  const ecosystemApps = [
    {
      name: "Circle Network",
      tag: "SOCIAL, CHAT, CONNECTIONS",
      description: "Connect with your trust network and talk to them.",
      imgUrl: "/circle_network.png",
    },
    {
      name: "Shield",
      tag: "PROTECTION, SOCIAL",
      description: "Protect and recover your wallet without locking your crypto assets into a smart contract",
      imgUrl: "/shield.png",
    },
    {
      name: "Raise it",
      tag: "DEFI, SOCIAL",
      description: "Invest in your network projects and raise funds for your own projects.",
      imgUrl: "/raiseit.png",
    },
    {
      name: "Frens Bet",
      tag: "BET, GAMES, SPORTS",
      description: "Bet with your trust network on sports events.",
      imgUrl: "/frens_bet.png",
    },
  ];

  return (
    <div className="w-full ">
      <section className="mb-16">
        <h2 className="mb-8 font-bold text-2xl">Ecosystem apps:</h2>
        <div className="flex flex-wrap justify-center">
          {ecosystemApps.map((app, index) => (
            <div className="m-2 w-[36rem]" key={index}>
              <div className=" border p-4 border-white/20 rounded-md hover:border-white/60 transition-all  overflow-hidden mb-2">
                <div className="flex mb-4">
                  <div className="w-1/4 flex justify-center items-center rounded">
                    <Image width={82} height={82} src={app.imgUrl} alt={app.name} />
                  </div>
                  <div className="w-3/4 flex flex-col justify-start items-start">
                    <p className="font-bold text-gray-500 text-sm">{app.tag}</p>
                    <p className="font-bold  text-xl my-2">{app.name}</p>
                    <p className=" text-gray-500 text-xs font-light">{app.description}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center ">
                  <div className="flex">
                    <div className="bg-white/10 hover:bg-white/20 p-2 cursor-pointer rounded mr-2">
                      <Image width={16} height={16} src="/x_logo.png" alt="x_logo" />
                    </div>
                    <div className="bg-white/10 hover:bg-white/20 p-2 cursor-pointer rounded mr-2">
                      <Image width={16} height={16} src="/discord_logo.png" alt="discord_logo" />
                    </div>
                    <div className="bg-white/10 hover:bg-white/20 p-2 cursor-pointer rounded mr-2">
                      <Image width={16} height={16} src="/github_logo.png" alt="github_logo" />
                    </div>
                  </div>
                  <div className="flex bg-white/10 hover:bg-white/20 p-2 cursor-pointer rounded">
                    <p>Open</p>
                    <ArrowTopRightOnSquareIcon className="w-5 font-bold ml-2" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default EcosystemScreen;
