import React from "react";
import style from "./Footer.module.scss";

export default function Footer() {
  return (
    <div className={style.footer}>
      <div className={style.siteMapContainer}>
        <div className={style.restaurantLinks}>
          <p>Restaurant</p>
          <ul>
            <li>Sign-up</li>
            <li>Log-in</li>
          </ul>
        </div>
        <div className={style.about}>
          <p>About</p>
          <ul>
            <li>Get in Touch</li>
            <li>Feedback</li>
            <li>Developed by</li>
          </ul>
        </div>
      </div>
      <div className={style.logoContainer}>
        <h4>RestoBooking</h4>
      </div>
    </div>
  );
}
