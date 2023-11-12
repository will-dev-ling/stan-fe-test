import React from "react";
import App from "./App";
import "./App.scss";
// Import createRoot from 'react-dom/client' instead of 'react-dom'
import { createRoot } from "react-dom/client";

// Use createRoot to create a root for your application
const container = document.getElementById("app");
const root = createRoot(container!); // createRoot(container!) if you are using TypeScript and the container is non-null

// Use the root to render your app component
root.render(<App />);
