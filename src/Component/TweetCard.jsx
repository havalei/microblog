import React, { useContext } from "react";
import { UserContext } from "../Context/UserContext";

function TweetCard({ Tweet }) {
  const user = useContext(UserContext);

  return (
    <div className="TweetList">
      <div className="Tweet">
        <div className="Date">{Tweet.createdAt}</div>

        <div className="Message"> {Tweet.tweet}</div>

        <div className="Info">
          <img className="Pic" src={Tweet.avatar} alt="pics of User" />
          <span className="Name">{Tweet.name}</span>
        </div>
      </div>
    </div>
  );
}

export default TweetCard;
