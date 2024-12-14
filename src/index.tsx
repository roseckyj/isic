import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppStateProvider, loadAppState } from "./AppState";
import "./index.css";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <AppStateProvider value={loadAppState()}>
            <ChakraProvider
                theme={extendTheme({
                    styles: {
                        global: {
                            body: {
                                overflow: "hidden",
                            },
                            "*": {
                                // Hide scrollbars on all elements
                                scrollbarWidth: "none",
                                "&::-webkit-scrollbar": {
                                    display: "none",
                                },
                                // Disable text selection everywhere
                                userSelect: "none",
                                // Disable focus outline and fill on buttons
                                _focus: {
                                    boxShadow: "none",
                                },
                                // -webkit-tap-highlight-color: transparent;
                                "-webkit-tap-highlight-color": "transparent",
                            },
                        },
                    },
                })}
            >
                <App />
            </ChakraProvider>
        </AppStateProvider>
    </React.StrictMode>
);
