import "./watermark.css";

export interface IWatermarksProps {
    width: number;
    height: number;
}

export function Watermarks({ width, height }: IWatermarksProps) {
    // Make a grid of watermarks
    const distanceY = 25;
    const distanceX = 25;

    const stepY = -4;
    const stepX = 8;

    const offsetX = -5;
    const offsetY = 3;

    return (
        <>
            <WatermarkClippath />
            {Array.from({ length: Math.ceil(height / distanceY) }, (_, y) =>
                Array.from({ length: Math.ceil(width / distanceX) }, (_, x) => (
                    <Watermark
                        key={`${x}-${y}`}
                        x={x * distanceX + stepX * y + offsetX}
                        y={y * distanceY + stepY * x + offsetY}
                    />
                ))
            )}
        </>
    );
}

interface IWatermarkProps {
    x: number;
    y: number;
}

function Watermark({ x, y }: IWatermarkProps) {
    // Calculate pseudorandom angle between -90 and 90 from x and y
    const angle = (x * 38234 + y * 23423) % 180;
    // Calulate delay as the distance from the bottom right corner
    const delay = Math.sqrt(x ** 2 + (100 - y) ** 2) / 100;

    return (
        <g
            id="watermark"
            transform={`translate(${x} ${y}) scale(0.60) rotate(${angle} 12 12)`}
        >
            <g clipPath="url(#watermark)">
                <image
                    y="-200"
                    width="300"
                    height="300"
                    xlinkHref="/isic/images/bg.png"
                    className="watermark-bg"
                    style={{ animationDelay: `${delay}s` }}
                />
            </g>
        </g>
    );
}

function WatermarkClippath() {
    return (
        <defs>
            <clipPath id="watermark">
                <path d="M12,24c-6.627,0 -12,-5.373 -12,-12c0,-6.627 5.373,-12 12,-12c6.627,0 12,5.373 12,12c0,6.627 -5.373,12 -12,12Zm-2.739,-7.634c1.433,0 2.115,-0.723 2.115,-2.544c0,-1.231 -0.656,-2.034 -1.66,-2.49c-0.589,-0.267 -0.87,-0.696 -0.87,-1.312c0,-0.789 0.134,-1.044 0.549,-1.044c0.455,0 0.535,0.362 0.482,1.152c-0.014,0.24 0.067,0.348 0.254,0.348l0.884,0c0.16,0 0.348,-0.081 0.348,-0.335c0,-1.767 -0.589,-2.517 -1.941,-2.517c-1.245,-0 -2.075,0.603 -2.089,2.33c-0.013,1.204 0.549,2.008 1.526,2.463c0.656,0.308 1.004,0.75 1.004,1.446c0,0.843 -0.08,1.151 -0.575,1.151c-0.442,-0 -0.549,-0.429 -0.509,-1.285c0.013,-0.268 -0.053,-0.375 -0.241,-0.375l-0.883,-0c-0.188,-0 -0.348,0.08 -0.348,0.335c0,1.847 0.575,2.677 1.954,2.677Zm-3.439,-0.08c0.148,-0 0.255,-0.108 0.255,-0.255l0,-8.072c0,-0.147 -0.107,-0.255 -0.255,-0.255l-1.178,-0c-0.147,-0 -0.254,0.108 -0.254,0.255l0,8.072c0,0.147 0.107,0.255 0.254,0.255l1.178,-0Zm7.076,-0l1.178,-0c0.148,-0 0.255,-0.108 0.255,-0.255l-0,-8.072c-0,-0.147 -0.107,-0.255 -0.255,-0.255l-1.178,-0c-0.147,-0 -0.254,0.108 -0.254,0.255l0,8.072c0,0.147 0.107,0.255 0.254,0.255Zm5.012,0.08c1.151,-0 1.968,-0.643 1.968,-2.691c0,-0.227 -0.161,-0.321 -0.335,-0.321l-0.91,-0c-0.188,-0 -0.254,0.147 -0.241,0.401c0.053,0.898 -0.08,1.272 -0.482,1.272c-0.576,-0 -0.602,-0.642 -0.602,-3.039c0,-2.382 0.026,-3.025 0.602,-3.025c0.402,-0 0.535,0.348 0.482,1.205c-0.013,0.254 0.053,0.401 0.241,0.401l0.91,-0c0.161,-0 0.335,-0.08 0.335,-0.321c0,-2.008 -0.817,-2.624 -1.968,-2.624c-1.674,-0 -2.329,1.245 -2.329,4.364c0,3.12 0.655,4.378 2.329,4.378Z" />
            </clipPath>
        </defs>
    );
}
