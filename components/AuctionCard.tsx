import {
  Box,
  Heading,
  Text,
  Badge,
  Divider,
  Stat,
  StatLabel,
  StatNumber,
  StatArrow,
} from "@chakra-ui/react";
import CarouselComponent from "@/components/Carousel";
import dayjs from "dayjs";
import Link from "next/link";
import CurrencyField from "@/components/fields/CurrencyField";

export type AuctionCardType = {
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
  currentBidHistory: number[];
  [rest: string]: number | string | boolean | string[] | number[] | undefined;
};

const AreaInfo = ({ area }: { area: number }): JSX.Element => {
  return (
    <Box className="area-div" fontSize="sm">
      <Text as="span">{area} m²</Text>
    </Box>
  );
};

export const AuctionCard = ({
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
  currentBidHistory,
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

  const percentageIncrease = (finalValue: number, initialValue: number) => {
    return (((finalValue - initialValue) / initialValue) * 100).toFixed(1);
  };

  return (
    <>
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
                      {currentBid ? (
                        <CurrencyField value={currentBid} />
                      ) : (
                        <Text>- €</Text>
                      )}
                    </StatNumber>
                    {currentBidHistory.length > 1 && currentBidHistory[0] > 0 && (
                      <>
                        <StatArrow type="increase" />
                        {percentageIncrease(
                          currentBidHistory[currentBidHistory.length - 1],
                          currentBidHistory[currentBidHistory.length - 2]
                        )}
                        %
                      </>
                    )}
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
