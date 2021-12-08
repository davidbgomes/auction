import { Box } from "@chakra-ui/layout";
import Link from "next/link";

export default function CTA({
  text = "Pesquise Agora",
}: {
  text: string;
}): JSX.Element {
  return (
    <Link href="/search" passHref>
      <Box
        as="a"
        href="/form"
        bg="#2697b1"
        px="14"
        py="4"
        color="white"
        borderRadius="md"
        fontSize={{ base: "base", md: "xl" }}
        fontWeight="bold"
        textTransform="uppercase"
        _hover={{ bg: "#2697b1a1", color: "white" }}
        transition="0.3s ease-in-out"
      >
        {text}
      </Box>
    </Link>
  );
}
