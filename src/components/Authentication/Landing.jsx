import { React, useEffect } from "react";
import {
  addNewUser,
  clearDatabase,
  signInWithGoogle,
  useAuthState,
} from "../../utilities/firebase";
import { Navigate, useNavigate } from "react-router-dom";
import styles from "./Landing.module.css";
import { FcGoogle } from "react-icons/fc";
import { Button, Image, Title } from "@mantine/core";
import landingImage from "../../../dist/assets/Group6195.png";
import { fromEmailToDbString } from "../../utilities/emailFormatter";

const SignInButton = () => {
  return (
    <div className={styles.signInBtnContainer}>
      <button
        id={styles.signInButton}
        className="btn btn-light"
        size="lg"
        aria-label="Sign in with google"
        onClick={signInWithGoogle}
      >
        <FcGoogle className={styles.googleIcon} />
        Sign in with Google
      </button>
    </div>
  );
};

const Landing = (allUsers) => {
  const user = useAuthState();
  const navigate = useNavigate();

  const checkAndAddUser = async () => {
    if (user && allUsers && allUsers["allUsers"]) {
      if (!allUsers["allUsers"][user.uid]) {
        const newUser = {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          phoneNumber: "",
        };
        try {
          const dbString = await fromEmailToDbString(user.email);
          addNewUser(newUser, dbString, user.uid);
        } catch (error) {
          console.log("Error while creating dbString: ", error);
        }
        navigate("/create-profile");
      }
    }
  };

  useEffect(() => {
    checkAndAddUser();
  });

  return (
    <div className={styles.bigContainer}>
      <div className={styles.heroImageContainer}>
        <img
          className={styles.heroImage}
          src={landingImage}
          alt="Placeholder for Hero image"
        />
        <div className={styles.heroImageOverlay}>
          <h1 className={styles.heroHeader}>
            Say goodbye to anxiety and hello to peace of mind!
          </h1>
          <p className={styles.heroParagraph}>
            Kidsync keeps your children safe by bridging the communication gap
            between co-parents, caretakers, and babysitters and ensuring that
            all parties have the most updated information to care for your
            child.{" "}
          </p>
        </div>
      </div>
      <div className={styles.signInColumn}>
        <Title className={styles.title}>Sign In</Title>
        <SignInButton />
        {/* <Button onClick={clearDatabase}>Clear Database</Button> */}
      </div>
    </div>
  );
};

export default Landing;

/*
click on sign in button


1. Popup and sign in
2. New user gets added to the database using addNewUser
3. Navigate to the create profile
*/
