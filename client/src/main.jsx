import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import "./index.css"
import App from "./App.jsx"

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <PrimeReactProvider>
            <App />
        </PrimeReactProvider>
    </StrictMode>
)
