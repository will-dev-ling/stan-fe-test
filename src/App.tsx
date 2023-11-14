import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ProgramProvider, { ProgramContext } from "./contexts/ProgramContext";
import Error from "./components/Error";
import Home from "./pages/Home";
import Program from "./pages/Program";

const App = () => {
  return (
    <ProgramProvider>
      <ProgramContext.Consumer>
        {({ hasError }) => {
          return (
            <Router>
              <Header />
              {hasError ? (
                <Error />
              ) : (
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/program/:id" element={<Program />} />
                </Routes>
              )}
            </Router>
          );
        }}
      </ProgramContext.Consumer>
    </ProgramProvider>
  );
};

export default App;
