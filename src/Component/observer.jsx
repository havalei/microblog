import React, { useState, useContext, useEffect, useRef } from "react";
import TweetCard from "./TweetCard";
import { TweetContext } from "../Context/TweetContext";
import { LogedContext } from "../Context/LogedContext";

function Observer() {
  const { tweetsList, setTweetsList } = useContext(TweetContext);
  const [page, setPage] = useState(1);
  const { loged } = useContext(LogedContext);
  const url = new URL(`https://64cf7ff0ffcda80aff51ee5e.mockapi.io/tweet`);
  url.searchParams.append("page", page);
  url.searchParams.append("limit", 10);
  url.searchParams.append("sortBy", "createdAt");
  url.searchParams.append("order", "desc");

  const watcherRef = useRef(null);

  async function fetchTweets() {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      console.log("data in the fetch: ", data);
      setTweetsList((prevList) => [...data, ...prevList]);
      console.log("Tweetslist in the fetch", tweetsList);
      setPage(page + 1);
    } catch (error) {
      console.log("we have an error: ", error);
    }
  }

  //   useEffect(() => {
  //     // fetchTweets();
  //     const intervalToFetch = setInterval(() => {
  //       fetchTweets();
  //       console.log("TWEETSLIST : dans les 10sec", tweetsList);
  //       console.log("page : ", page);
  //     }, 10000);

  //     return () => clearInterval(intervalToFetch);
  //   }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchTweets();
        }
      },
      {
        threshold: 0.1, // 10% of the target element is visible
      }
    );

    if (watcherRef.current) {
      observer.observe(watcherRef.current);
    }

    return () => {
      if (watcherRef.current) {
        observer.unobserve(watcherRef.current);
      }
    };
  }, [tweetsList, page]);

  return (
    <>
      {loged && (
        <div className="Container">
          <div className="TweetContainer">
            <div className="Card">
              {!!tweetsList.length &&
                tweetsList.map((tweet) => (
                  <div className="m-1" key={tweet.id}>
                    <TweetCard Tweet={tweet} />
                  </div>
                ))}
              {!tweetsList.length && <div>No tweets to show</div>}
            </div>
          </div>
          <div className="watcher" ref={watcherRef}></div>
        </div>
      )}
    </>
  );
}

export default Observer;
