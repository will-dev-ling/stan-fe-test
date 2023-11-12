import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import ProgramProvider from "./contexts/ProgramContext";
import Home from "./pages/Home";
import Program from "./pages/Program";

const App = () => {
  return (
    <ProgramProvider>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/program/:id" element={<Program />} />
        </Routes>
      </Router>
    </ProgramProvider>
  );
};

export default App;
