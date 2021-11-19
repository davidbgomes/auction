import { useEffect, useState } from 'react'
import {
  Box,
  Container,
  Image,
  HStack,
  Heading,
  Stack,
  VStack,
  Text,
  Grid,
  GridItem,
  SimpleGrid,
  Badge,
  Divider,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react"
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react"
import NumberFormat from 'react-number-format';
import Navigation from "@/components/Navigation"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { GetServerSideProps } from "next";
import Link from "next/link"
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { fetcher } from '@/utils/helpers'

type Props = {
  [key: string] : string,
}

type AuctionCardType = {
  houseId: string,
  images: string[],
  title: string,
  description: string,
  houseType: "apartamento" | "moradia",
  typology: string,
  area: string,
  currentBid: number,
  isNew?: boolean,
  priceChange?: number,
  [rest : string]: number | string | boolean | string[] | undefined,
}

const CarouselComponent = ({id, images}:{id: string, images: string[]}) : JSX.Element => {
  const router = useRouter()
  return(
    <Box className="carousel-wrapper">
      <Carousel
        showThumbs={false}
        showStatus={false}
        onClickItem={() => router.push(`/search/${id}`)}
        infiniteLoop
        swipeScrollTolerance={40}
        preventMovementUntilSwipeScrollTolerance
      >
        {images.map((el, i) => {
          return(
            <Box key={i}>
              <Image src={el} alt={`carousel-image-${i}`} borderTopRadius="lg" boxSize="280px" objectFit="cover" />
            </Box>
          )
        })}
      </Carousel>
    </Box>
  )
}

const AreaInfo = ({area}:{area:string}) : JSX.Element =>{
  return(
    <Box className="area-div" fontSize="sm">
      <Text as="span">{area} m²</Text>
    </Box>
  )
}

const AuctionCard = ({houseId, images, title, description, houseType, typology, area, isNew, currentBid, priceChange} : AuctionCardType) : JSX.Element => {
  const formatTitle = () => {
    const lowerCaseTitle= title.toLowerCase()
    return lowerCaseTitle.replace(/(^\w|\s\w)/g, m => m.toUpperCase())
  }

  return(
    <Box
      borderRadius="lg"
      maxW={{base:"sm", lg:"410px"}}
      boxShadow="lg"
      _hover={{transform:"scale3d(1.01, 1.01, 1.01)"}}
      transition="0.2s ease-in-out"
    >
      <CarouselComponent id={houseId} images={images}/>
      <Link href={`/search/${houseId}`} passHref >
        <a>
          <Box p="6">
            <Box display="flex" alignItems="baseline" justifyContent="space-between">
              <Box display="flex" alignItems="baseline">
                {isNew && (
                  <Badge borderRadius="full" px="2" colorScheme="teal">
                    New
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
                  {typology} &bull; {houseType}
                </Box>
              </Box>
              <AreaInfo area={area}/>
            </Box>
            <Heading size="sm" mt="2">{formatTitle()}</Heading>
            <Box mt="2" color="slategray">
              <Text fontSize="sm" noOfLines={3}>{description}</Text>
            </Box>
            <Divider my="4"/>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                <Stat colorScheme="linkedin">
                  <StatLabel>Lance Atual</StatLabel>
                  <StatNumber>
                    <NumberFormat
                      value={currentBid}
                      displayType={'text'}
                      thousandSeparator=' '
                      suffix="€"
                    />
                  </StatNumber>
                  {priceChange === 1 &&
                    <>
                      <StatArrow type="increase" />
                      23.36%
                    </>
                  }
                </Stat>
              </Box>
              <Text fontSize="xs" color="gray.600">Faltam 2 dias</Text>
            </Box>
          </Box>
        </a>
      </Link>
    </Box>
  )
}

export default function Search(props : Props) : JSX.Element {
  const [endpoint, setEndpoint] = useState<string>(`/api/houses`);
  const [district, setDistrict] = useState<number>();

  const { district : defaultDistrict } = props

  const {data, error} = useSWR(endpoint, fetcher)

  if(!data || error){
    return (
      <Container maxW="container.sm">
        <VStack spacing={8}>
          {Array.from(new Array(3),(_,i) => {
            return(
              <Box key={i} padding="6" boxShadow="lg" bg="white" borderRadius="lg" w="md" maxW={{base:"300px", lg:"410px"}}>
                <SkeletonCircle size="200" m="auto" />
                <SkeletonText mt="4" noOfLines={8} spacing="4"/>
              </Box>
            )
          })}
        </VStack>
      </Container>
    )
  }
  const { data: houses } : { data: AuctionCardType[] } = data
  console.log("houses", houses)

  return(
    <Box>
      <Container maxW="container.xl" p="6">
        <Grid
          templateRows="repeat(2, 1fr)"
          templateColumns=" 240px repeat(4, 1fr)"
          gap={4}
        >
          <GridItem rowSpan={2} colSpan={1} display={{base:"none", lg:"initial"}}>
            <Navigation
              defaultDistrict={parseInt(defaultDistrict)}
              setEndpoint={setEndpoint}
              currentDistrict={district}
              setDistrict={setDistrict}
            />
          </GridItem>
          <GridItem rowSpan={3} colSpan={{base:5, lg:4}}>
            <SimpleGrid columns={{base:1, md:2}} spacing={5} justifyItems="center">
              {houses.map((house,key) => {
                return(
                  <AuctionCard key={key}
                    {...house}
                  />
                )
              })}
            </SimpleGrid>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  )
}

export const getServerSideProps : GetServerSideProps = async context => {
  const query = context.query
  console.log("query", query)

  if(query){
    return {
      props: {
        ...query,
      },
    }
  } else {
    return{props: {}}
  }
}
