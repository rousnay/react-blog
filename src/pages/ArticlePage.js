import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useUser from "../hooks/useUser";
import AddCommentForm from "../components/AddCommentForm";
import CommentsList from "../components/CommentsList";
import NotFoundPage from "./NotFoundPage";
import articles from "./article-content";

const ArticlePage = () => {
  const { user } = useUser();
  const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });
  const { articleId } = useParams();
  const article = articles.find((article) => article.name === articleId);

  useEffect(() => {
    const loadArticleInfo = async () => {
      const response = await axios.get(`/api/articles/${articleId}`);
      const newArticleInfo = response.data;
      setArticleInfo(newArticleInfo);
    };
    loadArticleInfo();
  }, [articleId]);

  const addUpvotes = async () => {
    const response = await axios.put(`/api/articles/${articleId}/upvotes`);
    const newUpvotedArticleInfo = response.data;
    setArticleInfo(newUpvotedArticleInfo);
  };

  if (!article) {
    return <NotFoundPage />;
  }

  return (
    <>
      <h1>{article.title}</h1>
      <div className="upvotes-section">
        {user ? (
          <button
            onClick={() => {
              addUpvotes();
            }}
          >
            Upvote
          </button>
        ) : (
          <button>Log in to upvote</button>
        )}
        <p>This article has {articleInfo.upvotes} upvote(s)</p>
      </div>
      {article.content.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
      {user ? (
        <AddCommentForm
          articleName={articleId}
          onCommentAdd={(updatedArticleData) =>
            setArticleInfo(updatedArticleData)
          }
        />
      ) : (
        <button>Log in to add a comment</button>
      )}
      <CommentsList comments={articleInfo.comments} />
    </>
  );
};

export default ArticlePage;
