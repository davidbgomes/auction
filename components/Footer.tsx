import {
  Box,
  List,
  ListItem,
  Stack,
  Text,
  VStack,
  Container,
  Heading,
} from '@chakra-ui/layout';
import Link from 'next/link';

export default function Footer(): JSX.Element {
  return (
    <Box py="10" px="4" boxShadow="inner" mt="20">
      <Container maxWidth="container.xl">
        <VStack
          alignItems="center"
        >
          <Stack
            direction={{ base: 'column', md: 'row' }}
            width={{ base: 'initial', md: 'full' }}
            justifyContent={{ base: 'initial', md: 'space-around' }}
          >
            <VStack maxW="56" spacing={6} alignItems="flex-start">
              <Heading as="h3" fontSize="3xl" fontWeight="medium">
                Leiloo
              </Heading>
              <Text as="p">
                Application Online LTD 20-22, Wenlock Road, London, England, N1 7GU
              </Text>
              <VStack spacing={6}>
                <List fontSize={{ base: '15px', sm: 'md' }}>
                  <ListItem _hover={{ textDecoration: 'underline' }}>
                    <Link href="/terms" passHref>
                      <a>Termos & Condições</a>
                    </Link>
                  </ListItem>
                  <ListItem _hover={{ textDecoration: 'underline' }}>
                    <Link href="/privacy" passHref>
                      <a>Política de Privacidade</a>
                    </Link>
                  </ListItem>
                </List>
              </VStack>
            </VStack>
            <VStack spacing={6} alignItems="flex-start">
              <Heading as="h3" fontSize="3xl" fontWeight="medium">
                Contact us
              </Heading>
              <Text as="p">
                Contact
              </Text>
            </VStack>
          </Stack>
          <Text as="p">
            All rights reserved © Your Company Formations Ltd 2021
          </Text>
        </VStack>
      </Container>
    </Box>
  );
}
