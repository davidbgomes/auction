import { MDXRemoteSerializeResult } from "next-mdx-remote";

export type PostType = {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  imageAlt: string;
  excerpt: string;
  mdxSource: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, unknown>
  >;
};
