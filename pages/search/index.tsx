import { useEffect, useState, useRef } from 'react'
import {
  Box,
  Container,
  Image,
  HStack,
  Button,
  Heading,
  Stack,
  VStack,
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
  StatHelpText,
  StatArrow,
  StatGroup,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Spinner,
} from "@chakra-ui/react"
import SkeletonSearch from '@/components/SkeletonSearch';
import NumberFormat from 'react-number-format';
import Navigation from "@/components/Navigation"
import { GetServerSideProps } from "next";
import Link from "next/link"
import { useRouter } from 'next/router'
import useSWRInfinite from 'swr/infinite'
import { fetcher } from '@/utils/helpers'
import Slider from 'react-slick'
import InfiniteScroll from 'react-infinite-scroll-component';
//import Image from 'next/image'

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

type Props = {
  query:{
    [key: string] : string,
  }
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

const PAGE_SIZE = 8;

const CarouselComponent = ({id, images}:{id: string, images: string[]}) : JSX.Element => {
  const router = useRouter()
  return(
    <Box className="carousel-wrapper">
      <Slider
        dots= {false}
        infinite= {true}
        speed= {500}
        slidesToShow= {1}
        slidesToScroll= {1}
        lazyLoad="ondemand"
        arrows={true}
      >
        {images.map((el,i) => {
          return(
            <Box key={el} pos="relative">
              <Text pos="absolute" top="0" right="0" color="whiteAlpha.900" pr="1" textShadow="-0.5px 1px black, 0 1px black, 0.5px 0 black, 0 -0.5px black">{`${i + 1} de ${images.length}`}</Text>
              <Image src={el} alt={`carousel-image-${i}`} borderTopRadius="lg" height="280px" w="inherit" objectFit="cover" />
            </Box>
          )
        })}
      </Slider>
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
      maxW={{base:"340px", sm: "380px", md:"360px", lg: "360px", xl:"390px"}}
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
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()
  
  const { query } = props
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
  } = query
  const houseTypeArray = defaultHouseType?.split(',')
  const typologyArray = defaultTypology?.split(',')
  
  // A function to get the SWR key of each page,
  // its return value will be accepted by `fetcher`.
  // If `null` is returned, the request of that page won't start.
  const getKey = (pageIndex:number, previousPageData:any) => {
    console.log("pageIndex", pageIndex)
    console.log("previousPageData", previousPageData)
    if (previousPageData && !previousPageData.length) return null // reached the end
    const params = new URLSearchParams(query)
    params.append('page',(pageIndex + 1).toString())
    params.append('limit',PAGE_SIZE.toString())
    console.log(`${endpoint}?${params.toString()}` )
    return `${endpoint}?${params.toString()}`                    // SWR key
  }


  const {data, error, size, setSize} = useSWRInfinite(getKey, fetcher)

  if(!data || error){
    return (
      <SkeletonSearch />
    )
  }
  const houses : AuctionCardType[] = data ? [].concat(...data) : [];
  const hasFinished = houses.length < PAGE_SIZE || data[data.length - 1].length < PAGE_SIZE

  return(
    <Box>
      <Container maxW="container.xl" py="6">
        <Grid
          templateRows="repeat(2, 1fr)"
          templateColumns=" 240px repeat(4, 1fr)"
          gap={4}
        >
          <GridItem rowSpan={2} colSpan={1} display={{base:"none", lg:"initial"}}>
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
              endpoint={endpoint}
              setEndpoint={setEndpoint}
            />
          </GridItem>
          <GridItem rowSpan={3} colSpan={{base:5, lg:4}}>
            <Center mb="4" d={{base:"flex", md:"none"}}>
              <Button onClick={onOpen} borderRadius="xl" colorScheme="green" width="56">
                Filtros
              </Button>
            </Center>
            <Drawer placement="top" onClose={onClose} isOpen={isOpen} size="full">
              <DrawerOverlay />
              <DrawerContent>
                <DrawerHeader borderBottomWidth="1px" display="flex" alignItems="center" justifyContent="space-between">
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
                    endpoint={endpoint}
                    setEndpoint={setEndpoint}
                    closeDrawer={onClose}
                  />
                </DrawerBody>
              </DrawerContent>
            </Drawer>
            <InfiniteScroll
              dataLength={houses.length} //This is important field to render the next data
              next={() => setSize(size + 1)}
              hasMore={!hasFinished}
              loader={
                <Center w="min-content" m="auto" py="4">
                  <Spinner color="green.500" emptyColor="gray.300" size="lg"/>
                </Center>
              }
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  <b>Não existem mais casas com os filtros atuais.</b>
                </p>
              }
            >
              <SimpleGrid columns={{base:1, md:2}} spacing={5} justifyItems="center">
                  {houses.map(house => {
                    return(
                      <AuctionCard key={house.houseId} {...house}/>
                    )
                  })}
              </SimpleGrid>
            </InfiniteScroll>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  )
}

export const getServerSideProps : GetServerSideProps = async context => {
  const query = context.query

  if(query){
    return {
      props: {
        query,
      },
    }
  } else {
    return{props: {}}
  }
}
