import { Container } from "semantic-ui-react";
import { ToastContainer } from "react-toastify";

import { WhitelistForm } from "./components/WhitelistForm";

function App() {
  return (
    <Container>
      <WhitelistForm />
      <ToastContainer />
    </Container>
  );
}

export default App;
