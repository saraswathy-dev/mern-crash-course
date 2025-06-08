import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Box minH={"100vh"} bgColor={useColorModeValue("gray.100", "gray.900")}>
      <Navbar></Navbar>
      <Routes>
        <Route>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
