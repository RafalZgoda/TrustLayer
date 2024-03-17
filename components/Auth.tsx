import { IDKitWidget, VerificationLevel } from "@worldcoin/idkit";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { getUser, saveUser, setUserPrivyAddress } from "@/lib/supabase";
import { Input } from "./ui/input";
import { usePrivy } from "@privy-io/react-auth";
import { Loader } from "lucide-react";

const onSuccess = async (response: any) => {
  console.log({ response });
};

export default function Auth() {
  if (process.env.NEXT_PUBLIC_WLD_APP_ID === undefined) throw new Error("NEXT_PUBLIC_WLD_APP_ID is undefined");
  const { authenticated, user, logout, ready } = usePrivy(); // get current account
  const [userWorldcoinVerified, setUserWorldcoinVerified] = useState(true);
  const [isTwitterVerified, setIsTwitterVerified] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [twitterHandle, setTwitterHandle] = useState("");
  const [ignoreVerifications, setIgnoreVerifications] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleVerifyWorldcoin = async () => {
    localStorage.setItem("worldcoin-verified", "true");
    isUserVerifiedWithWorldID();
  };

  const isUserVerifiedWithTwitter = async () => {
    if (!authenticated) return;
    const address = user?.wallet?.address;
    const userInDb = await getUser({ address });
    if (userInDb) {
      setIsTwitterVerified(true);
    }
  };

  const handleSaveUser = async () => {
    if (!authenticated) return;
    setLoading(true);
    const address = user?.wallet?.address;
    await saveUser(address!, twitterHandle);
    setIsTwitterVerified(true);
    setLoading(false);
  };

  const isUserVerifiedWithWorldID = () => {
    // here we check local storage for user verification
    setUserWorldcoinVerified(localStorage.getItem("worldcoin-verified") === "true");
  };

  const handleIsUserConnectedOnMobile = async () => {
    if (!authenticated) return;
    const isOnMobile = user?.twitter !== undefined;
    const address = user?.wallet?.address;
    if (isOnMobile) {
      const twitterHandle = user?.twitter?.username;
      await setUserPrivyAddress(twitterHandle!, address!);
      setIgnoreVerifications(true);
    }
  };

  useEffect(() => {
    handleIsUserConnectedOnMobile();
    // handleVerifyWorldcoin();
    isUserVerifiedWithTwitter();
    setIsClient(true);
    const isUserVerified = localStorage.getItem("worldcoin-verified");
    setUserWorldcoinVerified(isUserVerified === "true");
  }, [user, authenticated, ready]);

  return (
    <>
      {isClient && (
        <>
          {/* <Dialog open={!userWorldcoinVerified && authenticated && !ignoreVerifications}>
            <DialogContent>
              <DialogHeader className="z-1">
                <DialogTitle className="text-center ">You are not verified yet</DialogTitle>
                <DialogDescription>
                  <div className="flex justify-center z-99 flex-col items-center gap-3">
                    <IDKitWidget
                      app_id={process.env.NEXT_PUBLIC_WLD_APP_ID as `app_${string}`} // obtained from the Developer Portal
                      action="test" // this is your action name from the Developer Portal
                      onSuccess={onSuccess} // callback when the modal is closed
                      handleVerify={handleVerifyWorldcoin} // optional callback when the proof is received
                      verification_level={VerificationLevel.Device}
                    >
                      {({ open }) => (
                        <Button
                          className="cursor-pointer px-5 py-2 rounded-md w-fit mx-auto text-base mt-3 box-border border-white hover:opacity-80 transition"
                          onClick={() => {
                            open();
                          }}
                          type="submit"
                        >
                          Verify with World ID
                        </Button>
                      )}
                    </IDKitWidget>
                    <Button className="w-24" variant={"secondary"} onClick={logout}>
                      Cancel
                    </Button>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Dialog open={!isTwitterVerified && authenticated && !ignoreVerifications}>
            <DialogContent>
              <DialogHeader className="z-1">
                <DialogTitle className="text-center ">Log in with your Twitter</DialogTitle>
                <DialogDescription>
                  <div className="flex justify-center z-99 flex-col gap-3 items-center mt-5">
                    <Input
                      className="w-6/12"
                      placeholder="Twitter handle"
                      onChange={(e) => {
                        setTwitterHandle(e.target.value);
                      }}
                    />
                    <Input placeholder="Password" type="password" className="w-6/12" />

                    <Button
                      className="cursor-pointer px-5 py-2 rounded-md w-fit mx-auto text-base mt-3 box-border border-white hover:opacity-80 transition bg-blue-500"
                      onClick={() => {
                        handleSaveUser();
                      }}
                      type="submit"
                    >
                      {loading ? <Loader className="animate-spin" /> : "Verify with Twitter"}
                    </Button>

                    <Button variant={"secondary"} onClick={logout}>
                      Cancel
                    </Button>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog> */}
        </>
      )}
    </>
  );
}
