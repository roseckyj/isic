import {
    Box,
    Button,
    Center,
    Flex,
    HStack,
    IconButton,
    Image,
    Text,
    VStack,
} from "@chakra-ui/react";
import { MenuButton } from "./utils/MenuButton";

import moment from "moment";
import { IStepProps } from "../App";
import { useAppState } from "../AppState";

import { formatCardNumber } from "./utils/formatCardNumber";
import {
    dark_ic_add,
    light_ic_clipboard,
    light_ic_competition,
    light_ic_discount,
    light_ic_home,
    light_ic_profile,
    selected_ic_card,
    selected_ic_isic_logo,
} from "./utils/offlineFile";

export function Home({ setStep }: IStepProps) {
    const appState = useAppState();

    return (
        <VStack
            alignItems="stretch"
            w="100vw"
            h="100vh"
            maxH="100vh"
            color="#555555"
        >
            <Flex direction="row" w="100" py={3} bg="#ebf9f9">
                <Box w="100px"></Box>
                <Center flexGrow={1}>
                    <Text fontWeight="bold">Průkazy</Text>
                </Center>
                <Flex direction="row" w="100px">
                    <IconButton
                        aria-label="Settings"
                        variant="ghost"
                        ml="auto"
                        mr={4}
                        size="lg"
                        icon={<img src={dark_ic_add} alt="Settings" />}
                        onClick={() => setStep("edit")}
                    />
                </Flex>
            </Flex>
            <VStack flexGrow={1} padding={6}>
                <HStack
                    bg="gray.200"
                    alignSelf="stretch"
                    borderRadius="10px"
                    padding="1"
                    fontSize="sm"
                >
                    <Box
                        flex={1}
                        bg="white"
                        padding="1.5"
                        textAlign="center"
                        fontWeight="bold"
                        borderRadius="6px"
                    >
                        Aktivní
                    </Box>
                    <Box flex={1} padding="1.5" textAlign="center">
                        Neaktivní
                    </Box>
                </HStack>
                <VStack
                    padding={6}
                    boxShadow="lg"
                    alignSelf="stretch"
                    border="solid 1px #e8e8e8"
                    borderRadius="lg"
                    mt={6}
                >
                    <HStack w="full">
                        <Image
                            src={selected_ic_isic_logo}
                            alt="ISIC"
                            w={10}
                            h={10}
                        />
                        <VStack alignItems="flex-start" ml={2} spacing={0}>
                            <HStack>
                                <Text fontWeight="bold">
                                    {formatCardNumber(appState.number)}
                                </Text>
                                <Image src={light_ic_clipboard} alt="copy" />
                            </HStack>
                            <Text>
                                Platí do{" "}
                                {moment(appState.validUntil).format(
                                    "DD. MM. YYYY"
                                )}
                            </Text>
                        </VStack>
                    </HStack>
                    <Button
                        onClick={() => setStep("card")}
                        alignSelf="stretch"
                        mt={6}
                        shadow="md"
                        p={5}
                        fontSize="sm"
                        bg="#026666"
                        color="white"
                        rounded="full"
                        _hover={{ bg: "#026666" }}
                        _active={{ bg: "#026666" }}
                    >
                        Ukázat průkaz
                    </Button>
                </VStack>
            </VStack>
            <Flex
                direction="row"
                py={4}
                bg="#fefefe"
                shadow="0px 10px 10px 10px rgba(0,0,0,0.1)"
            >
                <MenuButton label="Nástěnka" icon={light_ic_home} />
                <MenuButton label="Slevy" icon={light_ic_discount} />
                <MenuButton label="Průkazy" icon={selected_ic_card} selected />
                <MenuButton label="Soutěže" icon={light_ic_competition} />
                <MenuButton label="Profil" icon={light_ic_profile} />
            </Flex>
        </VStack>
    );
}
