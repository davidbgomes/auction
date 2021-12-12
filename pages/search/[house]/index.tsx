import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Grid,
  GridItem,
  Button,
  SimpleGrid,
  Icon,
  Divider,
  useMediaQuery,
} from "@chakra-ui/react";
import CarouselComponent from "@/components/Carousel";
import { GetServerSideProps } from "next";
import { getHouse } from "@/utils/helpers";
import CurrencyField from "@/components/fields/CurrencyField";
import dayjs from "dayjs";
import Countdown from "react-countdown";
import { BiArea, BiMap, BiBuilding, BiHome, BiBed } from "react-icons/bi";
import dynamic from "next/dynamic";
import { House as HouseType } from "@prisma/client";
import Head from "next/head";
import { SWRConfig } from "swr";

const MapLeaflet = dynamic(() => import("@/components/MapLeaflet"), {
  ssr: false,
});

const GetHouse = ({ house }: any): JSX.Element => {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const renderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    completed: boolean;
  }) => {
    if (completed) {
      return <Text>Terminado</Text>;
    } else {
      return (
        <span>
          {days > 0 && `${days} ${days > 1 ? "dias" : "dia"} `}
          {("0" + hours).slice(-2)}:{("0" + minutes).slice(-2)}:
          {("0" + seconds).slice(-2)} h
        </span>
      );
    }
  };

  const {
    houseId,
    images,
    title,
    area,
    district,
    county,
    parish,
    description,
    houseType,
    typology,
    currentBid,
    marketValue,
    minimumPrice,
    startingPrice,
    startsAt,
    endsAt,
    addressLine1,
    addressNumber,
    addressFloor,
    postcode,
    latitude,
    longitude,
    url,
    website,
  } = house;
  return (
    <>
      <Head>
        <title>Leiloou - {title}</title>
      </Head>
      <Container maxW="container.xl" py="2">
        <Grid
          templateRows={{
            base: "1fr 1fr 450px 450px 30px",
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
            <CarouselComponent
              id={houseId}
              images={images}
              height={isLargerThan768 ? "550px" : "400px"}
              lazyLoad="progressive"
            />
            <VStack mt="3" spacing="6" p="3">
              <VStack spacing={{ base: 4, md: 7 }} w="full">
                <Heading
                  as="h1"
                  fontSize={{ base: "xl", md: "3xl" }}
                  fontWeight="bold"
                  textAlign="center"
                >
                  {title}
                </Heading>
                <SimpleGrid
                  columns={{ base: 1, md: 4 }}
                  spacing={{ base: 1, md: 5 }}
                  w="full"
                >
                  <Box
                    d="flex"
                    alignItems={{ base: "flex-start", md: "center" }}
                    mr="auto"
                    m={{ base: "inherit", md: "auto" }}
                    flexDirection={{ base: "inherit", md: "column" }}
                    w="full"
                  >
                    <Icon
                      as={BiMap}
                      w={{ base: 6, md: 8 }}
                      h={{ base: 6, md: 8 }}
                    />
                    <Text
                      fontSize="md"
                      ml={{ base: "2", md: "0" }}
                    >{`${district}, ${county}`}</Text>
                  </Box>
                  <Box
                    d="flex"
                    alignItems={{ base: "flex-start", md: "center" }}
                    mr="auto"
                    m={{ base: "inherit", md: "auto" }}
                    flexDirection={{ base: "inherit", md: "column" }}
                    w="full"
                  >
                    <Icon
                      as={houseType === "Apartamento" ? BiBuilding : BiHome}
                      w={{ base: 6, md: 8 }}
                      h={{ base: 6, md: 8 }}
                    />
                    <Text fontSize="md" ml={{ base: "2", md: "0" }}>
                      {houseType}
                    </Text>
                  </Box>
                  <Box
                    d="flex"
                    alignItems={{ base: "flex-start", md: "center" }}
                    mr="auto"
                    m={{ base: "inherit", md: "auto" }}
                    flexDirection={{ base: "inherit", md: "column" }}
                    w="full"
                  >
                    <Icon
                      as={BiBed}
                      w={{ base: 6, md: 8 }}
                      h={{ base: 6, md: 8 }}
                    />
                    <Text fontSize="md" ml={{ base: "2", md: "0" }}>
                      {typology}
                    </Text>
                  </Box>
                  <Box
                    d="flex"
                    alignItems={{ base: "flex-start", md: "center" }}
                    mr="auto"
                    m={{ base: "inherit", md: "auto" }}
                    flexDirection={{ base: "inherit", md: "column" }}
                    w="full"
                  >
                    <Icon
                      as={BiArea}
                      w={{ base: 6, md: 8 }}
                      h={{ base: 6, md: 8 }}
                    />
                    <Text fontSize="md" ml={{ base: "2", md: "0" }}>
                      {area} m²
                    </Text>
                  </Box>
                </SimpleGrid>
              </VStack>
              <Box px={{ md: "6" }}>
                <Text fontSize={{ base: "sm", md: "md" }} textAlign="justify">
                  {description}
                </Text>
              </Box>
              <Box px={{ md: "6" }} w="full">
                <Text fontSize={{ base: "sm", md: "md" }}>
                  {" "}
                  <b>Leiloeira:</b> {website}
                </Text>
              </Box>
            </VStack>
          </GridItem>
          <GridItem
            rowSpan={1}
            colSpan={{ base: 4, lg: 1 }}
            boxShadow="0px 0px 11px -6px rgba(0,0,0,0.8)"
            borderRadius="md"
            pos="relative"
          >
            <Heading
              textAlign="center"
              fontSize={{ base: "xl", md: "2xl" }}
              fontWeight="normal"
              my="3"
            >
              Detalhes
            </Heading>
            <Divider />
            <VStack
              mt="8"
              spacing="7"
              alignItems="flex-start"
              mx={{ base: "4", lg: "1", xl: "7" }}
            >
              <Box d="flex" w="full" justifyContent="space-between">
                <Text fontWeight="semibold">Valor de mercado:</Text>
                <CurrencyField value={marketValue} />
              </Box>
              <Box d="flex" w="full" justifyContent="space-between">
                <Text fontWeight="semibold">Valor mínimo:</Text>
                <CurrencyField value={minimumPrice} />
              </Box>
              <Box d="flex" w="full" justifyContent="space-between">
                <Text fontWeight="semibold">Valor de abertura:</Text>
                <CurrencyField value={startingPrice} />
              </Box>
              <Box d="flex" w="full" justifyContent="space-between">
                <Text fontWeight="semibold">Data de início:</Text>
                <Text>{dayjs(startsAt).format("DD-MM-YYYY HH:mm")}h</Text>
              </Box>
              <Box d="flex" w="full" justifyContent="space-between">
                <Text fontWeight="semibold">Data de fim:</Text>
                <Text>{dayjs(endsAt).format("DD-MM-YYYY HH:mm")}h</Text>
              </Box>
              <Box d="flex" w="full" justifyContent="space-between">
                <Text fontWeight="semibold">Tempo restante:</Text>
                <Countdown date={endsAt} renderer={renderer}></Countdown>
              </Box>
            </VStack>
            <Box
              d="flex"
              pos="absolute"
              bottom="0"
              bgColor="#7ca9cd2e"
              w="full"
              height="70px"
              alignItems="center"
              justifyContent="center"
            >
              <Text fontSize="xl">
                <b>Lance Atual:</b>{" "}
                {currentBid && parseInt(currentBid.toString()) > 0 ? (
                  <CurrencyField value={currentBid} />
                ) : (
                  "-"
                )}
              </Text>
            </Box>
          </GridItem>
          <GridItem
            rowSpan={1}
            colSpan={{ base: 4, lg: 1 }}
            boxShadow="0px 0px 11px -6px rgba(0,0,0,0.8)"
            borderRadius="md"
          >
            <Heading
              textAlign="center"
              fontSize={{ base: "xl", md: "2xl" }}
              fontWeight="normal"
              my="3"
            >
              Localização
            </Heading>
            <Divider />
            <MapLeaflet
              latitude={parseFloat(latitude)}
              longitude={parseFloat(longitude)}
              title={title}
            />
            <Text fontSize="xs" py="5" px="3">
              {`${addressLine1}${
                addressNumber !== null ? `, ${addressNumber}` : ""
              }${addressFloor !== null ? ` ${addressFloor}` : ""} `}{" "}
              <br></br> {postcode} <br></br> {county}, {parish}
            </Text>
          </GridItem>
          <GridItem rowSpan={1} colSpan={{ base: 4, lg: 1 }}>
            <Button
              as="a"
              href={url}
              target="_blank"
              bg="#2697b1"
              px="14"
              py="4"
              color="white"
              borderRadius="md"
              fontSize={{ base: "base", md: "xl" }}
              fontWeight="thin"
              _hover={{ bg: "#2697b1a1", color: "white" }}
              transition="0.3s ease-in-out"
              w="full"
            >
              Ver Leilão
            </Button>
          </GridItem>
        </Grid>
      </Container>
    </>
  );
};

export default function House({
  fallback,
  house,
}: {
  fallback: { "/.netlify/functions/houses": HouseType };
  house: HouseType;
}): JSX.Element {
  return (
    <SWRConfig value={{ fallback }}>
      <GetHouse house={house} />
    </SWRConfig>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const params = context.params as { [key: string]: string };
  const { house: houseId } = params;
  const house = await getHouse(houseId);
  return {
    props: {
      house,
      fallback: {
        "/.netlify/functions/houses": house,
      },
    },
  };
};
