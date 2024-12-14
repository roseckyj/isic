import { Image } from "@chakra-ui/react";
import { qr } from "./offlineFile";

export function FakeQR() {
    // Render an unscanable QR code

    return <Image src={qr} width="100%" height="100%" />;
}
