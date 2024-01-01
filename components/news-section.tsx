import React from "react";
import parse from "html-react-parser";
import Link from "next/link";
import { UrlObject } from "url";

import StarRating from "react-star-rating-component";

type NewsProps = {
  more_such_articles: any;
  news_section: any;
  title: String;
};

export default function NewsPageSection({ post }: { post: NewsProps }) {
  const description = post.news_section[2].news_body.news_description.children;
  return (
    <div>
      <div className="NewsPageSection">
        <div className="leftSection">
          <h1 className="title">Related Articles</h1>
          <div>
            {post.more_such_articles?.map(
              (
                card: {
                  url: string | UrlObject;
                  title:
                    | string
                    | number
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | React.ReactFragment
                    | React.ReactPortal
                    | null
                    | undefined;
                },
                index: React.Key | null | undefined
              ) => (
                <div className="cards" key={index}>
                  <div className="card-cta">
                    {card.url && card.title && (
                      <Link href={card.url}>
                        <a className="btn primary-btn">{card.title}</a>
                      </Link>
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
        <div className="rightSection">
          <h1 className="title">{post.title}</h1>
          <p> {parse(description[0].children[0].text)}</p>
          <p> {parse(description[0].children[1].text)}</p>
          <p> {parse(description[1].children[0].text)}</p>
          <h2>{post.news_section[3].about_author.author_name}</h2>
          <StarRating
            value={post.news_section[3].about_author.author_rating}
            starCount={5}
            starColor={"#ffb400"}
            emptyStarColor={"#ccc"}
          />
        </div>
      </div>
    </div>
  );
}
