import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InPageNavigation from "./InPageNavigation";
function MatchDetail() {
  let { id } = useParams();
  const [data, setData] = useState([]);

  async function getMatchDetails() {
    const url = `https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/${id}`;
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
      setData(result);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getMatchDetails();
  }, []);

  return (
    <div>
      {data.length <= 1 ? (
        <h1>Loading..</h1>
      ) : data.matchInfo && data.matchInfo.team1 && data.matchInfo.team2 ? (
        <InPageNavigation
          teams={[data.matchInfo.team1.name, data.matchInfo.team2.name]}
        >
          {data.matchInfo.team1.playerDetails.map((singlePlayer, i) => (
            <div key={i}>
              <div className="flex gap-3 items-center mt-3">
                <div>
                  <img
                    src={`https://i.cricketcb.com/stats/img/faceImages/${singlePlayer.id}.jpg`}
                    alt=""
                    className="w-10 rounded-full"
                  />
                </div>
                <div>
                  <h4 className="font-bold ">{singlePlayer.fullName}</h4>
                  <p className="text-sm">{singlePlayer.role}</p>
                </div>
              </div>

              <hr className="my-2" />
            </div>
          ))}

          {data.matchInfo.team2.playerDetails.map((singlePlayer, i) => (
            <div key={i}>
              <div className="flex gap-3 items-center mt-3">
                <div>
                  <img
                    src={`https://i.cricketcb.com/stats/img/faceImages/${singlePlayer.id}.jpg`}
                    alt="img not found!"
                    className="w-10 rounded-full"
                  />
                </div>
                <div>
                  <h4 className="font-bold ">{singlePlayer.fullName}</h4>
                  <p className="text-sm">{singlePlayer.role}</p>
                </div>
              </div>

              <hr className="my-2" />
            </div>
          ))}
        </InPageNavigation>
      ) : (
        <h1>Team information not available</h1>
      )}
    </div>
  );
}

export default MatchDetail;
