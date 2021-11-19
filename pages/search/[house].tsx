import { Box, Container, Image, HStack, Heading } from "@chakra-ui/react"
import Link from "next/link"

export default function House() : JSX.Element {
  return(
    <Box>
      <Container maxW="container.xl">
        <HStack spacing="10">
          <Heading> Lica sumbuudu</Heading>
        </HStack>
      </Container>
    </Box>
  )
}