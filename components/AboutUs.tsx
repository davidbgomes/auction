import {
  Box,
  Container,
  Heading,
  VStack,
  Text,
  SimpleGrid,
  Icon,
  Divider,
  Stack,
  StackDivider,
  HStack,
} from "@chakra-ui/react";
import CTA from "./CTA";
import { IoRocketOutline } from "@react-icons/all-files/io5/IoRocketOutline";
import { IoBulbOutline } from "@react-icons/all-files/io5/IoBulbOutline";
import { IoSearchOutline } from "@react-icons/all-files/io5/IoSearchOutline";
import { IoFilterSharp } from "@react-icons/all-files/io5/IoFilterSharp";
import { IoInformationCircleOutline } from "@react-icons/all-files/io5/IoInformationCircleOutline";
import { BiHappyHeartEyes } from "@react-icons/all-files/bi/BiHappyHeartEyes";
import { LegacyRef, RefObject, useRef } from "react";
import { useIsVisible } from "@/utils/hooks/useIsVisible";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import { IconType } from "@react-icons/all-files";

const InfoCard = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: IconType;
}): JSX.Element => {
  return (
    <Box
      display="flex"
      alignItems="center"
      borderWidth={"thin"}
      boxShadow={"md"}
      borderRadius={"2xl"}
      padding={"4"}
      bgColor={"whiteAlpha.700"}
      maxW={"md"}
    >
      <VStack divider={<StackDivider />}>
        <HStack minW={"55%"} justifyContent={"flex-start"}>
          <Icon as={icon} w={6} h={6} mr="4" color="darkcyan" />
          <Heading fontSize={{ base: "xl", lg: "2xl" }} fontWeight="light">
            {title}
          </Heading>
        </HStack>
        <Text color={"gray.900"} fontSize={{ base: "xs", md: "sm" }}>
          {description}
        </Text>
      </VStack>
    </Box>
  );
};

const HighlightItem = ({
  value,
  description,
}: {
  value: number;
  description?: string;
}): JSX.Element => {
  return (
    <VStack spacing={0}>
      <Text color={"gray.900"} fontSize={{ base: "xl", md: "3xl" }}>
        +<CountUp end={value} />
      </Text>
      <Text
        color={"gray.600"}
        fontSize={{ base: "sm", md: "md" }}
        textAlign={"center"}
      >
        {description}
      </Text>
    </VStack>
  );
};

