import React, { useEffect } from "react";
import styles from "./UserDetails.module.css";
import {
  Button,
  Container,
  FileInput,
  Group,
  Input,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { updateUser, uploadFile } from "../../utilities/firebase";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import { toast } from "react-toastify";

const UserDetails = ({ user, allUsers }) => {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      //pre-populate the form with the user's sign-in profile info
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      profilePic: null,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      phoneNumber: (value) => {
        if (value && !/^\+1 \(\d{3}\) \d{3}-\d{4}$/.test(value)) {
          return "Invalid phone number";
        } else if (!value) {
          return "Please enter a phone number";
        } else {
          return null;
        }
      },
    },
  });

  useEffect(() => {
    if (user && allUsers) {
      if (allUsers[user.uid].isThirdParty) {
        form.setFieldValue("firstName", user.displayName.split(" ")[0]);
        form.setFieldValue("lastName", user.displayName.split(" ")[1]);
      }

      form.setFieldValue("email", user.email);
    }
  }, [user]);

  return (
    <Container
      fluid
      sx={{
        backgroundColor: "#E7E5F4",
        height: "100%",
        minHeight: "calc(100vh - 0px)",
      }}
    >
      <Text fz="30px" fw="700" mb="2rem" pt="6rem" ta="center">
        Welcome to Kidsync ! 👋 Let's set up your account:
      </Text>
      <div className={styles.userDetailsFormContainer}>
        <Text fz="23px" fw="600" mb="2rem" pt="3rem">
          Enter account details:
        </Text>
        <form
          onSubmit={form.onSubmit(async (values) => {
            const id = toast.loading(
              "We're creating your profile... Please wait."
            );
            let finalProfilePicLink = "N/A";
            const acceptedFileTypes = ["image/gif", "image/jpeg", "image/png"];
            //if the user uploaded a picture, upload it to firebase storage
            if (
              form.values.profilePic &&
              acceptedFileTypes.includes(form.values.profilePic.type)
            ) {
              let [isUploadProfilePicSuccessful, profilePicLink] =
                await uploadFile(
                  form.values.profilePic,
                  "user-profile-pictures"
                );

              if (isUploadProfilePicSuccessful) {
                //check if the upload is successful
                finalProfilePicLink = profilePicLink;
              } else {
                if (user.photoURL) {
                  //use the user's sign in provider profile pic
                  finalProfilePicLink = user.photoURL;
                  toast.error(
                    "Something went wrong during picture upload.⚠️ We'll use your picture from your sign in provider instead."
                  );
                } else {
                  toast.error(
                    "Error during profile picture upload.⚠️Proceeding without failing."
                  );
                }
              }
            } else {
              //the user didn't upload a profile picture
              if (user.photoURL) {
                //use the user's sign in provider profile pic
                finalProfilePicLink = user.photoURL;
              }
            }

            const formattedPhoneNumber = values.phoneNumber.replace(
              /[+\s()-]/g,
              ""
            );

            const updatedUser = {
              displayName: `${values.firstName} ${values.lastName}`,
              email: values.email,
              phoneNumber: formattedPhoneNumber,
              displayedPhoneNumber: values.phoneNumber,
              isProfileCompleted: true,
              profilePic: finalProfilePicLink,
            };

            let uploadProfileResult = true;
            try {
              uploadProfileResult = await updateUser(updatedUser, user.uid);
              navigate("/home");
            } catch (error) {
              console.log("Error while creating user profile: ", error);
            }

            if (uploadProfileResult) {
              toast.update(id, {
                render: "Successfully created profile! Welcome to Kidsync! 😊",
                type: toast.TYPE.SUCCESS,
                isLoading: false,
                autoClose: 2000,
              });
            } else {
              toast.update(id, {
                render:
                  "Hmm... Something went wrong. 😢 Please try again or contact the dev team!",
                type: toast.TYPE.ERROR,
                isLoading: false,
                autoClose: 2000,
              });
            }
          })}
        >
          <TextInput
            withAsterisk
            label="First Name"
            size="lg"
            {...form.getInputProps("firstName")}
            radius="md"
            required
          />
          <TextInput
            withAsterisk
            label="Last Name"
            size="lg"
            {...form.getInputProps("lastName")}
            radius="md"
            required
          />
          <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            size="lg"
            {...form.getInputProps("email")}
            radius="md"
            required
            disabled
          />

          <Input.Wrapper
            label="Phone Number"
            size="lg"
            error={form.errors.phoneNumber}
            withAsterisk
          >
            <Input
              component={InputMask}
              mask="+1 (999) 999-9999"
              size="lg"
              {...form.getInputProps("phoneNumber")}
              radius="md"
            />
          </Input.Wrapper>

          <FileInput
            label="Profile Picture"
            {...form.getInputProps("profilePic")}
            accept="image/png,image/jpeg"
            size="lg"
            radius="md"
          />
          <Text fz="sm" c="#6147FF">
            Note: If no profile picture is uploaded, your profile picture with
            your authentication provider (Google, Microsoft, etc.) will be used.
          </Text>

          <Group position="right" mt="md">
            <Button
              type="submit"
              name="nextButton"
              classNames={{ root: styles.confirmButton }}
            >
              Create Account
            </Button>
          </Group>
        </form>
      </div>
    </Container>
  );
};

export default UserDetails;
