import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  Alert,
  Anchor,
  Box,
  Button,
  Container,
  Flex,
  Text,
  TextInput,
} from "@mantine/core";
import { AlertCircle, CircleCheck } from "tabler-icons-react";
import styles from "./Landing.module.css";
import { sendPasswordRecoveryEmail } from "../../utilities/firebase";

const ResetPasswordWithEmail = ({}) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:850px)");
  const [isShowAlert, setIsShowAlert] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) => {
        if (!/^\S+@\S+$/.test(value)) {
          return "Invalid email";
        } else {
          return null;
        }
      },
    },
  });
  return (
    <Container
      sx={{
        backgroundColor: "#EEE1C4",
        height: "100%",
        minHeight: "calc(100vh - 0px)",
      }}
      fluid
    >
      <Box
        sx={{
          width: isMobile ? "90%" : "500px",
          margin: "auto",
        }}
      >
        <Text fz="30px" fw="700" mb="2rem" pt="3rem">
          Password Recovery
        </Text>

        <Text pt={20}>
          It happens...🤷 But fear not! Enter the email address associated with
          your account and we'll send you a link to reset your password.
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
            mt={30}
          >
            {alertMessage}
          </Alert>
        )}

        <form
          onSubmit={form.onSubmit((values) => {
            //call firebase reset password function
            const sendResult = sendPasswordRecoveryEmail(values.email);
            if (sendResult) {
              setIsSuccessful(true);
              setAlertMessage(
                "Password recovery email sent. Please check your inbox for further instructions."
              );
              setIsShowAlert(true);

              //clear form
              setTimeout(() => {
                //reset the form and redirect users to the home page
                form.reset();
                setIsShowAlert(false);
                setIsSuccessful(false);
                setAlertMessage("");
              }, 3000);
            } else {
              setAlertMessage(
                "Hmm...Something went wrong. Please try again or contact the dev team."
              );
              setIsShowAlert(true);
            }
          })}
        >
          <TextInput
            withAsterisk
            label="Email"
            {...form.getInputProps("email")}
            size="lg"
            required
            radius="md"
            mt={30}
          />

          <Button
            mt={30}
            fullWidth
            classNames={{ root: styles.signInButton }}
            type="submit"
          >
            Continue
          </Button>
          <Flex justify="center">
            <Text color="dimmed" mt={30}>
              Already have an account?{" "}
              <Anchor underline={false} href="/">
                Sign in here.
              </Anchor>
            </Text>
          </Flex>
        </form>
      </Box>
    </Container>
  );
};

export default ResetPasswordWithEmail;
