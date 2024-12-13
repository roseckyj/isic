import { useState } from "react";
import { CardView } from "./components/CardView";
import { Home } from "./components/Home";

export interface IStepProps {
    setStep: (step: "home" | "card") => void;
}

const width = 53.98;
const height = 85.6;
export const CARD_ASPECT_RATIO = width / height;

function App() {
    const [step, setStep] = useState<"home" | "card">("home");
    const props: IStepProps = { setStep };

    switch (step) {
        case "home":
            return <Home {...props} />;
        case "card":
            return <CardView {...props} />;
    }
}

export default App;
