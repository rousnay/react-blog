import { useState } from "react";
import axios from "axios";

const AddCommentForm = ({ articleName, onCommentAdd }) => {
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const addComment = async () => {
    const response = await axios.post(`/api/articles/${articleName}/comments`, {
      postedBy: name,
      text: text,
    });
    const updatedArticleInfo = response.data;
    onCommentAdd(updatedArticleInfo);
    setName("");
    setText("");
  };

  return (
    <div className="add-comment-form">
      <h3>Add a Comment</h3>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Comment:
        <textarea
          rows="4"
          cols="50"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </label>
      <button
        onClick={() => {
          addComment();
        }}
      >
        Add Comment
      </button>
    </div>
  );
};

export default AddCommentForm;
