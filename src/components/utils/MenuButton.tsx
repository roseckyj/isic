import { IconButton, Text, VStack } from "@chakra-ui/react";

export function MenuButton({
    label,
    icon,
    selected,
}: {
    label: string;
    icon: string;
    selected?: boolean;
}) {
    return (
        <VStack flex={1} color={selected ? "#41c2bd" : "#666666"}>
            <IconButton
                aria-label="Show code"
                icon={<img src={icon} alt={label} />}
                bg={selected ? "#d1edee" : "white"}
                rounded="full"
                px={6}
            />
            <Text fontSize="smaller">{label}</Text>
        </VStack>
    );
}