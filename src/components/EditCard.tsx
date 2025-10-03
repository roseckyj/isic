import {
    Box,
    Button,
    Center,
    Flex,
    IconButton,
    Input,
    Text,
    VStack,
} from "@chakra-ui/react";

import moment from "moment";
import { useState } from "react";
import { IStepProps } from "../App";
import { useAppState } from "../AppState";
import { dark_ic_icon_close } from "./utils/offlineFile";

export function EditCard({ setStep }: IStepProps) {
    const appState = useAppState();

    const [name, setName] = useState(appState.name);
    const [number, setNumber] = useState(appState.number);
    const [birthdate, setBirthdate] = useState(
        moment(appState.birthdate).format("YYYY-MM-DD")
    );
    const [photo, setPhoto] = useState<File | null>(null);
    const [logo, setLogo] = useState<File | null>(null);
    const [validFrom, setValidFrom] = useState(
        moment(appState.validFrom).format("YYYY-MM-DD")
    );

    return (
        <VStack
            alignItems="stretch"
            w="100vw"
            h="100vh"
            maxH="100vh"
            color="#555555"
        >
            <Flex direction="row" w="100" py={3} bg="#ebf9f9">
                <Flex direction="row" w="100px">
                    <IconButton
                        aria-label="Settings"
                        variant="ghost"
                        mr="auto"
                        ml={4}
                        size="lg"
                        icon={<img src={dark_ic_icon_close} alt="Zavřít" />}
                        onClick={() => setStep("home")}
                    />
                </Flex>
                <Center flexGrow={1}>
                    <Text fontWeight="bold">Upravit</Text>
                </Center>
                <Box w="100px"></Box>
            </Flex>
            <Box overflowY="auto" flexGrow={1}>
                <VStack padding={6} alignItems="start">
                    {/*
                    name: string;
                    number: string;
                    birthdate: string;
                    photo: string;
                    logo: string;
                    validFrom: string;
                */}
                    <Text fontWeight="bold">Jméno a příjmení</Text>
                    <Input
                        placeholder="Jméno a příjmení"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Text fontWeight="bold" mt={6}>
                        Číslo karty
                    </Text>
                    <Input
                        placeholder="Číslo karty"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                    />
                    <Text fontWeight="bold" mt={6}>
                        Datum narození
                    </Text>
                    <Input
                        placeholder="Datum narození"
                        type="date"
                        value={birthdate}
                        onChange={(e) => setBirthdate(e.target.value)}
                    />
                    <Text fontWeight="bold" mt={6}>
                        Platnost od
                    </Text>
                    <Input
                        placeholder="Platnost od"
                        type="date"
                        value={validFrom}
                        onChange={(e) => setValidFrom(e.target.value)}
                    />
                    <Text fontWeight="bold" mt={6}>
                        Fotka
                    </Text>
                    <Input
                        placeholder="Fotka"
                        type="file"
                        onChange={(e) =>
                            setPhoto(e.target.files ? e.target.files[0] : null)
                        }
                    />
                    <Text fontWeight="bold" mt={6}>
                        Logo
                    </Text>
                    <Input
                        placeholder="Logo"
                        type="file"
                        onChange={(e) =>
                            setLogo(e.target.files ? e.target.files[0] : null)
                        }
                    />
                    <Button
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
                        onClick={async () => {
                            // Convert files to base64
                            const photoBase = photo
                                ? await new Promise<string>((resolve) => {
                                      const reader = new FileReader();
                                      reader.onload = () =>
                                          resolve(reader.result as string);
                                      reader.readAsDataURL(photo);
                                  })
                                : null;

                            const logoBase = logo
                                ? await new Promise<string>((resolve) => {
                                      const reader = new FileReader();
                                      reader.onload = () =>
                                          resolve(reader.result as string);
                                      reader.readAsDataURL(logo);
                                  })
                                : null;

                            appState.save({
                                name,
                                number,
                                birthdate: moment(birthdate).toISOString(),
                                photo: photoBase || appState.photo,
                                logo: logoBase || appState.logo,
                                validFrom: moment(validFrom).toISOString(),
                            });

                            setStep("home");
                        }}
                    >
                        Uložit
                    </Button>
                </VStack>
            </Box>
        </VStack>
    );
}
