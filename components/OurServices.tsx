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
                fontSize={{ base: "xs", sm: "md", md: "lg" }}
                textAlign="justify"
              >
                O nosso site é paragem obrigatória para quem pesquisa por
                leilões eletrónicos de casas no mercado português.
              </Text>
              <Text
                as="p"
                fontSize={{ base: "xs", sm: "md", md: "lg" }}
                textAlign="justify"
              >
                Somos um agregador completo de e-leilões listados em diversas
                leiloeiras oficiais, com centenas de imóveis por todo o país
                disponíveis para serem comprados. Fazemos de intemediário entre
                si, o comprador, e a leiloeira oficial onde poderá licitar e
                comprar o bem em leilão.
              </Text>
              <Text
                as="p"
                fontSize={{ base: "xs", sm: "md", md: "lg" }}
                textAlign="justify"
              >
                A nossa base de dados aumenta de dia para dia! Neste momento
                temos as listagens das principais leiloeiras do mercado que pode
                pesquisar com os nossos filtros avançados e limitar a sua busca
                ao que realmente pretende.
              </Text>
              <Text
                as="p"
                fontSize={{ base: "xs", sm: "md", md: "lg" }}
                textAlign="justify"
              >
                Se deseja licitar num leilão de moradia ou leilão de
                apartamento, use o nosso motor de busca para encontrá-lo de
                forma rápida e intuitiva o que de outra forma se encontra
                espalhado por diversos sites difíceis de usar.
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
