'use client'
import Image from "next/image";
import React, {useEffect, useRef, useState} from "react";
import {usePathname} from "next/navigation";
import Api from "@/component/api";
import Body from "@/component/common/body";
import ChildVideoComment from "@/component/shorts/childVideoComment";

export default function Short() {
  const [messages, setMessages] = useState<any>([]);
  const [message, setMessage] = useState("");
  const socketRef = useRef<any>(null);

  const pathname = usePathname();
  const [likeDislike, setLikeDislike] = useState<any>({like: {}, dislike: {}});
  const [comments, setComments] = useState<any>([]);
  const [comment, setComment] = useState<any>("");
  const [video, setVideo] = useState<any>({});
  const [videoUser, setVideoUser] = useState<any>({});
  const [user, setUser] = useState<any>({profile_image: "https://gureuso.s3.ap-northeast-2.amazonaws.com/gomin/gomin_profile_02.png"});
  const [channel, setChannel] = useState<any>({image: "https://gureuso.s3.ap-northeast-2.amazonaws.com/gomin/gomin_profile_02.png"});
  const [subscription, setSubscription] = useState<any>(false);

  const getComments = async () => {
    Api.get('/youtube/api/videos/' + pathname.replace('/video/', '') + '/comments').then((data: any) => {
      setComments(data.data.comments);
      setUser(data.data.user);
    });
  }

  const fixComment = async (commentId: number) => {
    Api.post('/youtube/api/videos/' + pathname.replace('/video/', '') + '/comments/' + commentId + '/fix').then(() => {
      getComments();
    });
  }

  const createComment = async () => {
    if (comment == null || comment == "") {
      return alert("댓글이 비어 있습니다.");
    }
    Api.post('/youtube/api/videos/' + pathname.replace('/video/', '') + "/comments", {content: comment}).then(() => {
      setComment("");
      getComments();
    });
  }

  const share = async () => {
    const currentUrl = window.location.href;
    await navigator.clipboard.writeText(currentUrl);
    alert('주소가 클립보드에 복사되었습니다.');
  }

  const like = async () => {
    Api.post('/youtube/api/videos/' + pathname.replace('/video/', '') + '/like').then((data: any) => {
      setLikeDislike(data.data);
    });
  }

  const dislike = async () => {
    Api.post('/youtube/api/videos/' + pathname.replace('/video/', '') + '/dislike').then((data: any) => {
      setLikeDislike(data.data);
    });
  }

  const commentLike = async (commentId: number) => {
    Api.post('/youtube/api/videos/' + pathname.replace('/video/', '') + '/comments/' + commentId + '/like').then(() => {
      getComments();
    });
  }

  const commentDislike = async (commentId: number) => {
    Api.post('/youtube/api/videos/' + pathname.replace('/video/', '') + '/comments/' + commentId + '/dislike').then(() => {
      getComments();
    });
  }

  const sendMessage = () => {
    socketRef.current.send(JSON.stringify({content: message, ...user}));
    setMessage("");
  };

  const subscribe = () => {
    Api.post('/youtube/api/channel/' + channel.id + '/subscription').then((data: any) => {
      setSubscription(data.data.subscription);
    });
  }

  useEffect(() => {
    Api.get('/youtube/api/videos/' + pathname.replace('/video/', '')).then((data: any) => {
      setLikeDislike({like: data.data.liked, dislike: data.data.disliked});
      setChannel(data.data.channel);
      setVideo(data.data.video);
      setMessages(data.data.messages);
      setSubscription(data.data.subscription);
      setVideoUser(data.data.video_user);
    });
    getComments();
  }, []);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8888/ws/chat/" + pathname.replace('/video/', ''));
    socketRef.current = socket

    socket.onopen = () => {
      console.log("WebSocket connected!");
    };

    socket.onmessage = (event) => {
      setMessages((prev: any) => [JSON.parse(event.data), ...prev]);
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected!");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  return (
    <Body>
      <div className="video-main">
        <div className="row">
          <div className="col-lg-8">
            <video
              controls={true}
              autoPlay={true}
              muted={true}
              width={"100%"}
              height={"100%"}
              src={video.content}>
            </video>
          </div>
          <div className="col-lg-4">
            <div className="chat-main-comment">
              <div className="chat-main-comment-body overflow-y-auto">
                {messages.map((chat: any, index: number) => (
                  <div key={index} className="d-flex" style={{marginBottom: 5}}>
                    <div>
                      <Image style={{borderRadius: 10, marginTop: 3, marginRight: 15}} src={chat.profile_image} alt="" width={20} height={20}/>
                    </div>
                    <div>
                      <span style={{fontSize: 14, marginRight: 10, opacity: 0.8}}>{chat.nickname}</span>
                    </div>
                    <div><p style={{marginBottom: 5, marginTop: 4, fontSize: 14, wordBreak: "break-all"}}>{chat.content}</p></div>
                  </div>
                ))}
              </div>
              <div className="chat-main-comment-footer d-flex">
                <input type="text" placeholder="댓글 추가..." onChange={(e) => setMessage(e.target.value)} value={message} />
                <button onClick={sendMessage}>댓글</button>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <h5>{video.title}</h5>
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                 <div>
                   <Image style={{borderRadius: 50, marginRight: 10, marginTop: 5}} src={channel.image} alt="" width="30" height="30"></Image>
                 </div>
                <div style={{marginRight: 30}}>
                  <div>{channel.name}</div>
                  <div style={{fontSize: 12, color: "#6c757d"}}>구독자 50명</div>
                </div>
                <div>
                  <div>
                    {!subscription && <button onClick={() => subscribe()} className="video-subscription-false">구독</button>}
                    {subscription && <div onClick={() => subscribe()} className="video-subscription-true"><i style={{marginRight: 10}} className="bi bi-bell"></i>구독중</div>}
                  </div>
                </div>
              </div>
              <div className="d-flex">
                <div className="video-like like" onClick={() => like()}>
                  <i style={{marginRight: 4}} className={`bi ${likeDislike.like.liked ? "bi-hand-thumbs-up-fill" : "bi-hand-thumbs-up"}`}></i>{likeDislike.like.cnt}
                </div>
                <div className="video-like dislike" onClick={() => dislike()}>
                  <i style={{marginLeft: 4, marginRight: 8}} className={`bi ${likeDislike.dislike.disliked ? "bi-hand-thumbs-down-fill" : "bi-hand-thumbs-down"}`}></i>{likeDislike.dislike.cnt}
                </div>
                <div onClick={() => share()} style={{marginLeft: 10}} className="video-share"><i className="bi bi-share"></i>공유</div>
              </div>
            </div>
            <div className="video-main-comment">
              <div className="video-main-comment-header">
                <span>댓글</span> <span>{comments.length}</span>
              </div>
              <div className="video-main-comment-footer d-flex">
                <div>
                  <Image style={{borderRadius: 20}} src={user.profile_image} alt="" width="30" height="30"></Image>
                </div>
                <input type="text" placeholder="댓글 추가..." onChange={(e) => setComment(e.target.value)} value={comment} />
                <button onClick={createComment}>댓글</button>
              </div>
              <div className="video-main-comment-body">
                {comments.map((comment: any, index: number) => (
                  <div key={index} className="d-flex">
                    <div>
                      <Image style={{borderRadius: 10, marginTop: 3}} src={comment.profile_image} alt="" width={40} height={40}/>
                    </div>
                    <div className="d-flex">
                      <div style={{paddingLeft: 15, marginBottom: 10}} className="d-flex flex-column">
                        <div>
                          {comment.is_fixed && <span style={{fontSize: 12}}><i className="bi bi-pin-angle" style={{fontSize: 10}}></i>&nbsp;{videoUser.nickname}님이 고정함</span>}
                        </div>

                        <span style={{fontSize: 14}}>@{comment.nickname}</span>
                        <p style={{marginBottom: 5, fontSize: 16, wordBreak: "break-all"}}>{comment.content}</p>
                        <p>
                          <i onClick={() => {commentLike(comment.id);}} style={{cursor: "pointer"}} className={`bi ${comment.liked ? 'bi-hand-thumbs-up-fill' : 'bi-hand-thumbs-up'}`}></i><span style={{marginLeft: 3}}>{comment.like_cnt}</span>
                          <i onClick={() => {commentDislike(comment.id);}} style={{cursor: "pointer", marginLeft: 5}} className={`bi ${comment.disliked ? 'bi-hand-thumbs-down-fill' : 'bi-hand-thumbs-down'}`}></i><span style={{marginLeft: 3}}>{comment.dislike_cnt}</span>
                        </p>

                        <ChildVideoComment getComments={getComments} commentId={comment.id} videoId={video.id} />

                        {comment.child_comments.map((childComment: any, index: number) => (
                          <div key={index} className="d-flex">
                            <div>
                              <Image style={{borderRadius: 10, marginTop: 10}} src={childComment.profile_image} alt="" width={30} height={30}/>
                            </div>
                            <div style={{paddingLeft: 15, width: 210, marginBottom: 10, marginTop: 5}} className="d-flex flex-column">
                              <span style={{fontSize: 14}}>@{childComment.nickname}</span>
                              <p style={{marginBottom: 5, fontSize: 16, wordBreak: "break-all"}}>{childComment.content}</p>
                              <p>
                                <i onClick={() => {commentLike(childComment.id);}} style={{cursor: "pointer"}} className={`bi ${childComment.liked ? 'bi-hand-thumbs-up-fill' : 'bi-hand-thumbs-up'}`}></i><span style={{marginLeft: 3}}>{childComment.like_cnt}</span>
                                <i onClick={() => {commentDislike(childComment.id);}} style={{cursor: "pointer", marginLeft: 5}} className={`bi ${childComment.disliked ? 'bi-hand-thumbs-down-fill' : 'bi-hand-thumbs-down'}`}></i><span style={{marginLeft: 3}}>{childComment.dislike_cnt}</span>
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div>
                        {videoUser.id === user.id && <i onClick={() => fixComment(comment.id)} style={{cursor: "pointer"}} className={`bi ${comment.is_fixed ? 'bi-pin-angle-fill': 'bi-pin-angle'}`}></i>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-lg-4"></div>
        </div>
      </div>
    </Body>
  );
}
