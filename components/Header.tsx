import {useEffect, useState} from 'react'
import {
  Box,
  Container,
  Image,
  HStack,
  VStack,
  Heading,
  useMediaQuery,
  Badge,
} from "@chakra-ui/react"
import Link from "next/link"
import { ChevronRightIcon } from '@chakra-ui/icons'
import {motion, Variants} from 'framer-motion'
import { MenuToggle } from "@/components/MenuToggle";
import { useRouter } from 'next/router'

const variants : Variants = {
  open: {
    willChange:"transform",
    opacity: 1,
    x: 0,
    transition:{
      delay:0.3,
    },
  },
  closed: {
    willChange:"transform",
    opacity: 0,
    x: "-100%",
  },
}

export default function Header() : JSX.Element {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)")
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if(isOpen){
      document.body.style.overflow = 'hidden';
    } else{
      document.body.style.overflow = 'unset';
    }
  },[isOpen])

  return(
    <Box my={{base:"5", md:"10"}}>
      <Container maxW="container.xl" d="flex" alignItems="center" justifyContent="space-between" zIndex="3">
        <HStack spacing="10">
          <Link href="/" passHref>
            <a onClick={() => setIsOpen(false)}>
              <Image src="/auction-logo.png" alt="logo" h="7" w="30" _hover={{opacity:"0.7"}}/>
            </a>
          </Link>
          {isLargerThan768 &&
          <Link href="/search" passHref>
            <a>
              <Heading size="md"
              _hover={{color:"grey"}}>Imóveis</Heading>
            </a>
          </Link>
          }
        </HStack>
        {!isLargerThan768 &&
          <motion.nav
            initial={false}
            animate={isOpen ? "open" : "closed"}
          >
            <MenuToggle toggle={() => setIsOpen(!isOpen)} />
          </motion.nav>
        }
      </Container>
      <motion.div
        initial={{ opacity: 0 }}
        className="mobile-menu-background"
        animate={isOpen ? "open" : "closed"}
        variants={variants}

      >
        <VStack pos="absolute" top="0" left="0" mt="10" ml="10" spacing="10" alignItems="flex-start">
          <Link href="/search" passHref>
            <a onClick={() => setIsOpen(false)}>
              <Box d="flex" alignItems="center">
                <ChevronRightIcon/>
                <Heading fontWeight="medium" size="lg">Imóveis</Heading>
              </Box>
            </a>
          </Link>
          <Box d="flex" alignItems="center">
            <ChevronRightIcon/>
            <Heading fontWeight="medium" size="lg" textDecor="line-through">Veículos</Heading>
            <Badge borderRadius="xl" ml="3">Em breve!</Badge>
          </Box>
          <Box d="flex" alignItems="center">
            <ChevronRightIcon/>
            <Heading fontWeight="medium" size="lg" textDecor="line-through">Equipamentos</Heading>
            <Badge ml="3">Em breve!</Badge>
          </Box>
        </VStack>
      </motion.div>
    </Box>
  )
}