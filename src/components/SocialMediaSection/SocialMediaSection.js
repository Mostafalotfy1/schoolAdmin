import React from "react";
import "./SocialMediaSection.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { SiFacebook, SiTwitter } from "react-icons/si";
import { ImGooglePlus3 } from "react-icons/im";

const SocialMediaSection = () => {
  return (
    <div>
      <p className="text-center social-SignUp">{"or"}</p>
      <p className="text-center">
        <a href="https://www.facebook.com/" target="_blank">
          <SiFacebook className="mr-3 ml-3 facebook-signUp" />
        </a>
        <a href="https://twitter.com/" target="_blank">
          <SiTwitter className="mr-3 ml-3 twitter-signUp" />
        </a>
        <a href="https://mail.google.com/" target="_blank">
          <ImGooglePlus3 className="mr-3 ml-3 mail-signUp" />
        </a>
      </p>
    </div>
  );
};

export default SocialMediaSection;
