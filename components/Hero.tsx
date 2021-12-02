import { Box, Container, Image, HStack, Heading, Stack, VStack, Text } from "@chakra-ui/react"
import CTA from "./CTA"

export default function Hero() : JSX.Element {
  return(
    <>
      <Box className="css-selector" transform="skewY(-3deg)" pos="absolute" w="100%" h="600px"></Box>
      <Box pt={{ base: "8", md:"24"}}>
        <Container maxW="container.xl">
          <Stack spacing="10" direction={{ base: "column", md:"row"}} alignItems={{ base: "center", md:"flex-start"}} justifyContent="space-around">
            <VStack order={{ base:2 , md:1}} spacing="6" mt="10" pos="relative" alignItems={{ base: "center", md:"flex-start"}} textAlign={{ base: "center", md:"initial"}}>
              <Heading as="h1" fontSize={{base: "3xl", sm:"4xl", md:"5xl", lg: "6xl", xl:"7xl"}}>Todos os Leilões<br/>num só lugar</Heading>
              <Text fontSize={{base: "md", md: "xl"}}>Todos os bens em leilão eletrónico em Portugal.</Text>
              <CTA text="Pesquise agora"/>
            </VStack>
            <Image order={{ base:1 , md:2}} src="/realState.svg" alt="real state agent" boxSize={{base: "52", lg: "initial"}} mx="auto" zIndex={1}/>
          </Stack>
        </Container>
      </Box>
    </>
  )
}