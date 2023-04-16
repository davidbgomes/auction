import {
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
} from "@chakra-ui/layout";
import { ListItem, UnorderedList, Image } from "@chakra-ui/react";
import Head from "next/head";

export default function AboutUs(): JSX.Element {
  return (
    <>
      <Head>
        <title>Leiloou - Sobre Nós</title>
      </Head>
      <Container maxW="container.xl" my="12">
        <VStack spacing={"16"}>
          <VStack spacing="1">
            <Heading
              fontSize={{
                base: "2xl",
                sm: "3xl",
                md: "4xl",
                lg: "5xl",
              }}
            >
              Sobre Nós
            </Heading>
            <Heading
              fontSize={{ base: "sm", md: "lg" }}
              fontWeight="light"
              textAlign={{ base: "center", md: "initial" }}
              color="gray.500"
            >
              Saiba mais sobre a nossa missão
            </Heading>
          </VStack>
          <VStack spacing={{ base: "10", md: "44" }}>
            <SimpleGrid
              columns={{ base: 1, md: 2 }}
              spacing={10}
              justifyItems="center"
            >
              <VStack spacing={{ base: 4, md: 10 }}>
                <Heading
                  fontSize={{
                    base: "xl",
                    md: "2xl",
                    lg: "3xl",
                  }}
                >
                  Juntámos as peças
                </Heading>
                <VStack spacing={4} alignItems="flex-start">
                  <Text
                    as="p"
                    fontSize={{ base: "sm", sm: "md", md: "lg" }}
                    textAlign="justify"
                  >
                    Com vários bens penhorados espalhados em diversos sites,
                    torna-se difícil encontrá-los, de forma rápida, fácil e
                    acessível.
                  </Text>
                  <Text
                    as="p"
                    fontSize={{ base: "sm", sm: "md", md: "lg" }}
                    textAlign="justify"
                  >
                    <b>É aqui que nós entramos.</b>
                  </Text>
                  <Text
                    as="p"
                    fontSize={{ base: "sm", sm: "md", md: "lg" }}
                    textAlign="justify"
                  >
                    Usamos tecnologia topo de gama para reunir os{" "}
                    <b>leilões eletrónicos de imóveis</b> existentes em
                    Portugal, e trazemos para o mesmo site, para sua comodidade.
                  </Text>
                  <Text
                    as="p"
                    fontSize={{ base: "sm", sm: "md", md: "lg" }}
                    textAlign="justify"
                  >
                    Atualmente temos uma{" "}
                    <b>
                      listagem bastante extensa de leilões eletrónicos ativos
                    </b>
                    , e estamos constantemente a trabalhar para incluir mais
                    leilões, mais funcionalidades, mais informação detalhada,
                    para tornar a sua vida mais fácil.{" "}
                    <b>Tudo isto sem qualquer custo!</b>
                  </Text>
                </VStack>
              </VStack>
              <Image
                src="/puzzle.svg"
                alt="Pessoas a montar peças de um puzzle"
                boxSize={{ base: "60", md: "initial" }}
              />
            </SimpleGrid>
            <SimpleGrid
              columns={{ base: 1, md: 2 }}
              spacing={10}
              justifyItems="center"
            >
              <Image
                src="/responsive.svg"
                alt="Telemóvel, desktop e portátil conectados ao mundo"
                boxSize={{ base: "60", md: "initial" }}
                order={{ base: 2, md: 1 }}
              />
              <VStack spacing={{ base: 4, md: 10 }} order={{ base: 1, md: 2 }}>
                <Heading
                  fontSize={{
                    base: "lg",
                    sm: "xl",
                    md: "2xl",
                    lg: "3xl",
                  }}
                >
                  Aceda a todos os Leilões
                </Heading>
                <VStack spacing={4}>
                  <Text
                    as="p"
                    fontSize={{ base: "sm", sm: "md", md: "lg" }}
                    textAlign="justify"
                  >
                    Já tentou pesquisar por{" "}
                    <b>leilões eletrónicos de casas ou moradias</b>, mas acabou
                    por desistir por não encontrar o que procurava, ou por ser
                    difícil acessar pelo seu <b>smartphone ou tablet</b>?
                  </Text>
                  <Text
                    as="p"
                    fontSize={{ base: "sm", sm: "md", md: "lg" }}
                    textAlign="justify"
                  >
                    Num mundo cada vez mais digitalizado, é essencial ter
                    informação na ponta dos dedos. Isso significa rápido acesso
                    em todos os dispositivos.
                  </Text>
                  <Text
                    as="p"
                    fontSize={{ base: "sm", sm: "md", md: "lg" }}
                    textAlign="justify"
                  >
                    <b>Pesquise agora no nosso site!</b> Temos as listagens dos
                    principais e-leilões de casas, e estamos constantemente a
                    aumentar o número de leilões abrangidos.
                  </Text>
                </VStack>
              </VStack>
            </SimpleGrid>
            <SimpleGrid
              columns={{ base: 1, md: 2 }}
              spacing={10}
              justifyItems="center"
            >
              <VStack spacing={{ base: 4, md: 10 }}>
                <Heading
                  fontSize={{
                    base: "lg",
                    sm: "xl",
                    md: "2xl",
                    lg: "3xl",
                  }}
                >
                  Decisão Informada
                </Heading>
                <VStack spacing={4} alignItems="flex-start">
                  <Text
                    as="p"
                    fontSize={{ base: "sm", sm: "md", md: "lg" }}
                    textAlign="justify"
                  >
                    <b>Comprar uma casa</b>, seja em leilão eletrónico, seja no
                    mercado imobiliário, é das decisões mais importantes e
                    difíceis das nossas vidas. Uma má avaliação, dificuldade na
                    procura, informação difícil de analisar, decisão tardia..
                    tudo pode influenciar pela negativa a nossa decisão, e
                    potencialmente deixar de fora aquele apartamento familiar de
                    sonho, ou aquela moradia de férias que sempre quis ter.
                  </Text>
                  <Text
                    as="p"
                    fontSize={{ base: "sm", sm: "md", md: "lg" }}
                    textAlign="justify"
                  >
                    Nós fazemos o nosso melhor para{" "}
                    <b>agregar os principais leilões penhorados em Portugal</b>,
                    e apresentá-lo da melhor forma possível, para que a parte da
                    decisão, que é feita por si, seja o mais informada e
                    facilitada possível.
                  </Text>
                  <Text
                    as="p"
                    fontSize={{ base: "sm", sm: "md", md: "lg" }}
                    textAlign="justify"
                  >
                    Pode pesquisar por diversos filtros, entre{" "}
                    <b>
                      cidades, conselhos, intervalo de preços, área do imóvel
                    </b>
                    .. tudo isto à distância de poucos cliques.
                  </Text>
                </VStack>
              </VStack>
              <Image
                src="/information.svg"
                alt="Homem tocando em vários paineis e gráficos digitais"
                boxSize={{ base: "60", md: "initial" }}
              />
            </SimpleGrid>
          </VStack>
        </VStack>
      </Container>
    </>
  );
}
