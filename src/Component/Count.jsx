import React, { useContext, useEffect, useState } from "react";
import { TweetContext } from "../Context/TweetContext";
import { UserContext } from "../Context/UserContext";
import { CountContext } from "../Context/CountContext";

function Count() {
  const { tweetsList } = useContext(TweetContext);
  const { count, setCount } = useContext(CountContext);
  const { user } = useContext(UserContext);
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    setMyList(tweetsList.filter((tweet) => tweet.name === user.userName));
    console.log("mylist in count ", myList);
  }, [tweetsList, user]);

  useEffect(() => {
    setCount(myList.length);
  }, [myList, setCount]);

  return <span> {count}</span>;
}

export default Count;
