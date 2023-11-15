import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HashRouter, Route, Routes } from 'react-router-dom';

import Market from "./pages/Market.jsx";
import Home from "./pages/Home.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { arbitrum, optimism, sepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from 'wagmi/providers/alchemy';


import "./polyfills";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [arbitrum],
  [alchemyProvider({ apiKey: 'Wj9xJWTAnxnob5ftBVI3OiQ-zuCZwNrG' }),
        publicProvider()]
);
const { connectors } = getDefaultWallets({
  appName: "Lila Finance",
  projectId: "c0027ae711b4888e46a4a700b7274a56",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },
//       {
//         path: "/market",
//         element: <Market />,
//       },
//       {
//         path: "/portfolio",
//         element: <Portfolio />,
//       },
//     ],
//   },
// ]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains} modalSize="compact">
          <HashRouter>
            <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<Home />} />
                <Route path="market" element={<Market />} />
                <Route path="portfolio" element={<Portfolio />} />
              </Route>
            </Routes>
          </HashRouter>
        </RainbowKitProvider>
      </WagmiConfig>
    </React.StrictMode>
  );
