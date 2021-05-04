import React, { useEffect, useState } from "react";
import { Router, navigate, Link, useLocation } from "@reach/router";
import roomUtils from "./utils/roomUtils.js";
import browserUtils from "./utils/browserUtils.js";
import displayUtils from "./utils/displayUtils.js";
import gameUtils from "./utils/gameUtils.js";
import $ from "jquery";

import s from "./css/s.module.css";
import g from "./css/Generic.module.css";
import panelStyles from "./css/Panel.module.css";
import styles from "./css/PlayerList.module.css";

export default function PlayerList(props) {
  console.log("((PlayerList))");

  const [bootTabPlayerName, setBootTabPlayerName] = useState();

  return (
    <div className={`${panelStyles.smallPortraitPanel} ${s.overflowHidden}`}>
      <h2>Players</h2>
      <div className={`${styles.innerBox} ${s.overflowScroll}`}>
        {props.playerList &&
          props.playerList.map((roomPlayer) => {
            return (
              <div
                onClick={(e) => {
                  if (!props.playerData.isRoomboss || roomPlayer.isRoomboss) {
                    return;
                  }
                  console.log({ bootTabPlayerName });
                  if (bootTabPlayerName !== roomPlayer.playerName) {
                    setBootTabPlayerName(roomPlayer.playerName);
                    setTimeout(() => {
                      setBootTabPlayerName(null);
                    }, 2000);
                  } else {
                    setBootTabPlayerName(null);
                  }
                }}
                className={`${styles.nameItem} ${s.noSelect}`}
              >
                {bootTabPlayerName === roomPlayer.playerName ? (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (!props.playerData.isRoomboss) {
                        return;
                      }
                      props.socket.emit("Boot player", {
                        playerName: roomPlayer.playerName,
                        roomName: props.roomData.roomName,
                      });

                      let rpw = browserUtils.getCookie("roomPassword");
                      let currentRoomPassword = rpw ? rpw.split("-")[0] : "";
                      let newRoomPassword = roomUtils.fourLetterWord(
                        currentRoomPassword
                      );
                      props.socket.emit("Update room password", {
                        roomName: props.successfullyEnteredRoomName,
                        roomPassword: newRoomPassword,
                      });
                    }}
                    className={`${styles.bootTab}`}
                  >{`Boot?`}</button>
                ) : (
                  ""
                )}
                <span className={`${styles.awards} ${styles.smallEmoji1}`}>
                  {Math.floor(Math.random() * 10) % 2 ? "👑" : ""}
                </span>

                <div className={`${styles.name} ${s.overflowSplit}`}>
                  <span
                    className={`${
                      roomPlayer.isRoomboss ? styles.marginAdjust : ""
                    }`}
                  >
                    {roomPlayer.playerName}
                  </span>
                  <span className={`${styles.awards} ${styles.smallEmoji2}`}>
                    {roomPlayer.isRoomboss ? " 🎩" : ""}
                  </span>
                </div>

                <div className={`${styles.stars}`}>
                  <span>{`00${roomPlayer.stars.toString()}`}</span>
                  <span className={`${styles.smallEmoji2}`}>⭐</span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
