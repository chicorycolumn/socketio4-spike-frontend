import React from "react";
import { Router, navigate, Link } from "@reach/router";
import g from "./css/Generic.module.css";
import styles from "./css/Navbar.module.css";
import navlogo from "./images/logo_cat3b_pY1.png";
let devSwitch = false;

const Navbar = (props) => {
  return (
    <div className={`${styles.navbar}`}>
      <Link
        className={`${styles.navbarInnerBoxLeft} ${styles.hoverable1}`}
        to="/"
      >
        <img className={`${styles.navbarLogo}`} src={navlogo} />
        <h1 className={`${styles.navbarTitle}`}>Chatcat</h1>{" "}
      </Link>

      <div className={`${styles.navbarInnerBoxRight}`}>
        {props.successfullyEnteredRoomName && (
          <Link
            className={`${styles.navbarItem} ${styles.hoverable1}`}
            onClick={(e) => {
              e.preventDefault();
              console.log("Invite!");
              props.setShowInvitePanel(true);
            }}
            to=""
          >
            Invite
          </Link>
        )}
        <Link
          className={`${styles.navbarItem} ${styles.hoverable1}`}
          to="/contact"
        >
          Contact
        </Link>
        <button
          className={`${g.devButton} ${styles.navbarItem} ${styles.hoverable1}`}
          onClick={(e) => {
            e.preventDefault();
            props.socket.emit("Dev query");
          }}
        >
          dQ
        </button>
        <button
          className={`${g.devButton} ${styles.navbarItem} ${styles.hoverable1}`}
          onDoubleClick={(e) => {
            e.preventDefault();
            console.log("DESTROY");
            props.socket.emit("Dev destroy all");
          }}
        >
          dD
        </button>
      </div>
      {devSwitch && (
        <>
          <button
            onClick={(e) => {
              e.preventDefault();
              props.socket.emit("Hello to all");
            }}
          >
            Hello to all
          </button>
        </>
      )}
    </div>
  );
};

export default Navbar;
