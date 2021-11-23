import {
  Box,
  Container,
  Image,
  HStack,
  Heading,
  useMediaQuery,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react"
import Link from "next/link"
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { useRef } from "react"

export default function Header() : JSX.Element {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)")
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef(null)

  return(
    <Box my={{base:"5", md:"10"}}>
      <Container maxW="container.xl" d="flex" alignItems="center" justifyContent="space-between">
        <HStack spacing="10">
          <Link href="/">
            <a>
              <Image src="vercel.svg" alt="logo" h="7" w="28"/>
            </a>
          </Link>
          {isLargerThan768 &&
            <Link href="/search">
              <a>
                <Heading size="md"
                _hover={{color:"grey"}}>Imóveis</Heading>
              </a>
            </Link>
          }
        </HStack>
        {!isLargerThan768 &&
          <>
            <HamburgerIcon w={8} h={8} color="blackAlpha.900" onClick={onOpen} ref={btnRef}/>
            <Drawer placement="right" onClose={onClose} isOpen={isOpen} size="full">
              <DrawerOverlay />
              <DrawerContent>
                <DrawerHeader borderBottomWidth="1px" display="flex" alignItems="center" justifyContent="space-between">
                  <Heading size="md">Basic Drawer</Heading>
                  <DrawerCloseButton />
                </DrawerHeader>
                <DrawerBody>
                  <p>Some contents...</p>
                  <p>Some contents...</p>
                  <p>Some contents...</p>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </>
        }
      </Container>
    </Box>
  )
}