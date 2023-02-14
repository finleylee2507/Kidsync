import { React } from "react";
import {
  addNewUser,
  signInWithGoogle,
  useAuthState,
} from "../../utilities/firebase";
import { Navigate, useNavigate } from "react-router-dom";
import styles from "./Landing.module.css";
import { FcGoogle } from "react-icons/fc";

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
        unreadMessages: ["welcome"],
        photoURL: user.photoURL,
      };

      addNewUser(newUser, user.uid);

      navigate("/create-profile");
    }
  }

  return <SignInButton />;
};

export default Landing;

/*
click on sign in button


1. Popup and sign in
2. New user gets added to the database using addNewUser
3. Navigate to the create profile
*/
