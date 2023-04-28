import { getAllPosts, getPostBySlug } from "@/utils/blog/helpers";
import { capitalize } from "@/utils/helpers";
import { Container, Heading, Image, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import Head from "next/head";
import { useRouter } from "next/router";
import { PostType } from "types/post";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import "dayjs/locale/pt";
import GoogleAd from "@/components/GoogleAd";

type Props = {
  post: PostType;
  morePosts: PostType[];
  preview?: boolean;
};

const components = {
  Container: (props: any) => <Container {...props}>{props.children}</Container>,
  GoogleAd: (props: any) => <GoogleAd {...props} />,
  p: (props: any) => (
    <Text fontSize={"lg"} lineHeight={"taller"} mb={"4"}>
      {props.children}
    </Text>
  ),
};

export default function Post({ post }: Props): JSX.Element {
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
          <MDXRemote {...post.mdxSource} components={components} />
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
  const mdxSource = await serialize(post.content);

  return {
    props: {
      post: {
        ...post,
        mdxSource,
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
