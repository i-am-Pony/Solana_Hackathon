import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Store from "./Store";
import { Provider } from "react-redux";
import { MoralisProvider } from "react-moralis";
import reportWebVitals from "./reportWebVitals";

const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID;
const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL;

const Application = () => {
  const isServerInfo = APP_ID && SERVER_URL ? true : false;

  if (!APP_ID || !SERVER_URL)
    throw new Error(
      "Missing Moralis Application ID or Server URL. Please set your .env file."
    );
  if (isServerInfo)
    return (
     <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
       <div id="game-container">
         <App isServerInfo />
       </div>
     </MoralisProvider>
    );
  else {
    return (
     <div style={{ display: "flex", justifyContent: "center" }}>
       <div>NOT CONNECTED</div>
     </div>
    );
  }
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={Store}>
      <Application />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
  
  reportWebVitals();