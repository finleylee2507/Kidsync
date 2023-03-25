import { React, useEffect } from "react";
import {
  addNewUser,
  clearDatabase,
  deAuthenticateUser,
  signInWithGoogle,
  useAuthState,
} from "../../utilities/firebase";
import { useNavigate } from "react-router-dom";
import styles from "./Landing.module.css";
import { FcGoogle } from "react-icons/fc";
import { Title } from "@mantine/core";
import landingImage from "../../images/Group6195.png";
import { fromEmailToDbString } from "../../utilities/helperMethods";
import { toast } from "react-toastify";

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

const Landing = ({ allUsers }) => {
  const user = useAuthState();
  const navigate = useNavigate();
  const checkAndAddUser = async () => {
    if (user && allUsers) {
      if (!allUsers[user.uid]) {
        //if we don't have a record for the current user in the db, add the user
        const newUser = {
          displayName: user.displayName,
          email: user.email,
          providerPhotoURL: user.photoURL,
          phoneNumber: "",
          id: user.uid,
        };
        let addNewUserResult = false;
        try {
          const dbString = await fromEmailToDbString(user.email);
          addNewUserResult = await addNewUser(newUser, dbString, user.uid);

          if (addNewUserResult) {
            navigate("/create-profile");
          } else {
            //user doesn't have permission to edit the user table
            await deAuthenticateUser();
            toast.error(
              "Sorry, you don't have permission to access this app:(. 🙁 Try contacting the dev team to request access."
            );
          }
        } catch (error) {
          console.log("Error while creating dbString: ", error);
        }
      } else {
        if (!allUsers[user.uid].isProfileCompleted) {
          //if we have a record for the user but the user has not completed his/her profile
          //redo create profile step
          navigate("/create-profile");
        }
      }
    }
  };

  useEffect(() => {
    checkAndAddUser();
  }, [user]);

  return (
    <div className={styles.bigContainer}>
      <div className={styles.leftContainer}>
        <div className={styles.heroImageContainer}>
          <img
            className={styles.heroImage}
            src={landingImage}
            alt="Placeholder for Hero image"
          />
        </div>

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
        {/*<button*/}
        {/*  onClick={clearDatabase}*/}
        {/*  style={{*/}
        {/*    border: "1px solid black",*/}
        {/*  }}*/}
        {/*>*/}
        {/*  Clear Database*/}
        {/*</button>*/}
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
