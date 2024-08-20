import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [matchesData, setMatchesData] = useState([]);

  async function getMatchesData() {
    const url = "https://cricbuzz-cricket.p.rapidapi.com/series/v1/7476";
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
      let Data = result.matchDetails;
      let filterData = Data.filter(
        (singleMatch) => singleMatch.matchDetailsMap
      );
      setMatchesData(filterData);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getMatchesData();
  }, []);

  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 border border-gray-400 gap-y-3 gap-x-2 p-4 ">
      {matchesData?.map(({ matchDetailsMap: { match, key: date } }) =>
        match.map(
          (
            {
              matchInfo: {
                matchId,
                team1: { teamName: team1Name, imageId: team1Img },
                team2: { teamName: team2Name, imageId: team2Img },
                status,
                matchDesc,
              },
              matchScore,
            },
            i
          ) => (
            <Link key={i} to={`/matchdetail/${matchId}`} className="  ">
              <div className="h-full px-4 py-5 border border-gray-400 hover:bg-slate-100">
                <div className=" flex flex-row justify-between my-2">
                  <p>T20 {matchDesc}</p>
                  <p>{date.slice(0, 11)}</p>
                </div>

                <div className=" flex flex-row justify-between">
                  <div className=" flex gap-3 items-center ">
                    <img
                      src={`../logos/${team1Img}.png`}
                      alt="teamImg"
                      className=" w-6 object-contain mix-blend-multiply"
                    />

                    <p>{team1Name}</p>
                  </div>
                  {matchScore?.team1Score ? (
                    <p>
                      {matchScore?.team1Score?.inngs1?.runs}/
                      {matchScore?.team1Score?.inngs1?.wickets} (
                      {matchScore?.team1Score?.inngs1?.overs})
                    </p>
                  ) : (
                    ""
                  )}
                </div>

                <div className=" flex flex-row justify-between">
                  <div className=" flex gap-3 items-center">
                    <img
                      src={`../logos/${team2Img}.png`}
                      alt="teamImg"
                      className=" w-6 object-contain mix-blend-multiply"
                    />

                    <p>{team2Name}</p>
                  </div>
                  {matchScore?.team2Score ? (
                    <p>
                      {matchScore?.team2Score?.inngs1?.runs}/
                      {matchScore?.team2Score?.inngs1?.wickets} (
                      {matchScore?.team2Score?.inngs1?.overs})
                    </p>
                  ) : (
                    ""
                  )}
                </div>

                <p className=" mt-2">{status}</p>
              </div>
            </Link>
          )
        )
      )}
    </div>
  );
}

export default Home;
