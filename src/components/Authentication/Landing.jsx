import { signInWithGoogle, useAuthState } from "../../utilities/firebase";

import { redirect } from "react-router-dom";

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

const Landing = () => {
  return <SignInButton />;
};

export default Landing;
