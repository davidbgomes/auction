import { Box, Container, Heading, VStack, SimpleGrid } from "@chakra-ui/react";
import Link from "next/link";

const DistrictCard = ({
  label,
  value,
  liveAuctions,
  image,
}: {
  label: string;
  value: number;
  liveAuctions: number;
  image: string;
}): JSX.Element => {
  return (
    <Link
      href={{
        pathname: "/search",
        query: { district: value },
      }}
      passHref
    >
      <a>
        <Box
          boxShadow="lg"
          h={{ base: "150px", md: "200px" }}
          w={{ base: "40vw", sm: "220px", md: "300px" }}
          bg="white"
          borderColor="gray.400"
          borderRadius="xl"
          bgImage={`${image}`}
          bgSize="cover"
          position="relative"
          _hover={{ boxShadow: "5px 5px 17px 5px rgba(0,0,0,0.59)" }}
          transition="0.3s ease-out"
        >
          <Box p="6">
            <Heading
              fontSize={{ base: "lg", md: "xl" }}
              fontWeight="medium"
              position="absolute"
              bottom="0"
              mb="-15px"
              ml="-5px"
              bgColor="white"
              borderColor="#00000057"
              borderWidth="thin"
              p="1"
              boxShadow="md"
              color="black"
              borderRadius="md"
            >
              {label}
            </Heading>
          </Box>
        </Box>
      </a>
    </Link>
  );
};

export default function Explore(): JSX.Element {
  return (
    <>
      <Box pt={{ base: "24", md: "52" }} pb="20" bgColor="gray.100">
        <Container maxW="container.xl" borderColor="gray.300">
          <VStack
            order={{ base: 2, md: 1 }}
            spacing="6"
            mt="10"
            pos="relative"
            textAlign={{ base: "center", md: "initial" }}
          >
            <Heading
              as="h2"
              fontSize={{ base: "3xl", md: "3xl", lg: "4xl", xl: "5xl" }}
              mb="5"
            >
              Principais Cidades
            </Heading>
            <SimpleGrid
              columns={{ base: 2, lg: 3 }}
              gap={{ base: "6", md: "12" }}
            >
              <DistrictCard
                label="Lisboa"
                value={11}
                liveAuctions={200}
                image="/lisbon.webp"
              />
              <DistrictCard
                label="Porto"
                value={13}
                liveAuctions={200}
                image="/porto.webp"
              />
              <DistrictCard
                label="Setúbal"
                value={15}
                liveAuctions={200}
                image="/setubal.webp"
              />
              <DistrictCard
                label="Braga"
                value={3}
                liveAuctions={200}
                image="/braga.webp"
              />
              <DistrictCard
                label="Aveiro"
                value={1}
                liveAuctions={200}
                image="/aveiro.webp"
              />
              <DistrictCard
                label="Faro"
                value={8}
                liveAuctions={200}
                image="/faro.webp"
              />
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>
    </>
  );
}
