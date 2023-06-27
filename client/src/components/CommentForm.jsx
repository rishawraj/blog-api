import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

function CommentForm({ id, setCounter }) {
  const [content, setContent] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("jwttoken");

    if (localStorage.getItem("jwttoken") === null) {
      toast.info("Please login before commenting!");
      return;
    }

    fetch(`/api/comments/${id}`, {
      method: "POST",
      body: JSON.stringify({
        content: content,
      }),

      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log(res.status + " " + res.text);
        }
      })
      .then((json) => {
        toast.error(json.error);
        setContent("");
        setCounter();
      });
  };

  return (
    <div
      style={{
        // backgroundColor: "lightblue",
        // border: "2px solid black",
        padding: " 20px 0",
      }}
    >
      <form onSubmit={handleSubmit}>
        {user && (
          <span style={{ fontWeight: "bold", marginRight: "10px" }}>
            {user.username}
          </span>
        )}
        <br />
        <input
          style={{
            width: "100%",
            padding: "10px 5px",
            margin: "10px 0",
            borderRadius: "10px",
            border: "2px solid black",
          }}
          type="text"
          name="message"
          placeholder="Comment"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />{" "}
        <br />
        <button style={{}} type="submit">
          comment
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default CommentForm;
