import Image from "next/image";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { MoveRight } from "lucide-react";
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
    {
      name: "Reputa Score",
      tag: "SOCIAL, REPUTATION",
      description:
        "Reputation Score: Monitor your trustworthiness score within the ecosystem based on multiple onchain and offchain factors. Exclusive Airdrops: Access special token rewards for highly trusted users. Community Notes: Trusted users can issue notes on others' historical actions.",
      imgUrl: "/reputascore.png",
    },
  ];

  return (
    <div className="w-full ">
      <section className="mb-16">
        <h2 className="mb-8 font-bold text-2xl">Ecosystem apps:</h2>
        <div className="flex flex-wrap justify-center mb-16">
          {ecosystemApps.map((app, index) => (
            <div className="m-2 w-[36rem]" key={index}>
              <div className=" border p-4 border-white/20 rounded-md hover:border-white/60 transition-all  overflow-hidden mb-2">
                <div className="flex mb-4">
                  <div className="w-1/4 flex justify-center items-center">
                    <Image className="rounded-xl" width={82} height={82} src={app.imgUrl} alt={app.name} />
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
        <div className="flex flex-col items-center justify-center">
          <h2 className="mb-8 font-bold text-2xl text-center ">Want to list your Trust Protocol app ?</h2>
          <button className="bg-primary-blue hover:bg-primary-blue/70 p-2 cursor-pointer rounded flex items-center justify-center px-4 py-2">
            Submit your app
            <MoveRight className="ml-2" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default EcosystemScreen;
