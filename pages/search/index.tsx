import { useState } from "react";
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
  Badge,
  Divider,
  Stat,
  StatLabel,
  StatNumber,
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
import dynamic from 'next/dynamic';

const SkeletonSearch = dynamic(() => import('@/components/SkeletonSearch'))
import Navigation from "@/components/Navigation";
import { GetServerSideProps } from "next";
import Link from "next/link";
import useSWRInfinite from "swr/infinite";
import { SWRConfig } from "swr";
import { fetcher, prefetchHouses, housesCount } from "@/utils/helpers";
import CarouselComponent from "@/components/Carousel";
import InfiniteScroll from "react-infinite-scroll-component";
import CurrencyField from "@/components/fields/CurrencyField";
import dayjs from "dayjs";
import Head from "next/head";
import { House } from "@prisma/client";

const PAGE_SIZE = 8;
const ENV = process.env.NEXT_PUBLIC_ENV
const API_PATH = ENV === 'development' ? '/api' : '/.netlify/functions'
const PREFETCH_PATH = ENV === 'development' ? '/api/houses' : 'https://determined-villani-81a550.netlify.app/.netlify/functions/houses'

type Props = {
  count: number;
  query: {
    [key: string]: string;
  };
};

type AuctionCardType = {
  houseId: string;
  images: string[];
  title: string;
  description: string;
  houseType: "apartamento" | "moradia";
  typology: string;
  area: number;
  currentBid: number;
  endsAt: any;
  isNew?: boolean;
  priceChange?: number;
  [rest: string]: number | string | boolean | string[] | undefined;
};

const AreaInfo = ({ area }: { area: number }): JSX.Element => {
  return (
    <Box className="area-div" fontSize="sm">
      <Text as="span">{area} m²</Text>
    </Box>
  );
};

const AuctionCard = ({
  houseId,
  images,
  title,
  description,
  houseType,
  typology,
  area,
  isNew,
  currentBid,
  endsAt,
  priceChange,
}: AuctionCardType): JSX.Element => {
  const formatTitle = () => {
    const lowerCaseTitle = title.toLowerCase();
    return lowerCaseTitle.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());
  };

  const timeRemaining = (): string => {
    const daysLeft = dayjs(endsAt).diff(dayjs(), "day", true);
    if (daysLeft > 0) {
      if (daysLeft > 1) {
        return `${
          daysLeft < 2
            ? `Falta ${daysLeft.toFixed()} dia`
            : `Faltam ${daysLeft.toFixed()} dias`
        }`;
      } else {
        return `${
          parseInt((24 * daysLeft).toFixed()) > 1
            ? `Faltam ${(24 * daysLeft).toFixed()} horas`
            : `${
                parseInt((24 * daysLeft).toFixed()) === 1
                  ? `Falta 1 hora`
                  : `Falta < 1 hora`
              }`
        }`;
      }
    } else {
      return "Terminado";
    }
  };

  return (
    <>
      <Head>
        <title>Leiloou - Imóveis</title>
        <meta
          name="description"
          content="Leiloou - Imóveis em Leilão Eletrónico"
        />
      </Head>
      <Box
        borderRadius="lg"
        maxW={{
          base: "340px",
          sm: "380px",
          md: "360px",
          lg: "360px",
          xl: "390px",
        }}
        boxShadow="lg"
        _hover={{ transform: "scale3d(1.01, 1.01, 1.01)" }}
        transition="0.2s ease-in-out"
      >
        <CarouselComponent id={houseId} images={images} />
        <Link href={`/search/${houseId}`} passHref>
          <a>
            <Box p="6">
              <Box
                display="flex"
                alignItems="baseline"
                justifyContent="space-between"
              >
                <Box display="flex" alignItems="baseline">
                  {isNew && (
                    <Badge borderRadius="full" px="2" colorScheme="teal">
                      Novo
                    </Badge>
                  )}
                  <Box
                    color="gray.500"
                    fontWeight="semibold"
                    letterSpacing="wide"
                    fontSize="xs"
                    textTransform="uppercase"
                    ml="2"
                  >
                    {typology} {houseType && <>&bull; {houseType}</>}
                  </Box>
                </Box>
                {area > 0 && <AreaInfo area={area} />}
              </Box>
              <Heading size="sm" mt="2">
                {formatTitle()}
              </Heading>
              <Box mt="2" color="slategray">
                <Text fontSize="sm" noOfLines={3}>
                  {description}
                </Text>
              </Box>
              <Divider my="4" />
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Stat colorScheme="linkedin">
                    <StatLabel>Lance Atual</StatLabel>
                    <StatNumber>
                      {currentBid ?
                        <CurrencyField value={currentBid} />
                      :
                      <Text>- €</Text>
                      }
                    </StatNumber>
                    {/*{priceChange === 1 &&
                      <>
                        <StatArrow type="increase" />
                        23.36%
                      </>
                    } */}
                  </Stat>
                </Box>
                <Text fontSize="xs" color="gray.600">
                  {timeRemaining()}
                </Text>
              </Box>
            </Box>
          </a>
        </Link>
      </Box>
    </>
  );
};

