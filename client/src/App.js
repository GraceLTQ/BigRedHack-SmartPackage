import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { RouterProvider } from "react-router-dom";
// import router from "./router";
import Auth from "./Auth.js";
import Homepage from "./Homepage.js";

function App() {
  return (
    // <RouterProvider router={router}></RouterProvider>

    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/homepage" element={<Homepage />} />
        </Routes>
      </div>
    </Router>

    // <div className="App">
    //   <Auth />
    // </div>
  );
}

export default App;
