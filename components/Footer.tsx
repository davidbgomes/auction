import {
  Box,
  List,
  ListItem,
  Stack,
  Text,
  VStack,
  Container,
  Heading,
  HStack,
} from "@chakra-ui/layout";
import { Button, Image } from "@chakra-ui/react";
import dayjs from "dayjs";
import Link from "next/link";

export default function Footer(): JSX.Element {
  return (
    <Box
      py="10"
      px="4"
      boxShadow="inner"
      bgColor={"blackAlpha.900"}
      color="white"
    >
      <Container maxWidth="container.xl">
        <VStack alignItems="center" spacing={{ base: 5, md: 3 }}>
          <Stack
            direction={{ base: "column", md: "row" }}
            width={{ base: "initial", md: "full" }}
            justifyContent={{ base: "initial", md: "space-around" }}
            spacing={{ base: 6, md: 1 }}
            alignItems={{ base: "center", md: "flex-start" }}
          >
            <VStack
              maxW="56"
              spacing={{ base: 3, md: 6 }}
              alignItems={{ base: "center", md: "flex-start" }}
            >
              <Heading
                as="h3"
                fontSize={{ base: "3xl", md: "4xl" }}
                fontWeight="medium"
              >
                Leiloou.pt
              </Heading>
              <VStack spacing={6}>
                <List fontSize={{ base: "15px", sm: "md" }}>
                  <ListItem _hover={{ textDecoration: "underline" }}>
                    <Link href="/terms" passHref legacyBehavior>
                      <a>&bull; Termos & Condições</a>
                    </Link>
                  </ListItem>
                  <ListItem _hover={{ textDecoration: "underline" }}>
                    <Link href="/privacy" passHref legacyBehavior>
                      <a>&bull; Política de Privacidade</a>
                    </Link>
                  </ListItem>
                  <ListItem _hover={{ textDecoration: "underline" }}>
                    <Link href="/faq" passHref legacyBehavior>
                      <a>&bull; FAQ&apos;s</a>
                    </Link>
                  </ListItem>
                </List>
              </VStack>
            </VStack>
            <VStack
              maxW="56"
              spacing={{ base: 3, md: 6 }}
              alignItems={{ base: "center", md: "flex-start" }}
            >
              <Heading
                as="h3"
                fontSize={{ base: "xl", md: "2xl" }}
                fontWeight="medium"
              >
                Pesquise connosco
              </Heading>
              <Text
                as="p"
                fontSize="sm"
                textAlign={{ base: "center", md: "left" }}
              >
                Trazemos o melhor e mais rápido motor de busca de leilões em
                território nacional.
              </Text>
            </VStack>
          </Stack>
          <a
            href="https://www.buymeacoffee.com/leiloou"
            target="_blank"
            rel="noreferrer"
          >
            <Button
              color="white"
              borderRadius="full"
              bgGradient="linear(to-br, blue.600, blue.500)"
              transition={"all .3s ease"}
              _hover={{
                bgGradient: "linear(to-br, blue.200, blue.300)",
              }}
            >
              <HStack alignItems="center">
                <Image src="/buymeacoffee.svg" w="5" alt="" />
                <Text fontSize="sm" fontWeight={600}>
                  Compre-me um café
                </Text>
              </HStack>
            </Button>
          </a>
          <Box textAlign="center">
            <Text as="p">Todos os direitos reservados.</Text>
            <Text as="p">Leiloou.pt | {dayjs().year()}</Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
