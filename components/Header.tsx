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
  const isSearchPage = router.pathname === "/search";
  const isAboutUsPage = router.pathname === "/about-us";
  const isContactUsPage = router.pathname === "/contact-us";
  const isBlogPage = router.pathname === "/blog";

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
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        zIndex="3"
      >
        <Box display="flex" w="full" justifyContent="space-between">
          <HStack spacing="10">
            <Link href="/" passHref legacyBehavior>
              <a onClick={() => setIsOpen(false)}>
                <Image
                  src="/auction-logo.png"
                  alt="logo leiloou"
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
                <Link href="/search" passHref legacyBehavior>
                  <a>
                    <Heading
                      size="md"
                      _hover={{ color: "grey" }}
                      textDecoration={isSearchPage ? "underline" : "none"}
                    >
                      Imóveis
                    </Heading>
                  </a>
                </Link>
              </>
            )}
          </HStack>
          {isLargerThan768 && (
            <HStack spacing={"10"}>
              <Link href="/blog" passHref legacyBehavior>
                <a>
                  <Heading
                    size="md"
                    _hover={{ color: "grey" }}
                    textDecoration={isBlogPage ? "underline" : "none"}
                  >
                    Blog
                  </Heading>
                </a>
              </Link>
              <Link href="/about-us" passHref legacyBehavior>
                <a>
                  <Heading
                    size="md"
                    _hover={{ color: "grey" }}
                    textDecoration={isAboutUsPage ? "underline" : "none"}
                  >
                    Sobre Nós
                  </Heading>
                </a>
              </Link>
              <Link href="/contact-us" passHref legacyBehavior>
                <a>
                  <Heading
                    size="md"
                    _hover={{ color: "grey" }}
                    textDecoration={isContactUsPage ? "underline" : "none"}
                  >
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
            <Link href="/search" passHref legacyBehavior>
              <a onClick={() => setIsOpen(false)}>
                <HStack>
                  <ChevronRightIcon />
                  <Heading
                    size="md"
                    textDecoration={isSearchPage ? "underline" : "none"}
                  >
                    Imóveis
                  </Heading>
                </HStack>
              </a>
            </Link>
            <Link href="/blog" passHref legacyBehavior>
              <a onClick={() => setIsOpen(false)}>
                <HStack>
                  <ChevronRightIcon />
                  <Heading
                    size="md"
                    textDecoration={isBlogPage ? "underline" : "none"}
                  >
                    Blog
                  </Heading>
                </HStack>
              </a>
            </Link>
            <Link href="/about-us" passHref legacyBehavior>
              <a onClick={() => setIsOpen(false)}>
                <HStack>
                  <ChevronRightIcon />
                  <Heading
                    size="md"
                    textDecoration={isAboutUsPage ? "underline" : "none"}
                  >
                    Sobre Nós
                  </Heading>
                </HStack>
              </a>
            </Link>
            <Link href="/contact-us" passHref legacyBehavior>
              <a onClick={() => setIsOpen(false)}>
                <HStack>
                  <ChevronRightIcon />
                  <Heading
                    size="md"
                    textDecoration={isContactUsPage ? "underline" : "none"}
                  >
                    Contacte-nos
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
