import {
  Box,
  Container,
  Heading,
  Stack,
  VStack,
  Text,
  Image,
} from "@chakra-ui/react";
import CTA from "./CTA";

export default function Hero(): JSX.Element {
  return (
    <>
      <Box
        className="css-selector"
        transform="skewY(-3deg)"
        pos="absolute"
        w="100%"
        h={{ base: "550px", md: "500px" }}
        mt={{ base: "initial", md: "10" }}
      ></Box>
      <Box pt={{ base: "0", md: "24" }}>
        <Container maxW="container.xl">
          <Stack
            spacing="10"
            direction={{ base: "column", md: "row" }}
            alignItems={{ base: "center", md: "flex-start" }}
            justifyContent="space-around"
          >
            <VStack
              order={{ base: 2, md: 1 }}
              spacing="6"
              mt="10"
              pos="relative"
              alignItems={{ base: "center", md: "flex-start" }}
              textAlign={{ base: "center", md: "initial" }}
            >
              <Heading
                as="h1"
                fontSize={{
                  base: "3xl",
                  sm: "4xl",
                  md: "5xl",
                  lg: "6xl",
                  xl: "7xl",
                }}
              >
                Todos os Leilões,
                <br />
                um só lugar
              </Heading>
              <Text fontSize={{ base: "md", md: "xl" }}>
                Pesquise todos os bens em leilões eletrónicos de Portugal.
              </Text>
              <CTA text="Pesquise agora" />
            </VStack>
            <Image
              order={{ base: 1, md: 2 }}
              src="/realState.svg"
              alt="real state agent"
              boxSize={{ base: "52", lg: "initial" }}
              mx="auto"
              zIndex={1}
              loading="eager"
              ignoreFallback
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
}
