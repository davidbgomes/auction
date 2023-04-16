import { getAllPosts, getPostBySlug } from "@/utils/blog/helpers";
import markdownToHtml from "@/utils/blog/markdownToHtml";
import { capitalize } from "@/utils/helpers";
import { Container, Heading, Image, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import Head from "next/head";
import { useRouter } from "next/router";
import { PostType } from "types/post";
import "dayjs/locale/pt";

type Props = {
  post: PostType;
  morePosts: PostType[];
  preview?: boolean;
};

export default function Post({ post, morePosts, preview }: Props): JSX.Element {
  const router = useRouter();
  const title = `Leiloou | ${post.title}`;

  return (
    <Container maxW={"container.lg"} pb="10">
      {router.isFallback ? (
        <Heading>Loading…</Heading>
      ) : (
        <>
          <Head>
            <title>{title}</title>
            <meta property="og:image" content={post.coverImage} />
          </Head>
          <Heading textAlign={"center"} size={"4xl"}>
            {post.title}
          </Heading>
          <Image
            src={post.coverImage}
            alt={post.imageAlt}
            mt={"10"}
            width={"full"}
            objectFit={"cover"}
            maxH={"lg"}
          />
          <Text mt={"6"} pb={3} color={"gray.600"}>
            {capitalize(dayjs(post.date).locale("pt").format("MMMM DD, YYYY"))}
          </Text>
          <Text
            className="markdown"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></Text>
        </>
      )}
    </Container>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "content",
    "coverImage",
    "imageAlt",
  ]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
