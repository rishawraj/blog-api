import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import CommentForm from "./CommentForm";
import { toast } from "react-toastify";
import styles from "../styles/Post.module.css";
import { Link } from "react-router-dom";
// import Footer from "../components/Footer";

function Post() {
  const { id } = useParams();
  const [postData, setPostData] = useState({});
  const [comments, setComments] = useState([]);
  const [counter, setCounter] = useState(0);
  const [likeCounter, setLikeCounter] = useState(0);

  const handleLike = () => {
    const token = localStorage.getItem("jwttoken");

    if (!token) {
      toast.info("Please Login before liking");
      return;
    }

    fetch(`/api/posts/${id}/like`, {
      method: "PUT",
      body: JSON.stringify({
        postId: id,
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        toast.success(data.message);
      });

    setLikeCounter(likeCounter + 1);
  };

  const incrementCounter = () => {
    setCounter(counter + 1);
  };

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log(res.status + " " + res.text);
        }
      })
      .then((data) => {
        // console.log(data);
        setPostData(data);
        setLikeCounter(data.likes.length);
      });
  }, [id, likeCounter]);

  useEffect(() => {
    fetch(`/api/comments/${id}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log(res.status + " " + res.text);
        }
      })
      .then((data) => {
        setComments(data);
      });
  }, [id, counter]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const options = {
      minute: "2-digit",
      hour: "numeric",
      hour12: true,
      day: "numeric",
      month: "short",
      year: "2-digit",
    };
    return date.toLocaleString("en-US", options);
  };

  const lightColors = [
    "#f8f9fa", // Light Gray
    "#f1f8e9", // Pale Green
    "#f0f4c3", // Greenish Beige
    "#fff9c4", // Light Yellow
    "#fffde7", // Very Pale Yellow
    "#e1f5fe", // Light Blue
    "#e0f7fa", // Pale Cyan
    "#f3e5f5", // Light Lavender
    "#fce4ec", // Misty Pink
    "#fff3e0", // Cream
  ];

  return (
    <>
      <Navbar />
      {/* <div>
        <Link
          style={{
            border: "2px solid black",
            padding: "5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
          }}
          to={"/"}
        >
          <i className="fas fa-arrow-left"></i>
        </Link>
      </div> */}

      <div
        style={{
          position: "fixed",
          top: "80px",
          left: "100px",
          zIndex: "9999",
        }}
      >
        <Link
          style={{
            border: "2px solid black",
            padding: "5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            borderRadius: "7px",
            backgroundColor: "#e1f5fe",
          }}
          to={"/"}
        >
          <i className="fas fa-arrow-left"></i>
        </Link>
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <h1>{postData.title}</h1>
          <div
            style={{
              display: "flex",
              gap: "15px",
              alignItems: "center",
            }}
          >
            <p style={{ fontWeight: "400", fontSize: "18px" }}>
              {postData.author}
            </p>

            <p style={{ color: "gray", fontSize: "15px" }}>
              {formatDate(postData.timestamp)}
            </p>
          </div>
          <img className={styles.image} src="../post-image.jpg" alt="image" />

          <div
            className={styles.para}
            dangerouslySetInnerHTML={{ __html: postData.content }}
          />
        </div>

        <hr />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            marginBlock: "15px",
          }}
        >
          <button onClick={handleLike}>
            <span className="like-icon">❤️</span>
            <span className="like-text">{likeCounter} Likes</span>
          </button>
        </div>

        <CommentForm id={id} setCounter={incrementCounter} />

        {comments.map((comment, i) => {
          return (
            <div
              key={i}
              style={{
                backgroundColor: `${
                  lightColors[Math.floor(Math.random() * lightColors.length)]
                }`,
                padding: "10px",
                marginBottom: "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "start",
                borderRadius: "10px",
                border: "2px solid black",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  marginBottom: "5px",
                }}
              >
                <h3>{comment.username}</h3>
                <p style={{ color: "gray" }}>{formatDate(comment.timestamp)}</p>
              </div>
              <p>{comment.content}</p>
            </div>
          );
        })}

        {/*  */}
      </div>

      {/* <Footer /> */}
    </>
  );
}

export default Post;
