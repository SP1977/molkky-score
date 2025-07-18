import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { MolkkyProvider } from "./components/contexts/MolkkyContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<MolkkyProvider>
		<App />
	</MolkkyProvider>
);

// if ("serviceWorker" in navigator) {
// 	window.addEventListener("load", () => {
// 		navigator.serviceWorker
// 			.register("/service-worker.js")
// 			.then((registration) => {
// 				console.log("Service Worker registered: ", registration);
// 			})
// 			.catch((registrationError) => {
// 				console.log(
// 					"Service Worker registration failed: ",
// 					registrationError
// 				);
// 			});
// 	});
// }

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
