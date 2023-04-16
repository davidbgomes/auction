import type { NextPage } from "next";
import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import { getAllPosts } from "@/utils/blog/helpers";
import { PostType } from "types/post";
import Link from "next/link";
import dayjs from "dayjs";
import "dayjs/locale/pt";
import { capitalize } from "@/utils/helpers";

type Props = {
  allPosts: PostType[];
};

type BlogItem = {
  title: string;
  coverImage: string;
  imageAlt: string;
  excerpt: string;
  date: string;
  slug: string;
};

const MainBlogItem = ({
  title,
  coverImage,
  imageAlt,
  excerpt,
  date,
  slug,
}: BlogItem): JSX.Element => {
  return (
    <Grid templateColumns="repeat(6, 1fr)" gap={6}>
      <GridItem colSpan={{ base: 6, md: 4 }}>
        <Link href={`/blog/${slug}`}>
          <Image
            src={coverImage}
            alt={imageAlt}
            width={"full"}
            objectFit={"cover"}
          />
        </Link>
      </GridItem>
      <GridItem colSpan={{ base: 6, md: 2 }}>
        <VStack spacing={{ base: 4, md: 10 }} alignItems={"flex-start"}>
          <Text fontSize={"lg"} color={"gray.600"}>
            {capitalize(dayjs(date).locale("pt").format("MMMM DD, YYYY"))}
          </Text>
          <Link href={`/blog/${slug}`}>
            <Heading size={"3xl"} _hover={{ textDecoration: "underline" }}>
              {title}
            </Heading>
          </Link>
          <Text fontSize={"lg"}>{excerpt}</Text>
        </VStack>
      </GridItem>
    </Grid>
  );
};

const OtherBlogItem = ({
  title,
  coverImage,
  imageAlt,
  excerpt,
  slug,
}: BlogItem): JSX.Element => {
  return (
    <Box
      borderRadius={"lg"}
      boxShadow={"xl"}
      bgColor={"blackAlpha.200"}
      maxW={"lg"}
    >
      <VStack spacing={3} alignItems={"flex-start"}>
        <Link href={`/blog/${slug}`}>
          <Image
            src={coverImage}
            alt={imageAlt}
            w={"full"}
            objectFit={"cover"}
          />
        </Link>
        <VStack px={6} py={4}>
          <Link href={`/blog/${slug}`}>
            <Heading size={"xl"} _hover={{ textDecoration: "underline" }}>
              {title}
            </Heading>
          </Link>
          <Text fontSize={"md"} color={"gray.700"}>
            {excerpt}
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
};

export default function Blog({ allPosts }: Props): JSX.Element {
  const heroPost = allPosts[0];
  const otherPosts = allPosts.slice(1);
  return (
    <>
      <Head>
        <title>Leiloou - Blog</title>
      </Head>
      <Container maxW={"container.xl"} pb="10">
        <Heading size={"2xl"} textAlign={"center"} mb={{ base: "5", md: "16" }}>
          Blog
        </Heading>
        {heroPost && (
          <MainBlogItem
            title={heroPost.title}
            coverImage={heroPost.coverImage}
            imageAlt={heroPost.imageAlt}
            excerpt={heroPost.excerpt}
            date={heroPost.date}
            slug={heroPost.slug}
          />
        )}
        {otherPosts.length > 0 && (
          <>
            <Heading mt={"12"} mb={6}>
              Mais Posts
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={16}>
              {otherPosts.map(
                ({ title, coverImage, imageAlt, excerpt, date, slug }) => (
                  <OtherBlogItem
                    key={title}
                    title={title}
                    coverImage={coverImage}
                    imageAlt={heroPost.imageAlt}
                    excerpt={excerpt}
                    date={date}
                    slug={slug}
                  />
                )
              )}
            </SimpleGrid>
          </>
        )}
      </Container>
    </>
  );
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "coverImage",
    "imageAlt",
    "excerpt",
  ]);

  return {
    props: { allPosts },
  };
};
