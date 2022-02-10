import {
  Box,
  Container,
  Grid,
  GridItem,
  Button,
  Divider,
} from "@chakra-ui/react";
import { Skeleton, SkeletonText } from "@chakra-ui/react";

export default function SkeletonHouse(): JSX.Element {
  return (
    <Container maxW="container.xl" py="2">
      <Grid
        templateRows={{
          base: `1fr 1fr 450px 450px 30px`,
          lg: "500px 1fr 50px",
        }}
        templateColumns="repeat(4, 1fr)"
        gap={4}
      >
        <GridItem
          rowSpan={{ base: 2, lg: 3 }}
          colSpan={{ base: 4, lg: 3 }}
          boxShadow="0px 0px 11px -6px rgba(0,0,0,0.8)"
          borderRadius="sm"
          pb="10"
        >
          <Skeleton height="400px" />
          <Box mt="20" px="10">
            <SkeletonText noOfLines={4} spacing="5" />
            <SkeletonText noOfLines={8} spacing="5" mt="10" />
          </Box>
        </GridItem>
        <GridItem
          rowSpan={1}
          colSpan={{ base: 4, lg: 1 }}
          boxShadow="0px 0px 11px -6px rgba(0,0,0,0.8)"
          borderRadius="md"
          pos="relative"
        >
          <SkeletonText m="4" noOfLines={1} />
          <Divider />
          <Box
            mt="8"
            spacing="7"
            alignItems="flex-start"
            mx={{ base: "4", lg: "1", xl: "7" }}
            px="4"
          >
            <SkeletonText mt="4" noOfLines={7} spacing="10" />
          </Box>
          <Box
            d="flex"
            pos="absolute"
            bottom="0"
            bgColor="#efefef"
            w="full"
            height="70px"
            alignItems="center"
            justifyContent="center"
          >
            <SkeletonText mt="4" noOfLines={1} />
          </Box>
        </GridItem>
        <GridItem
          rowSpan={1}
          colSpan={{ base: 4, lg: 1 }}
          boxShadow="0px 0px 11px -6px rgba(0,0,0,0.8)"
          borderRadius="md"
        >
          <SkeletonText my="4" px="4" noOfLines={1} />
          <Divider />
          <Skeleton height="200px" />
          <SkeletonText mt="4" noOfLines={3} spacing="2" p="5" />
        </GridItem>
        <GridItem rowSpan={1} colSpan={{ base: 4, lg: 1 }}>
          <Button
            bgColor="gray.100"
            px="14"
            py="4"
            borderRadius="md"
            fontSize={{ base: "base", md: "xl" }}
            fontWeight="thin"
            w="full"
            isDisabled
          >
            Ver Leilão
          </Button>
        </GridItem>
      </Grid>
    </Container>
  );
}
