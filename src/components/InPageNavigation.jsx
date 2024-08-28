import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function InPageNavigation({ teams, children }) {
  const [index, setIndex] = useState(0);
  let togglBar = useRef();
  let btnRef = useRef();

  function toggleHandler(clickedBtn, i) {
    let BtnWidth = clickedBtn.offsetWidth;
    let BtnLeft = clickedBtn.offsetLeft;
    togglBar.current.style.width = BtnWidth + "px";
    togglBar.current.style.left = BtnLeft + "px";
    setIndex(i);
  }

  useEffect(() => {
    toggleHandler(btnRef.current, 0);
  }, []);

  return (
    <div className="w-full  ">
      <div
        className={
          " max-w-full h-[70px] flex justify-between items-end  " +
          (teams.length > 2 ? "bg-purple-800" : "")
        }
      >
        {teams.length > 2
          ? teams.map((team, i) => (
              <Link key={i} to={team.path}>
                <button
                  ref={i == 0 ? btnRef : null}
                  className={
                    "mt-2 text-xs font-semibold hover:bg-purple-900  py-3 px-10 " +
                    (index == i ? "text-white" : "text-gray-300")
                  }
                  onClick={(e) => toggleHandler(e.target, i)}
                >
                  {team.title}
                </button>
              </Link>
            ))
          : teams.map((team, i) => (
              <button
                key={i}
                ref={i == 0 ? btnRef : null}
                className={
                  " mx-2 w-[50%] bg-gray-200   font-semibold  py-2 px-3 " +
                  (index == i ? "text-gray-900" : "text-gray-400")
                }
                onClick={(e) => toggleHandler(e.target, i)}
              >
                {team}
              </button>
            ))}
        <hr
          ref={togglBar}
          className={
            " border absolute duration-300 " +
            (teams.length > 2 ? "border-white" : "border-black")
          }
        ></hr>
      </div>

      {teams.length > 2 ? "" : children[index]}
    </div>
  );
}

export default InPageNavigation;
