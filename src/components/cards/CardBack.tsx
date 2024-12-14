import { chakra } from "@chakra-ui/react";
import { CARD_ASPECT_RATIO } from "../../App";
import { useAppState } from "../../AppState";
import { back } from "../utils/offlineFile";
import { Watermarks } from "../utils/watermark/Watermark";

export function CardBack() {
    const width = 100;
    const height = CARD_ASPECT_RATIO * width;

    const appState = useAppState();

    return (
        <chakra.svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${height} ${width}`}
            id="svg1"
            preserveAspectRatio="none"
        >
            <g
                /* rotate to landscape */ transform={`rotate(-90 ${
                    height / 2
                } ${width / 2}) translate(${(height - width) / 2} ${
                    (width - height) / 2
                })`}
            >
                <chakra.image
                    href={back}
                    x="0"
                    y="0"
                    width={width}
                    height={height}
                    preserveAspectRatio="none"
                />
                <chakra.image
                    x={48.5}
                    y={5.5}
                    width={45.1}
                    height={10.1}
                    href={appState.logo}
                    // Align X left Y middle
                    preserveAspectRatio="xMinYMid"
                />
                <Watermarks width={width} height={height} />
            </g>
        </chakra.svg>
    );
}
