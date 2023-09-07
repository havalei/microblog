import React, { useContext } from "react";
import { useState } from "react";
import "../Style/Form.css";
import { UserContext } from "../Context/UserContext";
import { TweetContext } from "../Context/TweetContext";
import { v4 } from "uuid";
import { LogedContext } from "../Context/LogedContext";
import Changingdisplay from "./Changingdisplay";
import Observer from "./observer";

function TweetForm() {
  const [tweet, setTweet] = useState("");
  const { setTweetsList } = useContext(TweetContext);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);
  const { loged } = useContext(LogedContext);

  async function postToApi(newTweet) {
    try {
      const tweetResponse = await fetch(
        "https://64cf7ff0ffcda80aff51ee5e.mockapi.io/tweet",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(newTweet),
        }
      );
      if (tweetResponse.ok) {
        const tweetResult = await tweetResponse.json();
      } else {
        console.log("Could not post the new tweet to the api...");
      }
    } catch (error) {
      console.log("Error posting to API:", error);
    }
  }

  async function SendTweet() {
    const newTweet = {
      createdAt: new Date().toUTCString(),
      name: user.userName,
      avatar:
        "https://cdn-s-www.bienpublic.com/images/151D76CA-076B-4956-BEBF-5EDFB8BF9462/NW_raw/la-reine-d-angleterre-a-passe-le-6-fevrier-le-cap-de-70-ans-de-regne-une-longevite-record-photo-jane-barlow-pool-reuters-1646128244.jpg",
      tweet: tweet,
      id: v4(),
    };

    setIsLoading(true);

    await postToApi(newTweet);
    setTweet("");
    setIsLoading(false);
    setTweetsList((prevTweetsList) => [newTweet, ...prevTweetsList]);
  }

  return (
    <>
      {loged ? (
        <div className="Page">
          <div className="Form">
            <textarea
              rows={5}
              cols={50}
              resize="true"
              placeholder="What do you have in Mind"
              className="TextArea rounded-full"
              value={tweet || ""}
              onChange={(e) => setTweet(e.target.value)}
              maxLength={140}
            />

            <div>
              {isLoading ? (
                <button type="button" className=" loader ..." disabled>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="h-12 w-12 animate-bounce"
                  >
                    <path
                      fill="#2196F3"
                      d="M448 128v30.34c0 9.35-2.98 18.2-8.33 25.54l-152.43 157.12c-6.84 7.05-16.27 11.1-26.13 11.1s-19.29-4.05-26.13-11.1L72.33 183.88c-5.35-7.34-8.33-16.19-8.33-25.54V128h128V71.43C192 47.97 207.99 32 229.57 32h52.86C304.01 32 320 47.97 320 71.43V128h128zm-284.8 88.23L224 250.53l60.8-62.3L480 293.34V128H32v165.34l131.2-134.11zm284.8 137.55H16V384h448v-30.22l-131.2-134.1z"
                    />
                  </svg>
                  Processing...
                </button>
              ) : (
                <button
                  variant="text"
                  className="Button rounded-full"
                  onClick={(e) => SendTweet()}
                >
                  {" "}
                  Send my thoughts to the World
                </button>
              )}
            </div>
          </div>

          <div className="ChangeBtn">
            <Changingdisplay />
          </div>
          <Observer />

          {/* <TweetsList /> */}
        </div>
      ) : (
        <>
          <br></br>
          <div
            className="flex items-center bg-blue-300 text-white text-sm font-bold px-4 py-3"
            role="alert"
          >
            <svg
              className="fill-current w-4 h-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
            </svg>
            <span>
              Only Logged in person can see the tweets, please first{" "}
              <a href="/login"> log in : here</a>
            </span>
          </div>
        </>
      )}
    </>
  );
}

export default TweetForm;
