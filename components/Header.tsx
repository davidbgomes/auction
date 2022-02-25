import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Image,
  HStack,
  VStack,
  Heading,
  useMediaQuery,
  Badge,
  Divider,
} from "@chakra-ui/react";
import Link from "next/link";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { motion, Variants } from "framer-motion";
import { MenuToggle } from "@/components/MenuToggle";
import { useRouter } from "next/router";

const variants: Variants = {
  open: {
    willChange: "transform",
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.3,
    },
  },
  closed: {
    willChange: "transform",
    opacity: 0,
    x: "-100%",
  },
};

export default function Header(): JSX.Element {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const isSearchPage = router.pathname === "/search"
  const isAboutUsPage = router.pathname === "/about-us"
  const isContactUsPage = router.pathname === "/contact-us"

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <Box my={{ base: "5", md: "10" }}>
      <Container
        maxW="container.xl"
        d="flex"
        alignItems="center"
        justifyContent="space-between"
        zIndex="3"
      >
        <Box d="flex" w="full" justifyContent="space-between">
          <HStack spacing="10">
            <Link href="/" passHref>
              <a onClick={() => setIsOpen(false)}>
                <Image
                  src="/auction-logo.png"
                  alt="logo"
                  h="7"
                  w="30"
                  _hover={{ opacity: "0.6" }}
                  loading="eager"
                  ignoreFallback
                />
              </a>
            </Link>
            {isLargerThan768 && (
              <>
                <Link href="/search" passHref>
                  <a>
                    <Heading size="md" _hover={{ color: "grey" }} color={isSearchPage ? '#02667c' : 'black'}>
                      Imóveis
                    </Heading>
                  </a>
                </Link>
              </>
            )}
          </HStack>
          {isLargerThan768 && (
            <HStack spacing={'10'}>
              <Link href="/about-us" passHref>
                <a>
                  <Heading size="md" _hover={{ color: "grey" }} color={isAboutUsPage ? '#02667c' : 'black'}>
                    Sobre Nós
                  </Heading>
                </a>
              </Link>
              <Link href="/contact-us" passHref>
                <a>
                  <Heading size="md" _hover={{ color: "grey" }} color={isContactUsPage ? '#02667c' : 'black'}>
                    Contacte-nos
                  </Heading>
                </a>
              </Link>
            </HStack>
          )}
        </Box>
        {!isLargerThan768 && (
          <motion.nav initial={false} animate={isOpen ? "open" : "closed"}>
            <MenuToggle toggle={() => setIsOpen(!isOpen)} />
          </motion.nav>
        )}
      </Container>
      {!isLargerThan768 && (
        <motion.div
          initial={{ opacity: 0 }}
          className="mobile-menu-background"
          animate={isOpen ? "open" : "closed"}
          variants={variants}
        >
          <VStack
            pos="absolute"
            top="0"
            left="0"
            mt="10"
            mx="4"
            spacing="10"
            alignItems="flex-start"
            w="full"
          >
            <Link href="/search" passHref>
              <a onClick={() => setIsOpen(false)}>
                <HStack>
                  <ChevronRightIcon />
                  <Heading size="lg">
                    Imóveis
                  </Heading>
                </HStack>
              </a>
            </Link>
            <Divider w="full"/>
            <Link href="/about-us" passHref>
              <a onClick={() => setIsOpen(false)}>
                <HStack>
                  <ChevronRightIcon />
                  <Heading size="sm">
                    Sobre Nós
                  </Heading>
                </HStack>
              </a>
            </Link>
            <Link href="/contact-us" passHref>
              <a onClick={() => setIsOpen(false)}>
                <HStack>
                  <ChevronRightIcon />
                  <Heading size="sm">
                    Contacte-nos
                  </Heading>
                </HStack>
              </a>
            </Link>
            <Link href="/faq" passHref>
              <a onClick={() => setIsOpen(false)}>
                <HStack>
                  <ChevronRightIcon />
                  <Heading size="sm">
                    FAQ
                  </Heading>
                </HStack>
              </a>
            </Link>
          </VStack>
        </motion.div>
      )}
    </Box>
  );
}
