import { useEffect, useState } from "react";

import { Link, Box, Text, Icon } from "@chakra-ui/react";
import NextLink from "next/link";

export default function GdprBanner(): JSX.Element {
  const [hideGdpr, setHideGdpr] = useState(false);

  const hideBanner = () => {
    localStorage.setItem("hideGdpr", "yes");
    setHideGdpr(true);
  };

  useEffect(() => {
    setHideGdpr(!!localStorage.getItem("hideGdpr"));
  }, []);

  return (
    <>
      {hideGdpr ? null : (
        <Box
          display={{ base: "none", xl: "block" }}
          insetX={0}
          bottom={0}
          pos="fixed"
          textColor="white"
          bgColor="blackAlpha.800"
        >
          <Box
            maxWidth="container.xl"
            mx="auto"
            display="flex"
            justifyContent="space-between"
            py="2"
          >
            <Text as="span">
              Ao utilizar este site, está a aceitar com a nossa{" "}
              <NextLink href="/privacy">
                <Link textDecor="underline">
                  política de privacidade e utilização de cookies
                </Link>
              </NextLink>
            </Text>
            <Box as="button" onClick={hideBanner}>
              <Icon
                xmlns="http://www.w3.org/2000/svg"
                h={6}
                w={6}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </Icon>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
