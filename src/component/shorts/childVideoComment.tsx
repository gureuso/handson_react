'use client';

import {useState} from "react";
import Api from "@/component/api";

const ChildVideoComment = ({getComments, videoId, commentId}: {getComments: () => void, videoId: number, commentId: number}) => {
  const [childComment, setChildComment] = useState("");

  const createChildComment = async (commentId: number) => {
    if (childComment == null || childComment == "") {
      return alert("답글이 비어 있습니다.");
    }
    Api.post('/youtube/api/videos/' + videoId + "/comments/" + commentId, {content: childComment}).then(() => {
      setChildComment("");
      getComments();
    });
  }

  return (<>
    <div className="video-main-child-comment d-flex">
      <input type="text" placeholder="답글 추가..." onChange={(e) => setChildComment(e.target.value)} value={childComment} />
      <button onClick={() => {createChildComment(commentId)}}>답글</button>
    </div>
  </>)
};

export default ChildVideoComment;
