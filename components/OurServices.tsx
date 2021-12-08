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
    <Box pt={{ base: "8", md: "32" }}>
      <Container maxW="container.xl">
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
              eletrónicos de imóveis, e estamos apostados em apresentar o melhor
              motor de busca do setor.
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
              leque vasto de bens, das mais variadas naturezas, que poderá
              analisar aqui no Leiloou.pt
            </Text>
          </VStack>
          <CTA text="Pesquise Imóveis" />
        </VStack>
      </Container>
    </Box>
  );
}
