import React from "react";
import { Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "./layout";
import theme from "./styles/theme";
import Issues from "./routes/Issues";
import IssueDetails from "./routes/IssueDetails";
import NotFound from "./routes/NotFound";
import { IssuesProvider } from "./context/issues";

function App() {
  return (
    <IssuesProvider>
      <ChakraProvider theme={theme}>
        <Layout>
          <Routes>
            <Route path="/" element={<Issues />} />
            <Route path="issues" element={<IssueDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </ChakraProvider>
    </IssuesProvider>
  );
}

export default App;
