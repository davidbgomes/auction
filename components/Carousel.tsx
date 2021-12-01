import {
  Box,
  Text,
  Image,
  useMediaQuery,
} from '@chakra-ui/react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function CarouselComponent({id, images, height = "280px"}:{id: string, images: string[], height?: string}) : JSX.Element{
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)")
  return(
    <Box className="carousel-wrapper">
      <Slider
        dots= {false}
        infinite= {true}
        speed= {500}
        slidesToShow = {1}
        slidesToScroll = {1}
        lazyLoad = "ondemand"
        arrows={isLargerThan768}
      >
        {images.map((el,i) => {
          return(
            <Box key={id} pos="relative" >
              <Box backgroundColor="blackAlpha.900" pos="absolute" top="0" right="0" mt="4" mr="4" px="2" borderRadius="md">
                <Text color="whiteAlpha.900" >{`${i + 1} / ${images.length}`}</Text>
              </Box>
              <Image src={el} alt={`carousel-image-${i}`} borderTopRadius="lg" height={height} w="inherit" objectFit="cover" />
            </Box>
          )
        })}
      </Slider>
    </Box>
  )
}