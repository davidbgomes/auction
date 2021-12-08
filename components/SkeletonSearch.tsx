import {
  Box,
  Container,
  Grid,
  GridItem,
  SimpleGrid,
  Button,
  HStack,
} from "@chakra-ui/react";
import { Skeleton, SkeletonText } from "@chakra-ui/react";

export default function SkeletonSearch(): JSX.Element {
  return (
    <Container maxW="container.xl">
      <Grid
        templateRows="repeat(2, 1fr)"
        templateColumns=" 240px repeat(4, 1fr)"
        gap={4}
      >
        <GridItem
          rowSpan={2}
          colSpan={1}
          display={{ base: "none", lg: "initial" }}
        >
          <Box
            py="20"
            px="6"
            borderRadius="xl"
            borderWidth="thin"
            boxShadow="md"
          >
            <SkeletonText mt="4" noOfLines={6} spacing="20" />
            <HStack pt="20" spacing="4">
              <Button isDisabled bgColor="gray.100">
                Limpar
              </Button>
              <Button isDisabled bgColor="gray.200">
                Filtrar
              </Button>
            </HStack>
          </Box>
        </GridItem>
        <GridItem rowSpan={3} colSpan={{ base: 5, lg: 4 }}>
          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            spacing={5}
            justifyItems="center"
          >
            {Array.from(new Array(4), (_, i) => {
              return (
                <Box
                  key={i}
                  padding="6"
                  boxShadow="lg"
                  bg="white"
                  borderRadius="lg"
                  w="md"
                  maxW={{ base: "300px", lg: "410px" }}
                >
                  <Skeleton height="300px" />
                  <SkeletonText mt="4" noOfLines={8} spacing="5" />
                </Box>
              );
            })}
          </SimpleGrid>
        </GridItem>
      </Grid>
    </Container>
  );
}
