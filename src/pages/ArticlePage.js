import { useParams } from "react-router-dom";
import articles from "./article-content";

const ArticlePage = () => {
  const { articleId } = useParams();
  const article = articles.find((articles) => articles.name === articleId);

  return (
    <>
      <h1>{article.title}</h1>
      {article.content.map((paragraph, i) => {
        return <p key={i}>{paragraph}</p>;
      })}
    </>
  );
};

export default ArticlePage;
