import {
    Box,
    Button,
    Center,
    HStack,
    IconButton,
    Image,
    Modal,
    ModalContent,
    ModalOverlay,
    Text,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { CARD_ASPECT_RATIO, IStepProps } from "../App";
import { useAppState } from "../AppState";
import { CardBack } from "./cards/CardBack";
import { CardFront } from "./cards/CardFront";
import { FakeQR } from "./utils/FakeQR";
import { Refresh } from "./utils/Refresh";
import { formatCardNumber } from "./utils/formatCardNumber";
import { dark_ic_qr_scanner } from "./utils/offlineFile";

export function CardView({ setStep }: IStepProps) {
    // const [orientation, setOrientation] = useState<"portrait" | "landscape">(
    //     "portrait"
    // );

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [size, setSize] = useState({ width: 0, height: 0 });
    const container = useRef<HTMLDivElement | null>(null);
    const updateSize = () => {
        if (!container.current) return;

        const width = container.current.clientWidth - 30;
        const height = container.current.clientHeight;

        if (width / height > CARD_ASPECT_RATIO) {
            setSize({ width: height * CARD_ASPECT_RATIO, height });
        } else {
            setSize({ width, height: width / CARD_ASPECT_RATIO });
        }
    };
    const appState = useAppState();

    useEffect(() => {
        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <VStack
            alignItems="stretch"
            fontSize="sm"
            h="100vh"
            maxH="100vh"
            bg="#ebf9f9"
        >
            <HStack
                bg="blackAlpha.800"
                borderRadius="md"
                color="white"
                mx={4}
                mt={4}
            >
                <IconButton
                    aria-label="Back"
                    variant="ghost"
                    colorScheme="blackAlpha"
                    ml="auto"
                    size="lg"
                    icon={<BiArrowBack color="white" size="20px" />}
                    onClick={() => setStep("home")}
                />
                <Box borderRadius="full" bg="green.500" w={4} h={4}></Box>
                <Text flexGrow={1}>PLATNÝ</Text>
                <Text mr={4}>
                    <Refresh>
                        {() => moment().format("DD-MM-yyyy | HH:mm:ss")}
                    </Refresh>
                </Text>
            </HStack>
            <Box flex={1} overflowX="scroll" scrollSnapType="x mandatory">
                <HStack h="full" w="200vw">
                    <Center
                        w="100vw"
                        h="full"
                        overflow="hidden"
                        ref={container}
                        my={2}
                        scrollSnapAlign="start"
                    >
                        <Box
                            w={size.width + "px"}
                            h={size.height + "px"}
                            borderRadius="15px"
                            shadow="md"
                            border="solid 1px #e8e8e8"
                            overflow="hidden"
                        >
                            <CardFront />
                        </Box>
                    </Center>
                    <Center
                        w="100vw"
                        h="full"
                        overflow="hidden"
                        ref={container}
                        my={2}
                        scrollSnapAlign="start"
                    >
                        <Box
                            w={size.width - 15 + "px"}
                            h={size.height - 15 + "px"}
                            borderRadius="15px"
                            shadow="md"
                            border="solid 1px #e8e8e8"
                            overflow="hidden"
                        >
                            <CardBack />
                        </Box>
                    </Center>
                </HStack>
            </Box>

            <HStack justify="center" spacing={4}>
                <Box borderRadius="full" w={2} h={2} bg="gray.500"></Box>
                <Box borderRadius="full" w={2} h={2} bg="gray.500"></Box>
            </HStack>
            <HStack justify="center" mb={6}>
                <Button
                    alignSelf="stretch"
                    mt={6}
                    mb={4}
                    shadow="md"
                    p={7}
                    fontSize="sm"
                    fontWeight="bold"
                    bg="white"
                    color="#026666"
                    rounded="full"
                    _hover={{ bg: "white" }}
                    _active={{ bg: "white" }}
                    leftIcon={
                        <Image
                            src={dark_ic_qr_scanner}
                            alt="ISIC"
                            w={6}
                            h={6}
                        />
                    }
                    border="solid 1px #e8e8e8"
                    onClick={onOpen}
                >
                    QR kód
                </Button>
                <Modal isCentered onClose={onClose} isOpen={isOpen} size="full">
                    <ModalOverlay />
                    <ModalContent bg="#026666" color="white">
                        <Center h="100vh">
                            <VStack w="full" padding={6}>
                                <Text fontWeight="bold">
                                    {formatCardNumber(appState.number)}
                                </Text>
                                <Box
                                    bg="white"
                                    borderRadius="20px"
                                    w="full"
                                    p={10}
                                >
                                    <FakeQR />
                                </Box>
                                <Button
                                    alignSelf="center"
                                    mt={6}
                                    shadow="md"
                                    p={7}
                                    fontSize="sm"
                                    fontWeight="bold"
                                    bg="white"
                                    color="#026666"
                                    rounded="full"
                                    _hover={{ bg: "white" }}
                                    _active={{ bg: "white" }}
                                    border="solid 1px #e8e8e8"
                                    onClick={onClose}
                                >
                                    Zavřít
                                </Button>
                            </VStack>
                        </Center>
                    </ModalContent>
                </Modal>
                {/* <HStack
                    alignSelf="stretch"
                    mt={6}
                    shadow="md"
                    fontSize="sm"
                    fontWeight="bold"
                    bg="white"
                    color="#026666"
                    rounded="full"
                    _hover={{ bg: "white" }}
                    _active={{ bg: "white" }}
                    p={1}
                    onClick={() =>
                        setOrientation(
                            orientation === "portrait"
                                ? "landscape"
                                : "portrait"
                        )
                    }
                >
                    {orientation === "landscape" ? (
                        <>
                            <Box borderRadius="full" p={3}>
                                <Image
                                    src={card_light}
                                    alt="ISIC"
                                    w={6}
                                    h={6}
                                />
                            </Box>
                            <Box
                                borderRadius="full"
                                bg="#026666"
                                color="white"
                                p={3}
                            >
                                <Image
                                    src={card_selected}
                                    alt="ISIC"
                                    w={6}
                                    h={6}
                                />
                            </Box>
                        </>
                    ) : (
                        <>
                            <Box
                                borderRadius="full"
                                bg="#026666"
                                color="white"
                                p={3}
                            >
                                <Image
                                    src={card_selected}
                                    alt="ISIC"
                                    w={6}
                                    h={6}
                                />
                            </Box>
                            <Box borderRadius="full" p={3}>
                                <Image
                                    src={card_light}
                                    alt="ISIC"
                                    w={6}
                                    h={6}
                                />
                            </Box>
                        </>
                    )}
                </HStack> */}
            </HStack>
        </VStack>
    );
}
