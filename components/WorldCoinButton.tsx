import { IDKitWidget, VerificationLevel } from "@worldcoin/idkit";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const onSuccess = async (response: any) => {
  console.log({ response });
};

export default function WorldcoinButton() {
  if (process.env.NEXT_PUBLIC_WLD_APP_ID === undefined) throw new Error("NEXT_PUBLIC_WLD_APP_ID is undefined");
  const [userVerified, setUserVerified] = useState(true);
  const [isClient, setIsClient] = useState(false);

  const handleVerify = async () => {
    localStorage.setItem("worldcoin-verified", "true");
    isUserVerifiedWithWorldID();
  };

  const isUserVerifiedWithWorldID = () => {
    // here we check local storage for user verification
    console.log(localStorage.getItem("worldcoin-verified"));
    setUserVerified(localStorage.getItem("worldcoin-verified") === "true");
  };

  useEffect(() => {
    handleVerify();
    setIsClient(true);
    const isUserVerified = localStorage.getItem("worldcoin-verified");
    setUserVerified(isUserVerified === "true");
  }, []);

  return (
    <>
      {isClient && (
        <Dialog open={!userVerified}>
          <DialogContent>
            <DialogHeader className="z-1">
              <DialogTitle className="text-center ">You are not verified yet</DialogTitle>
              <DialogDescription>
                <div className="flex justify-center z-99">
                  <IDKitWidget
                    app_id={process.env.NEXT_PUBLIC_WLD_APP_ID as `app_${string}`} // obtained from the Developer Portal
                    action="test" // this is your action name from the Developer Portal
                    onSuccess={onSuccess} // callback when the modal is closed
                    handleVerify={handleVerify} // optional callback when the proof is received
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
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
