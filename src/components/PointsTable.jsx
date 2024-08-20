import React, { useEffect, useState } from "react";

function PointsTable() {
  const [tableData, setTableData] = useState([]);
  async function getPointsTableData() {
    const url =
      "https://cricbuzz-cricket.p.rapidapi.com/stats/v1/series/7476/points-table";
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
      console.log(result);
      setTableData(result.pointsTable);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getPointsTableData();
  }, []);

  return (
    <div className="w-full py-4 pl-4  border border-gray-400 ">
      <h1 className=" font-semibold text-lg">Group 1</h1>

      <table className="w-full ">
        <tr className="text-center w-[50] ">
          <td className="text-start ">Team</td>
          <td>M</td>
          <td>W</td>
          <td>L</td>
          <td>NRR</td>
          <td>Pts</td>
        </tr>

        {tableData[0]?.pointsTableInfo?.map((data, i) => (
          <tr key={i} className=" text-center border-t border-gray-400   ">
            <div className="flex gap-2 items-center py-1 ">
              <td>{i + 1}</td>
              <img
                src={`../logos/${data.teamImageId}.png`}
                alt=""
                className="w-6 object-contain "
              />
              <td>{data.teamName}</td>
            </div>

            <td>{data.matchesPlayed}</td>
            <td>{data.matchesWon ? data.matchesWon : "0"}</td>
            <td>{data.matchesLost ? data.matchesLost : "0"}</td>
            <td>{data.nrr}</td>
            <td>{data.points ? data.points : "0"}</td>
          </tr>
        ))}
      </table>

      <h1 className="mt-6 font-semibold text-lg">Group 2</h1>
      <table className="w-full ">
        <tr className="text-center ">
          <td className="text-start ">Team</td>
          <td>M</td>
          <td>W</td>
          <td>L</td>
          <td>NRR</td>
          <td>Pts</td>
        </tr>

        {tableData[1]?.pointsTableInfo?.map((data, i) => (
          <tr key={i} className=" text-center border-t border-gray-400 ">
            <div className="flex gap-2 items-center py-1">
              <td>{i + 1}</td>
              <img
                src={`../logos/${data.teamImageId}.png`}
                alt=""
                className="w-6 object-contain mix-blend-multiply"
              />
              <td>{data.teamName}</td>
            </div>

            <td>{data.matchesPlayed}</td>
            <td>{data.matchesWon ? data.matchesWon : "0"}</td>
            <td>{data.matchesLost ? data.matchesLost : "0"}</td>
            <td>{data.nrr}</td>
            <td>{data.points ? data.points : "0"}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default PointsTable;
