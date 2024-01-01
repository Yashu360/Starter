import React, { useEffect, useState } from "react";
import moment from "moment";
import parse from "html-react-parser";
import { getNewsPostRes, getNewsListRes } from "../../helper";
import { onEntryChange } from "../../contentstack-sdk";
import Skeleton from "react-loading-skeleton";
import RenderComponents from "../../components/render-components";
// import ArchiveRelative from '../../components/archive-relative';
import { Page, NewsPosts, PageUrl } from "../../typescript/pages";

export default function ArticlePost({
  newsPost,
  page,
  pageUrl,
}: {
  newsPost: NewsPosts;
  page: Page;
  pageUrl: PageUrl;
}) {
  const [getPost, setPost] = useState({ banner: page, post: newsPost });
  async function fetchData() {
    try {
      const entryRes = await getNewsPostRes(pageUrl);
      const bannerRes = await getNewsListRes("/news");
      if (!entryRes || !bannerRes) throw new Error("Status: " + 404);
      setPost({ banner: bannerRes, post: entryRes });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    onEntryChange(() => fetchData());
  }, [newsPost]);

  const { post, banner } = getPost;
  return (
    <>
      <RenderComponents
        newsPost
        post={post}
        contentTypeUid="news"
        entryUid={post?.uid}
        locale={post?.locale}
        pageComponents={[]}
      />
    </>
  );
}
export async function getServerSideProps({ params }: any) {
  try {
    const page = await getNewsListRes("/news");
    const posts = await getNewsPostRes(`/news/${params.post}`);
    if (!page || !posts) throw new Error("404");

    return {
      props: {
        pageUrl: `/news/${params.post}`,
        newsPost: posts,
        page,
      },
    };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
}
