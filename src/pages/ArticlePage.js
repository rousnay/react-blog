import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useUser from "../hooks/useUser";
import axios from "axios";
import AddCommentForm from "../components/AddCommentForm";
import CommentsList from "../components/CommentsList";
import NotFoundPage from "./NotFoundPage";
import articles from "./article-content";

const ArticlePage = () => {
  const { user } = useUser();
  const { articleId } = useParams();
  const [articleInfo, setArticleInfo] = useState({
    upvotes: 0,
    comments: [],
    canUpvote: false,
  });
  const { canUpvote } = articleInfo;
  const article = articles.find((article) => article.name === articleId);

  useEffect(() => {
    const loadArticleInfo = async () => {
      if (user) {
        const token = await user.getIdToken();
        const headers = { authtoken: token };
        const response = await axios.get(`/api/articles/${articleId}`, {
          headers,
        });
        const newArticleInfo = response.data;
        setArticleInfo(newArticleInfo);
      } else {
        setArticleInfo({
          upvotes: 0,
          comments: [],
          canUpvote: false,
        });
      }
    };

    loadArticleInfo();
  }, [user, articleId]);

  const addUpvotes = async () => {
    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};
    const response = await axios.put(
      `/api/articles/${articleId}/upvotes`,
      null,
      { headers }
    );
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
            {canUpvote ? "Upvote" : "Already Upvoted"}
          </button>
        ) : (
          <Link to="/login">
            <button>Log in to upvote</button>
          </Link>
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
        <Link to="/login">
          <button>Log in to add a comment</button>
        </Link>
      )}
      <CommentsList comments={articleInfo.comments} />
    </>
  );
};

export default ArticlePage;
