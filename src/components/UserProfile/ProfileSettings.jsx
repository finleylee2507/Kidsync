import React, { useEffect, useRef } from "react";
import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Container,
  FileInput,
  Group,
  Input,
  Text,
  TextInput,
} from "@mantine/core";
import { PhotoEdit } from "tabler-icons-react";
import InputMask from "react-input-mask";
import styles from "./ProfileSettings.module.css";
import { useMediaQuery } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { toast } from "react-toastify";
import { updateUser, uploadFile } from "../../utilities/firebase";
import { useNavigate } from "react-router-dom";

const ProfileSettings = ({ user, allUsers }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      profilePic: null,
    },
  });
  const isMobile = useMediaQuery("(max-width:850px)");
  useEffect(() => {
    if (allUsers && user) {
      form.setFieldValue(
        "firstName",
        allUsers[user.uid].displayName.split(" ")[0]
      );
      form.setFieldValue(
        "lastName",
        allUsers[user.uid].displayName.split(" ")[1]
      );
      form.setFieldValue("email", allUsers[user.uid].email);
      form.setFieldValue("phoneNumber", allUsers[user.uid].phoneNumber);
    }
  }, [allUsers]);
  return (
    <Container
      fluid
      sx={{
        backgroundColor: "#E7E5F4",
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
          Edit Profile
        </Text>

        {/*  edit form */}
        <form
          onSubmit={form.onSubmit(async (values) => {
            const id = toast.loading(
              "We're editing your profile... Please wait."
            );
            let finalProfilePicLink = allUsers[user.uid].profilePic;
            //re-upload profile picture if there is one
            const acceptedFileTypes = ["image/gif", "image/jpeg", "image/png"];
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
                finalProfilePicLink = profilePicLink;
              } else {
                toast.error(
                  "Error during profile picture upload.⚠️Proceeding without failing."
                );
              }
            }
            //construct new user object
            const newPhoneNumber = values.phoneNumber.replace(/[+\s()-]/g, "");
            const updatedUser = {
              displayName: `${values.firstName} ${values.lastName}`,
              email: values.email,
              phoneNumber: newPhoneNumber,
              isProfileCompleted: true,
              profilePic: finalProfilePicLink,
            };

            let uploadProfileResult = true;
            try {
              uploadProfileResult = await updateUser(updatedUser, user.uid);
              navigate("/home");
            } catch (error) {
              console.log("Error while updating user profile: ", error);
            }

            if (uploadProfileResult) {
              toast.update(id, {
                render: "Successfully updated profile!",
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
          {/* Profile image */}
          <Box
            sx={{
              display: "flex",
              position: "relative",
              width: "150px",
              margin: "auto",
            }}
          >
            <Avatar
              src={
                user &&
                allUsers &&
                (!form.values.profilePic
                  ? allUsers[user.uid].profilePic
                  : URL.createObjectURL(form.values.profilePic))
              }
              size={150}
              radius={100}
            />
            <ActionIcon
              sx={{
                position: "absolute",
                left: "70%",
                top: "70%",
              }}
              variant="filled"
              color="violet"
              radius={30}
              title="edit profile picture"
              onClick={() => {
                fileInputRef.current.click();
              }}
            >
              <PhotoEdit color={"white"} />
            </ActionIcon>
          </Box>

          {/*Input fields*/}
          <Box mt="3rem">
            <TextInput
              withAsterisk
              label="First Name"
              size="lg"
              radius="md"
              {...form.getInputProps("firstName")}
              value={form.values.firstName}
              required
            />

            <TextInput
              label="Last Name"
              size="lg"
              radius="md"
              required
              {...form.getInputProps("lastName")}
              value={form.values.lastName}
            />
            <TextInput
              withAsterisk
              label="Email"
              placeholder="your@email.com"
              size="lg"
              radius="md"
              {...form.getInputProps("email")}
              value={form.values.email}
              required
            />

            <Input.Wrapper label="Phone Number" size="lg" withAsterisk>
              <Input
                component={InputMask}
                mask="+1 (999) 999-9999"
                size="lg"
                radius="md"
                {...form.getInputProps("phoneNumber")}
              />
            </Input.Wrapper>

            {/*    hidden file input*/}
            <FileInput
              {...form.getInputProps("profilePic")}
              sx={{ display: "none" }}
              accept="image/png,image/jpeg"
              ref={fileInputRef}
            />
          </Box>

          <Group position="left" mt="md" pb="md">
            <Button
              type="submit"
              name="saveButton"
              classNames={{
                root: styles.saveButton,
              }}
            >
              Save
            </Button>
            <Button
              name="cancelButton"
              variant="outline"
              classNames={{
                root: styles.cancelButton,
              }}
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>
          </Group>
        </form>
      </Box>
    </Container>
  );
};

export default ProfileSettings;
