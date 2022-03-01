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
  Image,
} from "@chakra-ui/react";
import CarouselComponent from "@/components/Carousel";
import CurrencyField from "@/components/fields/CurrencyField";
import dayjs from "dayjs";
import Countdown from "react-countdown";
import { BiArea } from "@react-icons/all-files/bi/BiArea";
import { BiMap } from "@react-icons/all-files/bi/BiMap";
import { BiBuilding } from "@react-icons/all-files/bi/BiBuilding";
import { BiHome } from "@react-icons/all-files/bi/BiHome";
import { BiBed } from "@react-icons/all-files/bi/BiBed";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { fetcher } from "@/utils/helpers";
import useSWR from "swr";
import SkeletonHouse from "@/components/SkeletonHouse";
import { formatTitle } from "@/utils/helpers";
import GoogleAd from "@/components/GoogleAd";

const ENV = process.env.NEXT_PUBLIC_ENV;
const API_PATH = ENV === "development" ? "/api" : "/.netlify/functions";

const MapLeaflet = dynamic(() => import("@/components/MapLeaflet"), {
  ssr: false,
});

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

export default function House(): JSX.Element {
  const router = useRouter();
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const houseId = router.query.house as string;

  const { data, error } = useSWR(`${API_PATH}/houses?id=${houseId}`, fetcher);

  if (!data || error) {
    return <SkeletonHouse />;
  }

  const {
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
  } = data;

  return (
    <>
      <Head>
        <title>Leiloou - {title}</title>
      </Head>
      <Container maxW="container.xl" py="2">
        <GoogleAd adSlot="7481611029" isResponsive />
        <Grid
          templateRows={{
            base: `1fr 1fr 450px ${latitude && "450px"} 30px`,
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
                <Divider />
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
                      color="#095785"
                    />
                    <Text fontSize="md" ml={{ base: "2", md: "0" }}>
                      {formatTitle(`${district}, ${county}`)}
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
                      as={houseType === "Apartamento" ? BiBuilding : BiHome}
                      w={{ base: 6, md: 8 }}
                      h={{ base: 6, md: 8 }}
                      color="#095785"
                    />
                    <Text fontSize="md" ml={{ base: "2", md: "0" }}>
                      {houseType || "Imóvel"}
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
                      color="#095785"
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
                      color="#095785"
                    />
                    <Text fontSize="md" ml={{ base: "2", md: "0" }}>
                      {area} m²
                    </Text>
                  </Box>
                </SimpleGrid>
                <Divider />
              </VStack>
              <Box px={{ md: "6" }}>
                <Text fontSize={{ base: "sm", md: "md" }} textAlign="justify">
                  {description}
                </Text>
              </Box>
              <Divider />
              <Box px={{ md: "6" }} w="full" d="flex" alignItems="center">
                <Heading size="md" fontWeight="medium" mr="2">
                  Leiloeira:
                </Heading>
                <Image
                  src={`/${website}.png`}
                  alt={website}
                  bgColor={website === "e-leiloes" ? "#4A66A0" : "initial"}
                  h={website === "e-leiloes" ? "7" : "10"}
                  borderRadius="lg"
                />
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
              bgColor="#3e474a"
              color="white"
              py="3"
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
                {minimumPrice ? (
                  <CurrencyField value={minimumPrice} />
                ) : (
                  <Text>--</Text>
                )}
              </Box>
              <Box d="flex" w="full" justifyContent="space-between">
                <Text fontWeight="semibold">Valor de abertura:</Text>
                {startingPrice ? (
                  <CurrencyField value={startingPrice} />
                ) : (
                  <Text>--</Text>
                )}
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
              bgColor="#efefef"
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
          {latitude && longitude && addressLine1 && (
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
                bgColor="#3e474a"
                color="white"
                py="3"
              >
                Localização
              </Heading>
              <Divider />
              <MapLeaflet
                latitude={parseFloat(latitude)}
                longitude={parseFloat(longitude)}
                title={title}
              />
              <Text fontSize="sm" py="5" px="3">
                {`${addressLine1}${
                  addressNumber !== null ? `, ${addressNumber}` : ""
                }${addressFloor !== null ? ` ${addressFloor}` : ""}`}
                {", "}
                {postcode} <br></br> {formatTitle(`${county}, ${parish}`)}
              </Text>
            </GridItem>
          )}
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
}