export default function AboutUs(): JSX.Element {
  return (
    <Box pt={{ base: "4", md: "20" }} bgColor={"gray.800"}>
      <VStack spacing={"24"}>
        <Container maxW="container.lg">
          <VStack
            spacing="6"
            pos="relative"
            alignItems={{ base: "center", md: "flex-start" }}
            textAlign={{ base: "center", md: "initial" }}
            mt={{ base: "10", md: "inherit" }}
            order={{ base: 2, md: 1 }}
            bgGradient={
              "linear(to top, #c4c5c7 0%, #dcdddf 52%, #ebebeb 100%);"
            }
            p={{ base: 3, md: 10 }}
            borderRadius={"lg"}
            boxShadow={"2xl"}
          >
            <Heading
              as="h2"
              fontSize={{ base: "3xl", lg: "4xl", xl: "5xl" }}
              color={"blackAlpha.700"}
            >
              A Nossa Missão
            </Heading>
            <Stack
              direction={{ base: "column", md: "row" }}
              spacing={"10"}
              divider={<StackDivider bgColor={"gray.900"} height="auto" />}
            >
              <VStack spacing={"8"} width={{ base: "initial", md: "80%" }}>
                <Text
                  fontSize={{ base: "sm", sm: "md", md: "lg" }}
                  textAlign="justify"
                  color={"gray.800"}
                >
                  A nossa missão é simples: reunir todos os bens em{" "}
                  <b>leilão eletrónico</b> no território português e trazê-los
                  aos nossos utilizadores. Para isso, usamos{" "}
                  <b>tecnologia de ponta</b> para recolher informação de várias
                  entidades de leilão eletrónico certificadas, e exibimos os
                  resultados no nosso site.
                </Text>
                <Text
                  fontSize={{ base: "sm", sm: "md", md: "lg" }}
                  textAlign="justify"
                  color={"gray.800"}
                >
                  Todos sabemos que os leilões eletrónicos são oportunidades de
                  negócio incríveis! Quer seja para comprar a sua primeira casa
                  por um preço <b>mais barato</b>, encontrar o seu próximo{" "}
                  <b>investimento imobiliário</b>, ou simplesmente comprar um
                  veículo por um preço imbatível, o nosso site providencia todas
                  as ferramentas para analisar que leilões existem no mercado, e
                  fazer uma decição mais informada.
                </Text>
                <Text
                  fontSize={{ base: "sm", sm: "md", md: "lg" }}
                  textAlign="justify"
                  color={"gray.800"}
                >
                  Os dias de sites de leilões dispersos e sem usabilidade
                  acabaram. Aqui pode encontrar facilmente{" "}
                  <b>e-leilões de apartamentos e moradias</b> de várias
                  entidades certificadas.
                </Text>
                <CTA text="Pesquise Já" />
              </VStack>
              <Stack
                direction={{ base: "row", md: "column" }}
                divider={<StackDivider bgColor={"gray.700"} />}
                justifyContent={"space-around"}
              >
                <HighlightItem value={700} description="casas em leilão" />
                <HighlightItem value={4} description="leiloeiras diferentes" />
                <HighlightItem
                  value={70000}
                  description="visualizações de leilões"
                />
              </Stack>
            </Stack>
          </VStack>
        </Container>
        <Box
          ml={{ base: "initial", md: "10" }}
          order={{ base: 1, md: 2 }}
          py={{ base: "10", md: "20" }}
          bgColor={"gray.200"}
          w="full"
        >
          <Container maxW="container.xl">
            <VStack
              alignItems="flex-start"
              maxW="fit-content"
              m="auto"
              spacing={9}
            >
              <Heading
                as="h2"
                fontSize={{ base: "3xl", lg: "4xl", xl: "5xl" }}
                w="full"
                textAlign="center"
              >
                Porquê nós?
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <InfoCard
                  title="Pesquisa centralizada"
                  description="Poupe tempo na sua pesquisa! O nosso site junta as listagens 
                  dos principais leilões de casa e apartamento para que você só se preocupe
                   em encontrar o leilão perfeito."
                  icon={IoSearchOutline}
                />
                <InfoCard
                  title="Filtros avançados"
                  description="Usamos poderosos filtros que permitem afunilar a sua pesquisa por cidade, 
                  concelho, freguesia, intervalo de preço, assoalhadas e muito mais. Tudo para encontrar o 
                  leilão perfeito para as suas necessidades!"
                  icon={IoFilterSharp}
                />
                <InfoCard
                  title="Informação detalhada"
                  description="A nossa plataforma disponibiliza informação completa de cada propriedade, 
                    como imagens do bem em leilão, diversos valores de licitação, mapa e informação sobre a localização,
                     descrição da habitação, entre outras."
                  icon={IoInformationCircleOutline}
                />
                <InfoCard
                  title="Site intuitivo"
                  description="Muitos sites de leilões são antigos e com pouca usabilidade em dispositivos mais pequenos.
                  Com o nosso site pesquise estes mesmos leilões no telemóvel, tablet ou computador com o mesmo conforto e intuitividade!"
                  icon={BiHappyHeartEyes}
                />
                <InfoCard
                  title="Decisão informada"
                  description="Licitar num leilão é uma decisão importante que deve ser tomada com
                  toda a informação possível ao nosso dispôr. Fazemos a nossa parte ao tentar aglomerar o máximo
                  de leilões possível, para que possa comparar e tomar a melhor decisão."
                  icon={IoBulbOutline}
                />
                <InfoCard
                  title="Navegação rápida"
                  description="O nosso site é feito com tecnologia de ponta, o que se traduz em velocidade
                   super rápida de navegação, acesso em qualquer dispositivo e pesquisa fácil e intuitiva.
                   Vai encontrar o seu leilão eletrónico em tempo record!"
                  icon={IoRocketOutline}
                />
              </SimpleGrid>
            </VStack>
          </Container>
        </Box>
      </VStack>
    </Box>
  );
}
