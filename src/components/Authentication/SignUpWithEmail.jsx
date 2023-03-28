import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import {
  Container,
  Box,
  Text,
  TextInput,
  PasswordInput,
  Button,
  Flex,
  Anchor,
  Alert,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import styles from "./Landing.module.css";
import { createUserAccountWithEmail, signOut } from "../../utilities/firebase";
import { AlertCircle, CircleCheck } from "tabler-icons-react";

const SignUpWithEmail = ({}) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:850px)");
  const [isShowAlert, setIsShowAlert] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    validate: {
      email: (value) => {
        if (!/^\S+@\S+$/.test(value)) {
          return "Invalid email";
        } else {
          return null;
        }
      },
      password: (value) => {
        if (value.length < 6) {
          return "Password should be at least 6 characters";
        } else {
          return null;
        }
      },
      passwordConfirmation: (value) => {
        if (value !== form.values.password) {
          return "Your password and confirmation password must match";
        } else {
          return null;
        }
      },
    },
  });
  return (
    <Container
      fluid
      sx={{
        backgroundColor: "#EEE1C4",
        height: "100%",
        minHeight: "calc(100vh - 0px)",
      }}
    >
      <Box
        sx={{
          width: isMobile ? "90%" : "600px",
          margin: "auto",
        }}
      >
        <Text fz="30px" fw="700" mb="2rem" pt="3rem">
          Sign Up
        </Text>

        {isShowAlert && (
          <Alert
            title={isSuccessful ? "Success" : "Error"}
            color={isSuccessful ? "green" : "red"}
            variant="filled"
            withCloseButton
            onClose={() => {
              setIsShowAlert(false);
            }}
            icon={isSuccessful ? <CircleCheck /> : <AlertCircle />}
          >
            {alertMessage}
          </Alert>
        )}
        <form
          onSubmit={form.onSubmit(async (values) => {
            //Create a password based account
            let [signUpResult, error] = await createUserAccountWithEmail(
              values.email,
              values.password
            );

            if (signUpResult) {
              setIsSuccessful(true);
              setAlertMessage(
                "Sign up successful! Bringing you back to the home page."
              );
              setIsShowAlert(true);

              setTimeout(() => {
                //reset the form and redirect users to the home page
                form.reset();
                setIsShowAlert(false);
                setIsSuccessful(false);
                setAlertMessage("");
                signOut();
                navigate("/");
              }, 1000);
            } else {
              if (error.code === "auth/email-already-in-use") {
                setAlertMessage("Email is already in use.");
              } else {
                setAlertMessage("Something went wrong. Please try again!");
              }
              setIsSuccessful(false);
              setIsShowAlert(true);
            }
          })}
        >
          <Box mt="3rem">
            <TextInput
              withAsterisk
              label="Email"
              size="lg"
              radius="md"
              placeholder="Please enter your email"
              {...form.getInputProps("email")}
              required
            />

            <PasswordInput
              withAsterisk
              label="Password"
              size="lg"
              radius="md"
              placeholder="Please set a password"
              mt={10}
              {...form.getInputProps("password")}
              required
            />

            <PasswordInput
              withAsterisk
              label="Confirm Password"
              size="lg"
              radius="md"
              placeholder="Retype your password"
              mt={10}
              {...form.getInputProps("passwordConfirmation")}
              required
            />

            <Button
              mt={30}
              fullWidth
              classNames={{ root: styles.signInButton }}
              type="submit"
            >
              Sign Up
            </Button>

            <Flex justify="center">
              <Text color="dimmed" mt={30}>
                Already have an account?{" "}
                <Anchor underline={false} href="/">
                  Sign in here.
                </Anchor>
              </Text>
            </Flex>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default SignUpWithEmail;