const GetHouses = ({ query, count }: Props): JSX.Element => {
  const [endpoint, setEndpoint] = useState<string>(`${API_PATH}/houses`);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");

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
  } = query;
  const houseTypeArray = defaultHouseType?.split(",");
  const typologyArray = defaultTypology?.split(",");

  // A function to get the SWR key of each page
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) {
      return null; // reached the end
    }
    const params = new URLSearchParams(query);
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
                defaultDistrict={defaultDistrict}
                defaultCounty={defaultCounty}
                defaultParish={defaultParish}
                defaultMinPrice={defaultMinPrice}
                defaultMaxPrice={defaultMaxPrice}
                defaultMinArea={defaultMinArea}
                defaultMaxArea={defaultMaxArea}
                defaultHouseType={houseTypeArray}
                defaultTypology={typologyArray}
                defaultOrderBy={defaultOrderBy}
                endpoint={endpoint}
                setEndpoint={setEndpoint}
              />
            </GridItem>
          )}
          <GridItem rowSpan={3} colSpan={{ base: 5, lg: 4 }}>
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
                      defaultDistrict={defaultDistrict}
                      defaultCounty={defaultCounty}
                      defaultParish={defaultParish}
                      defaultMinPrice={defaultMinPrice}
                      defaultMaxPrice={defaultMaxPrice}
                      defaultMinArea={defaultMinArea}
                      defaultMaxArea={defaultMaxArea}
                      defaultHouseType={houseTypeArray}
                      defaultTypology={typologyArray}
                      defaultOrderBy={defaultOrderBy}
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
              <b>{count}</b> casas encontradas
            </Heading>
            <InfiniteScroll
              dataLength={houses.length}
              next={() => setSize(size + 1)}
              hasMore={!hasFinished}
              loader={
                <Center w="min-content" m="auto" py="4">
                  <Spinner color="green.500" emptyColor="gray.300" size="lg" />
                </Center>
              }
              endMessage={
                <Text mt="10" fontStyle="italic" textAlign="center">
                  Não existem mais casas com os filtros atuais.
                </Text>
              }
            >
              <SimpleGrid
                columns={{ base: 1, md: 2 }}
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
  );
};

export default function Search({
  fallback,
  query,
  count,
}: {
  fallback: { key: House[] };
  query: { [key: string]: string };
  count: number;
}): JSX.Element {
  return (
    <>
      <Head>
        <link
          rel="preload"
          href={PREFETCH_PATH}
          as="fetch"
          crossOrigin="anonymous"
        ></link>
      </Head>
      <SWRConfig value={{ fallback }}>
        <GetHouses query={query} count={count} />
      </SWRConfig>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query;
  const houses = await prefetchHouses();
  const count = await housesCount(query as { [key: string]: string });
  const fallbackPath = `${API_PATH}/houses`
  return {
    props: {
      query,
      count,
      fallback: {
        [fallbackPath]: houses,
      },
    },
  };
};
