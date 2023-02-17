import { React } from "react";
import {
  addNewUser,
  signInWithGoogle,
  useAuthState,
} from "../../utilities/firebase";
import { Navigate, useNavigate } from "react-router-dom";
import styles from "./Landing.module.css";
import { FcGoogle } from "react-icons/fc";
import { Grid } from "@mantine/core";
import {
  createStyles,
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
} from "@mantine/core";

const SignInButton = () => {
  return (
    <div className={styles.signInBtnContainer}>
      <button
        variant="light"
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

  if (user && allUsers && allUsers["allUsers"]) {
    if (!allUsers["allUsers"][user.uid]) {
      const newUser = {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      };

      addNewUser(newUser, user.uid);

      navigate("/create-profile");
    }
  }

  return user ? (
    <Navigate to="/dependents" />
  ) : (
    <container
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          minWidth: "60vw",
          minHeight: "100vh",
          alignItems: "center",
        }}
      >
        <Image
          className={styles.heroImage}
          src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"
          alt="Placeholder for Hero image"
        />
      </div>
      <div className={styles.signInColumn}>
        <Title className={styles.title}>Hey there!👋</Title>
        <SignInButton />
      </div>
    </container>
  );
};

export default Landing;

/*
click on sign in button


1. Popup and sign in
2. New user gets added to the database using addNewUser
3. Navigate to the create profile
*/
