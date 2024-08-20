import React, { useEffect, useState } from "react";

function News() {
  const [newsData, setNewsData] = useState([]);

  async function getNews() {
    const url = "https://cricbuzz-cricket.p.rapidapi.com/news/v1/index";
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": import.meta.env.VITE_API_KEY,
        "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      let news = result.storyList.filter((data) => data.story);
      setNewsData(news);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getNews();
  }, []);

  function getTime(input) {
    let timeInSec = input / 1000;
    let currTime = Date.now() / 1000;
    let diff = currTime - timeInSec;

    if (diff < 60) {
      return `${Math.floor(diff)} seconds ago`;
    } else if (diff < 3600) {
      return `${Math.floor(diff / 60)} minutes ago`;
    } else {
      return `${Math.floor(diff / 3600)} hours ago`;
    }
  }

  return (
    <div className="w-full border border-gray-400 py-3 px-4">
      {newsData?.map(({ story: { hline, source, pubTime } }) => (
        <div className="flex gap-[5%] border border-black p-5 mt-3 rounded">
          <div className="w-[75%]">
            <h2 className="text-blue-600 cursor-pointer  hover:underline">
              {hline}
            </h2>
            <div className="flex gap-3 mt-3 text-sm text-gray-700">
              <p>Source: {source}</p>
              <p>{getTime(pubTime)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default News;
