import React from "react";
import { Button } from "@material-tailwind/react";

function Changingdisplay() {
  return (
    <>
      <Button variant="gradient" className="rounded-full">
        MyTweet
      </Button>
      <Button variant="outlined" className="rounded-full">
        AllTweet
      </Button>
    </>
  );
}

export default Changingdisplay;
