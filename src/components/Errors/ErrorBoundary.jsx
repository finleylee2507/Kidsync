import React, { Component } from "react";
import { Container, Flex, Image, Text, Button } from "@mantine/core";
import errorImage from "../../images/error_image.png";
import styles from "../Authentication/Landing.module.css";
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    console.error("Error caught by error boundary:", error, info);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container
          fluid
          sx={{
            backgroundColor: "#EEE1C4",
            height: "100%",
            minHeight: "calc(100vh - 0px)",
          }}
        >
          <Flex direction="column" justify="center" align="center">
            <Text fz={35} fw={600} align="center" mt="7%">
              Oops! Something went wrong...
            </Text>
            <Text
              c="dimmed"
              c="#7c7d80"
              sx={{ maxWidth: "600px" }}
              align="center"
              mt={30}
            >
              We're really sorry for the inconvenience! Please try again later
              or contact the dev team if the problem persists.
            </Text>
            <Image src={errorImage} height={250} width={250} mt={50} />

            <Button
              mt={30}
              classNames={{ root: styles.signInButton }}
              w={500}
              onClick={() => (window.location.href = "/")}
            >
              Go Home
            </Button>
          </Flex>
        </Container>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
