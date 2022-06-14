import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import LikeBlog from "./LikeBlog";
import Comment from './Comment';

export default function Blog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const docRef = doc(db, "Articles", id);
    onSnapshot(docRef, (snapshot) => {
        setBlog({ ...snapshot.data(), id: snapshot.id });
    });
  }, []);
  return (
    <div className="container border bg-light" style={{ marginTop: 70 }}>
      {blog && (
        <div className="row">
          <div className="col-3">
            <img
              src={blog?.imageUrl}
              alt={blog?.title}
              style={{ width: "100%", padding: 10 }}
            />
          </div>
          <div className="col-9 mt-3">
            <h2>{blog?.title}</h2>
            <h5>Author: {blog?.createdBy}</h5>
            <div> Posted on: {blog?.createdAt.toDate().toDateString()}</div>
            <hr />
            <h4>{blog?.description}</h4>

            <div className="d-flex flex-row-reverse">
              {user && <LikeBlog id={id} likes={blog?.likes} />}
              <div className="pe-2">
                <p>{blog?.likes?.length}</p>
              </div>
            </div>
            {/* comment  */}
            <Comment id={blog?.id} />
          </div>
        </div>
      )}
    </div>
  );
}