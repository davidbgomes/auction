import {
  Box,
  List,
  ListItem,
  Stack,
  Text,
  VStack,
  Container,
  Heading,
} from "@chakra-ui/layout";
import Link from "next/link";

export default function Footer(): JSX.Element {
  return (
    <Box py="10" px="4" boxShadow="inner" mt="20">
      <Container maxWidth="container.xl">
        <VStack alignItems="center" spacing={{ base: 5, md: 2 }}>
          <Stack
            direction={{ base: "column", md: "row" }}
            width={{ base: "initial", md: "full" }}
            justifyContent={{ base: "initial", md: "space-around" }}
            spacing={{ base: 6, md: 1 }}
          >
            <VStack
              maxW="56"
              spacing={{ base: 3, md: 6 }}
              alignItems="flex-start"
            >
              <Heading as="h3" fontSize="3xl" fontWeight="medium">
                Leiloou
              </Heading>
              <VStack spacing={6}>
                <List fontSize={{ base: "15px", sm: "md" }}>
                  <ListItem _hover={{ textDecoration: "underline" }}>
                    <Link href="/terms" passHref>
                      <a>Termos & Condições</a>
                    </Link>
                  </ListItem>
                  <ListItem _hover={{ textDecoration: "underline" }}>
                    <Link href="/privacy" passHref>
                      <a>Política de Privacidade</a>
                    </Link>
                  </ListItem>
                </List>
              </VStack>
            </VStack>
            <VStack
              maxW="72"
              spacing={{ base: 3, md: 6 }}
              alignItems="flex-start"
            >
              <Heading
                as="h3"
                fontSize={{ base: "2xl", md: "3xl" }}
                fontWeight="medium"
              >
                Pesquise connosco
              </Heading>
              <Text as="p">
                Trazemos o melhor e mais rápido motor de busca de leilões em
                território nacional.
              </Text>
            </VStack>
          </Stack>
          <Box textAlign="center">
            <Text as="p">Todos os direitos reservados.</Text>
            <Text as="p">Leiloou.pt | 2021</Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
