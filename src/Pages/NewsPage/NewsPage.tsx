import React, { FC, useMemo } from "react";
import { useGetBusinessNews } from "../../shared/hooks/useGetBusinessNews";

export type NewsPageProps = {
  // Define your props here
};

export const NewsPage: FC<NewsPageProps> = () => {
  const { data } = useGetBusinessNews();

  const renderNews = useMemo(() => {
    return data?.map((article, index) => (
      <>
        {article.author && (
          <div>
            <li className="ml-5 text-black" key={index}>
              {article?.author}
            </li>
          </div>
        )}
      </>
    ));
  }, [data]);

  return <div className="mt-3">{renderNews}</div>;
};

export default NewsPage;
