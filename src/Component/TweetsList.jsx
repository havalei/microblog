import React, { useEffect, useState } from "react";
import TweetCard from "./TweetCard";
import { useContext } from "react";
import { TweetContext } from "../Context/TweetContext";
import InfiniteScroll from "react-infinite-scroll-component";

import { LogedContext } from "../Context/LogedContext";
function TweetsList() {
  const { tweetsList, setTweetsList } = useContext(TweetContext);
  const [page, setPage] = useState(1);
  // const [isLoading, setIsLoading] = useState(false);
  // const [sortedData, setSortedData] = useState([]);
  // const [listOfTenTweets, dispatch] = useReducer(ListReducer, []);
  const { loged } = useContext(LogedContext);
  // const [newList, setNewList] = useState([]);
  const url = new URL(`https://64cf7ff0ffcda80aff51ee5e.mockapi.io/tweet`);
  url.searchParams.append("page", page);
  url.searchParams.append("limit", 10);
  url.searchParams.append("sortBy", "createdAt");
  url.searchParams.append("order", "desc");

  async function fetchTweets() {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      console.log("data in the fetch ; ", data);

      setTweetsList((prevList) => [...data, ...prevList]);
      // setNewList(...data);
      // console.log("data : ", newList);
      // setTweetsList(newList);
      // console.log("newList apres le fetch: ", newList);
      console.log("tweetsList in the fetch :", tweetsList);
    } catch (error) {
      console.log("we have an error: ", error);
    }
  }

  useEffect(() => {
    fetchTweets();
    const intervalToFetch = setInterval(() => fetchTweets(), 10000);
    // console.log("newList : dans les 10sec", newList);

    return () => clearInterval(intervalToFetch);
  }, []);

  function handleMore() {
    setPage(page + 1);

    console.log("page : ", page);
    fetchTweets();
    // setTweetsList(newList, ...tweetsList);
    console.log("tweetlist in the handlemore :", tweetsList);
  }

  // const handleLoadMore = () => {
  //   // setPage(Page + 1);
  //   const NewListOfTen = MakeaListOfTen(currentPage);
  //   listOfTenTweets.concat(NewListOfTen);
  //   console.log("list of Ten Tweets", listOfTenTweets);
  // };

  // const MakeaListOfTen = (currentPage) => {
  //   dispatch({
  //     type: "LISTOFTEN",
  //     payload: { currentPage: currentPage, allTweets: tweetsList },
  //   });
  //   console.log("list of ten : ", listOfTenTweets);
  //   console.log("length :", listOfTenTweets.length);
  // };

  // useEffect(() => {
  //   MakeaListOfTen(currentPage);
  // }, [tweetsList]);

  return (
    <>
      {loged && (
        <InfiniteScroll
          dataLength={tweetsList.length}
          next={() => handleMore()}
          hasMore={true}
          // loader={<h4>Loading...</h4>}
          endMessage={
            <span style={{ textAlign: "center" }}>
              This is it! Ouf! The world is now quite
            </span>
          }
        >
          <div>
            {!!tweetsList.length &&
              tweetsList.map((tweet) => (
                <div className="m-1" key={tweet.id}>
                  <TweetCard Tweet={tweet} />
                </div>
              ))}
            {!tweetsList.length && <div>No tweets to show</div>}
          </div>
        </InfiniteScroll>
      )}
    </>
  );
}

export default TweetsList;
