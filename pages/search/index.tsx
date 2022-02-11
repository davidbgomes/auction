import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Button,
  Heading,
  Center,
  Text,
  Grid,
  GridItem,
  SimpleGrid,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Spinner,
  useMediaQuery,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";

const SkeletonSearch = dynamic(() => import("@/components/SkeletonSearch"));
import Navigation from "@/components/Navigation";
import useSWRInfinite from "swr/infinite";
import { fetcher } from "@/utils/helpers";
import InfiniteScroll from "react-infinite-scroll-component";
import Head from "next/head";
import { useRouter } from "next/router";
import { AuctionCard, AuctionCardType } from "@/components/AuctionCard";

const PAGE_SIZE = 8;
const ENV = process.env.NEXT_PUBLIC_ENV;
const API_PATH = ENV === "development" ? "/api" : "/.netlify/functions";
const PREFETCH_PATH =
  ENV === "development"
    ? "/api/houses"
    : "https://determined-villani-81a550.netlify.app/.netlify/functions/houses";

export default function Search(): JSX.Element {
  const router = useRouter();
  const [endpoint, setEndpoint] = useState<string>(`${API_PATH}/houses`);
  const [resultSize, setResultSize] = useState<number>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");
  const queryString = router.asPath.substring(router.asPath.indexOf("?"));

  useEffect(() => {
    const resultSizeParams = new URLSearchParams(queryString);
    resultSizeParams.append("count", "true");
    const getResultSize = async () => {
      const housesSize: number = await fetch(
        `${API_PATH}/houses?${resultSizeParams}`
      ).then((res) => res.json());
      setResultSize(housesSize);
    };
    getResultSize();
  }, [queryString]);

  const {
    district: defaultDistrict,
    county: defaultCounty,
    parish: defaultParish,
    minPrice: defaultMinPrice,
    maxPrice: defaultMaxPrice,
    minArea: defaultMinArea,
    maxArea: defaultMaxArea,
    houseType: defaultHouseType,
    typology: defaultTypology,
    orderBy: defaultOrderBy,
  } = router.query;
  const houseTypeArray = (defaultHouseType as string)?.split(",");
  const typologyArray = (defaultTypology as string)?.split(",");

  // A function to get the SWR key of each page
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) {
      return null; // reached the end
    }
    const params = new URLSearchParams(queryString);
    params.append("page", (pageIndex + 1).toString());
    params.append("limit", PAGE_SIZE.toString());
    return `${endpoint}?${params.toString()}`;
  };

  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher);

  if (!data || error) {
    return <SkeletonSearch />;
  }
  const houses: AuctionCardType[] = data ? [].concat(...data) : [];
  const hasFinished =
    houses.length < PAGE_SIZE || data[data.length - 1].length < PAGE_SIZE;

  return (
    <>
      <Head>
        <title>Leiloou - Imóveis</title>
        <meta
          name="description"
          content="Leiloou - Imóveis em Leilão Eletrónico"
        />
        <link
          rel="preload"
          href={PREFETCH_PATH}
          as="fetch"
          crossOrigin="anonymous"
        ></link>
      </Head>
      <Box>
        <Container maxW="container.xl" py="6">
          <Grid
            templateRows="repeat(2, 1fr)"
            templateColumns=" 240px repeat(4, 1fr)"
            gap={4}
          >
            {!isSmallerThan768 && (
              <GridItem rowSpan={2} colSpan={1}>
                <Navigation
                  defaultDistrict={defaultDistrict as string}
                  defaultCounty={defaultCounty as string}
                  defaultParish={defaultParish as string}
                  defaultMinPrice={defaultMinPrice as string}
                  defaultMaxPrice={defaultMaxPrice as string}
                  defaultMinArea={defaultMinArea as string}
                  defaultMaxArea={defaultMaxArea as string}
                  defaultHouseType={houseTypeArray}
                  defaultTypology={typologyArray}
                  defaultOrderBy={defaultOrderBy as string}
                  endpoint={endpoint}
                  setEndpoint={setEndpoint}
                />
              </GridItem>
            )}
            <GridItem rowSpan={3} colSpan={{ base: 5, md: 4 }}>
              <Center mb="4" d={{ base: "flex", md: "none" }}>
                <Button
                  onClick={onOpen}
                  borderRadius="xl"
                  colorScheme="green"
                  width="56"
                >
                  Filtros
                </Button>
              </Center>
              {isSmallerThan768 && (
                <Drawer
                  placement="top"
                  onClose={onClose}
                  isOpen={isOpen}
                  size="full"
                >
                  <DrawerOverlay />
                  <DrawerContent>
                    <DrawerHeader
                      borderBottomWidth="1px"
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Heading size="md">Filtros</Heading>
                      <DrawerCloseButton />
                    </DrawerHeader>
                    <DrawerBody>
                      <Navigation
                        defaultDistrict={defaultDistrict as string}
                        defaultCounty={defaultCounty as string}
                        defaultParish={defaultParish as string}
                        defaultMinPrice={defaultMinPrice as string}
                        defaultMaxPrice={defaultMaxPrice as string}
                        defaultMinArea={defaultMinArea as string}
                        defaultMaxArea={defaultMaxArea as string}
                        defaultHouseType={houseTypeArray as string[]}
                        defaultTypology={typologyArray}
                        defaultOrderBy={defaultOrderBy as string}
                        endpoint={endpoint}
                        setEndpoint={setEndpoint}
                        closeDrawer={onClose}
                      />
                    </DrawerBody>
                  </DrawerContent>
                </Drawer>
              )}
              <Heading
                as="h1"
                fontWeight="normal"
                fontSize={{ base: "lg", md: "xl" }}
                mb="2"
                mr={{ base: "2", md: "12" }}
                fontStyle="italic"
                textAlign="right"
              >
                <b>{resultSize}</b> casas encontradas
              </Heading>
              <InfiniteScroll
                dataLength={houses.length}
                next={() => setSize(size + 1)}
                hasMore={!hasFinished}
                loader={
                  <Center w="min-content" m="auto" py="4">
                    <Spinner
                      color="green.500"
                      emptyColor="gray.300"
                      size="lg"
                    />
                  </Center>
                }
                endMessage={
                  <Text mt="10" fontStyle="italic" textAlign="center">
                    Não existem mais casas com os filtros atuais.
                  </Text>
                }
              >
                <SimpleGrid
                  columns={{ base: 1, lg: 2 }}
                  spacing={5}
                  justifyItems="center"
                >
                  {houses.map((house) => {
                    return <AuctionCard key={house.houseId} {...house} />;
                  })}
                </SimpleGrid>
              </InfiniteScroll>
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
