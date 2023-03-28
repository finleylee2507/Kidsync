import { React, useEffect, useState } from "react";
import {
  addNewUser,
  clearDatabase,
  deAuthenticateUser,
  isAuthenticatedThroughThirdParty,
  signInWithEmail,
  signInWithGoogle,
  useAuthState,
} from "../../utilities/firebase";
import { useNavigate } from "react-router-dom";
import styles from "./Landing.module.css";
import { FcGoogle } from "react-icons/fc";
import { AlertCircle } from "tabler-icons-react";
import {
  Alert,
  Anchor,
  Avatar,
  Button,
  Container,
  Divider,
  Flex,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import landingImage from "../../images/Group6195.png";
import { fromEmailToDbString } from "../../utilities/helperMethods";
import { toast } from "react-toastify";
import { useForm } from "@mantine/form";

const Landing = ({ allUsers }) => {
  const user = useAuthState();
  const navigate = useNavigate();
  const [isShowAlert, setIsShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [rerenderVar, setRerenderVar] = useState(0);
  const flipRerenderVar = () => {
    setRerenderVar((prevValue) => (prevValue === 0 ? 1 : 0));
  };

  console.log("Current user: ", user);
  //sign in form
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const checkAndAddUser = async () => {
    console.log("Checking and adding");
    if (user && allUsers) {
      if (!user.email) {
        toast.error(
          "Error. There is already a password-based account that signs in using the same email address."
        );
        await deAuthenticateUser();
        return;
      }
      console.log("Let me see: ", allUsers[user.uid]);
      if (allUsers[user.uid] && allUsers[user.uid].isProfileCompleted) {
        //direct users to the home page if they're authenticated, signed in, added to the db and have completed their profiles
        navigate("/home");
      } else {
        //the user hasn't finished setting up his account
        let isThirdParty = isAuthenticatedThroughThirdParty(user);
        if (!allUsers[user.uid]) {
          //if we don't have a record for the current user in the db, add the user
          console.log("No record, adding");
          const newUser = {
            displayName: isThirdParty ? user.displayName : "",
            email: user.email,
            providerPhotoURL: isThirdParty ? user.photoURL : "",
            phoneNumber: "",
            id: user.uid,
            isThirdParty: isThirdParty,
          };
          let addNewUserResult = false;
          try {
            const dbString = await fromEmailToDbString(user.email);
            addNewUserResult = await addNewUser(newUser, dbString, user.uid);

            if (addNewUserResult) {
              navigate("/create-profile");
            } else {
              //user doesn't have permission to edit the user table (the app is in not open to newcomers)
              await deAuthenticateUser();
              toast.error(
                "Sorry, you don't have permission to access this app:(. 🙁  Please contact the dev team to request access."
              );
            }
          } catch (error) {
            console.log("Error while creating dbString: ", error);
          }
        } else {
          console.log("WE already have a record");
          //we hava a record for the user in the db
          if (!allUsers[user.uid].isProfileCompleted) {
            //the user has not completed his/her profile
            //redo create profile step
            navigate("/create-profile");
          }
        }
      }
    }
  };

  useEffect(() => {
    console.log("use effect runs");
    checkAndAddUser();
  }, [user, rerenderVar]);

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
        <form
          onSubmit={form.onSubmit(async (values) => {
            //call firebase sign in method
            let [signInResult, error] = await signInWithEmail(
              values.email,
              values.password
            );
            if (!signInResult) {
              //if we run into sign-in errors
              if (error.code === "auth/user-not-found") {
                setAlertMessage(
                  "We do not recognize the email. Please sign up first."
                );
              }
              if (error.code === "auth/wrong-password") {
                setAlertMessage("Wrong password.");
              }

              setIsShowAlert(true);
            } else {
              //sign in successful
              await checkAndAddUser();
              flipRerenderVar();
            }
          })}
        >
          <Container size="600px">
            <Title className={styles.title}>Sign In</Title>
            <Divider
              color="gray"
              mt={30}
              label="Sign in using a Kidsync account"
              labelPosition="center"
              classNames={{
                label: styles.dividerLabel,
              }}
            ></Divider>
            {isShowAlert && (
              <Alert
                title="Error"
                color="red"
                variant="filled"
                radius="md"
                mt={30}
                icon={<AlertCircle />}
                withCloseButton
                onClose={() => {
                  setIsShowAlert(false);
                  setAlertMessage("");
                }}
              >
                {alertMessage}
              </Alert>
            )}
            <TextInput
              withAsterisk
              label="Email"
              {...form.getInputProps("email")}
              size="lg"
              required
              radius="md"
              mt={30}
            />
            <PasswordInput
              withAsterisk
              label="Password"
              {...form.getInputProps("password")}
              size="lg"
              required
              radius="md"
              mt={10}
            />
            <Button
              mt={30}
              fullWidth
              classNames={{ root: styles.signInButton }}
              type="submit"
            >
              Sign In
            </Button>

            <Text mt={10}>
              <Anchor underline={false} color="dimmed" href="/reset-password">
                Forgot password?
              </Anchor>
            </Text>

            <Divider
              color="gray"
              mt={30}
              label="Or sign in using"
              labelPosition="center"
              classNames={{
                label: styles.dividerLabel,
              }}
            ></Divider>
            <Flex justify="center">
              <Avatar
                radius={30}
                size="lg"
                mt={10}
                onClick={async () => {
                  await signInWithGoogle();
                }}
                classNames={{ root: styles.providerIcon }}
              >
                <FcGoogle />
              </Avatar>
            </Flex>
            <Flex justify="center">
              <Text color="dimmed" mt={30}>
                Need an account?{" "}
                <Anchor underline={false} href="/sign-up-with-email">
                  Sign up here.
                </Anchor>
              </Text>
            </Flex>
          </Container>
        </form>

        <button
          onClick={clearDatabase}
          style={{
            border: "1px solid black",
          }}
        >
          Clear Database
        </button>
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
