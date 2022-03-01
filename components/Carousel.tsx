/* eslint-disable @next/next/no-img-element */
import { Box, Text, useMediaQuery } from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CarouselComponent({
  id,
  images,
  height = "280px",
  lazyLoad = "ondemand",
}: {
  id: string;
  images: string[];
  height?: string;
  lazyLoad?: "ondemand" | "progressive";
}): JSX.Element {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  return (
    <Box className="carousel-wrapper">
      <Slider
        dots={false}
        infinite={true}
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
        lazyLoad={lazyLoad}
        arrows={isLargerThan768}
      >
        {images.map((el, i) => {
          return (
            <Box key={id} pos="relative" height={height}>
              <Box
                backgroundColor="blackAlpha.900"
                pos="absolute"
                top="0"
                right="0"
                mt="4"
                mr="4"
                px="2"
                borderRadius="md"
                zIndex="3"
              >
                <Text color="whiteAlpha.900">{`${i + 1} / ${
                  images.length
                }`}</Text>
              </Box>
              <img src={el} alt={`carousel-image-${i + 1}`} style={{objectFit:"cover", height:"inherit", width:"inherit"}} loading="lazy" />
            </Box>
          );
        })}
      </Slider>
    </Box>
  );
}
