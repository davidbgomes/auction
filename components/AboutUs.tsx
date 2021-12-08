import {
  Box,
  Container,
  Heading,
  VStack,
  Text,
  SimpleGrid,
  Icon,
} from "@chakra-ui/react";
import CTA from "./CTA";
import { AiOutlineCheck } from "react-icons/ai";

export default function AboutUs(): JSX.Element {
  const InfoCard = ({ title }: { title: string }): JSX.Element => {
    return (
      <Box d="flex" alignItems="center">
        <Icon as={AiOutlineCheck} w={6} h={6} mr="4" />
        <Heading
          fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
          fontWeight="light"
        >
          {title}
        </Heading>
      </Box>
    );
  };

  return (
    <Box pt={{ base: "8", md: "24" }}>
      <Container maxW="container.xl">
        <SimpleGrid columns={{ base: 1, md: 2 }}>
          <VStack
            spacing="6"
            pos="relative"
            alignItems={{ base: "center", md: "flex-start" }}
            textAlign={{ base: "center", md: "initial" }}
            mt={{ base: "10", md: "inherit" }}
            order={{ base: 2, md: 1 }}
          >
            <Heading
              as="h2"
              fontSize={{ base: "3xl", md: "3xl", lg: "4xl", xl: "5xl" }}
            >
              Sobre Nós
            </Heading>
            <Text
              fontSize={{ base: "sm", sm: "md", md: "lg" }}
              textAlign="justify"
            >
              A nossa missão é simples: reunir todos os bens em{" "}
              <b>leilão eletrónico</b> no território português e trazê-los aos
              nossos utilizadores. Para isso, usamos <b>tecnologia de ponta</b>{" "}
              para recolher informação de várias entidades de leilão eletrónico
              certificadas, e exibimos os resultados no nosso site.
            </Text>
            <Text
              fontSize={{ base: "sm", sm: "md", md: "lg" }}
              textAlign="justify"
            >
              Todos sabemos que os leilões eletrónicos são oportunidades de
              negócio incríveis! Quer seja para comprar a sua primeira casa por
              um preço <b>mais barato</b>, encontrar o seu próximo{" "}
              <b>investimento imobiliário</b>, ou simplesmente comprar um
              veículo por um preço imbatível, o nosso site providencia todas as
              ferramentas para analisar que leilões existem no mercado, e fazer
              uma decição mais informada.
            </Text>
            <Text
              fontSize={{ base: "sm", sm: "md", md: "lg" }}
              textAlign="justify"
            >
              Os dias de sites de leilões dispersos e sem usabilidade acabaram.
              Aqui pode encontrar facilmente{" "}
              <b>imóveis, veículos, equipamento e mobiliário</b> de várias
              entidades certificadas.
            </Text>
            <CTA text="Pesquise Já" />
          </VStack>
          <Box ml={{ base: "initial", md: "10" }} order={{ base: 1, md: 2 }}>
            <VStack
              alignItems="flex-start"
              maxW="fit-content"
              m="auto"
              spacing={8}
            >
              <Heading
                as="h2"
                fontSize={{ base: "3xl", md: "3xl", lg: "4xl", xl: "5xl" }}
                w="full"
                textAlign="center"
              >
                Vantagens
              </Heading>
              <InfoCard title="Pesquisa centralizada" />
              <InfoCard title="Site responsivo" />
              <InfoCard title="Decisão informada" />
              <InfoCard title="Excelente experiência de utilizador" />
              <InfoCard title="Navegação rápida" />
              <InfoCard title="Filtre por várias categorias" />
            </VStack>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
