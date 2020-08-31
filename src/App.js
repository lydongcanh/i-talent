import React from "react";
import { Pane, Heading } from "evergreen-ui";
import { JellyfishSpinner } from "react-spinners-kit";

export default function App() {
  return (
    <Pane
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="90vh"
    >
      <JellyfishSpinner />
      <Heading size={100}>Comming soon!</Heading>
    </Pane>
  );
}