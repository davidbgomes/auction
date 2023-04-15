import {
  Box,
  Container,
  Image,
  HStack,
  Heading,
  Stack,
  VStack,
  Text,
  SimpleGrid,
  Center,
  Icon,
} from "@chakra-ui/react";
import CTA from "./CTA";

export default function OurServices() {
  return (
    <Box pt={{ base: "20", md: "48" }} pb={"16"}>
      <Container maxW="container.xl">
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          alignItems={"center"}
          gap={"12"}
        >
          <VStack spacing="10">
            <Heading
              as="h2"
              fontSize={{ base: "3xl", md: "3xl", lg: "4xl", xl: "5xl" }}
            >
              Os Nossos Serviços
            </Heading>
            <VStack spacing="4" maxW="container.lg">
              <Text
                as="p"
                fontSize={{ base: "sm", sm: "md", md: "lg" }}
                textAlign="justify"
              >
                Atualmente apresentamos um serviço de pesquisa de leilões
                eletrónicos de imóveis, e estamos apostados em apresentar o
                melhor motor de busca do setor.
              </Text>
              <Text
                as="p"
                fontSize={{ base: "sm", sm: "md", md: "lg" }}
                textAlign="justify"
              >
                A nossa ambição é apresentar todos os leilões de diversas
                categorias e apresentá-los da forma que os nossos utilizadores
                desejam, com grande facilidade de pesquisa e usabilidade que
                permite a qualquer pessoa aceder esta informação.
              </Text>
              <Text
                as="p"
                fontSize={{ base: "sm", sm: "md", md: "lg" }}
                textAlign="justify"
              >
                Estamos a trabalhar no sentido de ampliar a nossa base de dados
                para além de Leilões de casas e moradias, e em breve teremos um
                leque vasto de bens que poderá analisar aqui no leiloou.pt
              </Text>
            </VStack>
            <CTA text="Pesquise Imóveis" />
          </VStack>
          <Image
            src="/our_services.svg"
            alt="search app"
            boxSize={{ base: "80", md: "initial" }}
            mx="auto"
            loading="eager"
            ignoreFallback
          />
        </SimpleGrid>
      </Container>
    </Box>
  );
}
