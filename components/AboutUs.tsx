import { Box, Container, Image, HStack, Heading, Stack, VStack, Text, SimpleGrid, Center } from "@chakra-ui/react"
import CTA from "./CTA"

export default function AboutUs() : JSX.Element {

  const InfoCard = ({src, alt, title}:{src: string, alt: string, title: string}) : JSX.Element => {
    return(
      <HStack>
        <Box d="flex" bgColor="#D5EFF8" borderRadius="3xl" borderColor="gray.300" borderWidth="thin" p="2" w={{base: "32", md: "32"}} h="32">
          <Image src={src} alt={alt}/>
        </Box>
        <Heading fontSize={{base: "lg", md: "xl"}} fontWeight="light">{title}</Heading>
      </HStack>
    )
  }

  return(
    <Box pt={{ base: "8", md:"24"}}>
      <Container maxW="container.xl">
        <SimpleGrid columns={{base:1, md:2}}>
          <VStack spacing="6" pos="relative" alignItems={{ base: "center", md:"flex-start"}} textAlign={{ base: "center", md:"initial"}}>
            <Heading as="h1" fontSize={{base: "3xl", md:"3xl", lg: "4xl", xl:"5xl"}}>Sobre Nós</Heading>
            <Text fontSize={{base: "sm", sm:"md", md: "lg"}}>
              A nossa missão é simples: reunir todos os bens em leilão eletrónico no território português e trazê-los aos nossos utilizadores.
            </Text>
            <Text fontSize={{base: "sm", sm:"md", md: "lg"}}>
              Aqui pode encontrar facilmente imóveis, veículos, equipamento e mobiliário de várias entidades certificadas.
            </Text>
            <CTA text="Pesquise agora"/>
          </VStack>
          <Box ml={{base: "initial", md: "10"}} mt={{base: "10", md: "initial"}}>
            <VStack alignItems="flex-start" maxW="fit-content" m="auto">
              <InfoCard src="/search-engine.svg" alt="real state agent" title="Pesquisa centralizada" />
              <InfoCard src="/mobile.svg" alt="real state agent" title="Site responsivo" />
              <InfoCard src="/decision.svg" alt="real state agent" title="Decisão informada" />
            </VStack>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  )
}