import { chakra } from "@chakra-ui/react";
import moment from "moment";
import { CARD_ASPECT_RATIO } from "../../App";
import { useAppState } from "../../AppState";
import { formatCardNumber } from "../utils/formatCardNumber";
import { Watermarks } from "../utils/watermark/Watermark";

export function CardFront() {
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
                    href="/isic/images/front.png"
                    x="0"
                    y="0"
                    width={width}
                    height={height}
                    preserveAspectRatio="none"
                />
                <chakra.text
                    x={61.5}
                    y={7}
                    dominantBaseline="middle"
                    textAnchor="start"
                    fontSize={2.6}
                    fontWeight={600}
                >
                    {formatCardNumber(appState.number)}
                </chakra.text>
                <chakra.text
                    x={5.5}
                    y={38.7}
                    dominantBaseline="middle"
                    textAnchor="start"
                    fontSize={3.1}
                    fontWeight={600}
                >
                    {appState.name}
                </chakra.text>
                <chakra.text
                    x={5.5}
                    y={49}
                    dominantBaseline="middle"
                    textAnchor="start"
                    fontSize={3.1}
                    fontWeight={600}
                >
                    {moment(appState.tweakedBirthdate).format("DD. MM. YYYY")}
                </chakra.text>
                <chakra.text
                    x={5.5}
                    y={59.3}
                    dominantBaseline="middle"
                    textAnchor="start"
                    fontSize={3.1}
                    fontWeight={600}
                >
                    {moment(appState.tweakedValidFrom).format("MM/YYYY")} -{" "}
                    {moment(appState.validUntil).format("MM/YYYY")}
                </chakra.text>
                <chakra.image
                    x={5.5}
                    y={21.5}
                    width={45.1}
                    height={10.1}
                    href={appState.logo}
                    // Align X left Y middle
                    preserveAspectRatio="xMinYMid"
                />
                <chakra.image
                    x={62.5}
                    y={9.2}
                    width={33.5}
                    height={40.6}
                    href={appState.photo}
                    // Fill the space while preserving aspect ratio
                    preserveAspectRatio="xMidYMid slice"
                />
                <Watermarks width={width} height={height} />
            </g>
        </chakra.svg>
    );
}
