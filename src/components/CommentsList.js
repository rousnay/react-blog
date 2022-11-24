import React from "react";
import shortid from "shortid";
const CommentsList = ({ comments }) => {
  return (
    <>
      <h3>Comments:</h3>
      {comments
        .slice(0)
        .reverse()
        .map((comment) => {
          return (
            <div className="comment" key={shortid.generate()}>
              <h4>{comment.postedBy}</h4>
              <p>{comment.text}</p>
            </div>
          );
        })}
    </>
  );
};

export default CommentsList;
