'use client'
import Image from "next/image";
import {useEffect, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import Api from "@/component/api";
import Body from "@/component/common/body";
import ShortsMain from "@/component/ShortsMain";
import ChildShortsComment from "@/component/shorts/childShortsComment";

export default function Short() {
  const router = useRouter();
  const pathname = usePathname();
  const [commentShow, setCommentShow] = useState<boolean>(false);
  const [currentShorts, setCurrentShorts] = useState<any>({});
  const [nextShorts, setNextShorts] = useState<any>({});
  const [likeDislike, setLikeDislike] = useState<any>({like: {}, dislike: {}});
  const [comments, setComments] = useState<any>([]);
  const [comment, setComment] = useState<any>("");

  const moveNextShorts = async () => {
    router.push('/shorts/' + nextShorts['id']);
  }

  const getComments = async () => {
    Api.get('/youtube/api/shorts/' + currentShorts['id'] + '/comments').then((data: any) => {
      setComments(data.data.comments);
    });
  }

  const createComment = async () => {
    if (comment == null || comment == "") {
      return alert("댓글이 비어 있습니다.");
    }
    Api.post('/youtube/api/shorts/' + currentShorts['id'] + "/comments", {content: comment}).then(() => {
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
    Api.post('/youtube/api/shorts/' + currentShorts['id'] + '/like').then((data: any) => {
      setLikeDislike(data.data);
    });
  }

  const dislike = async () => {
    Api.post('/youtube/api/shorts/' + currentShorts['id'] + '/dislike').then((data: any) => {
      setLikeDislike(data.data);
    });
  }

  const commentLike = async (commentId: number) => {
    Api.post('/youtube/api/shorts/' + currentShorts['id'] + '/comments/' + commentId + '/like').then(() => {
      getComments();
    });
  }

  const commentDislike = async (commentId: number) => {
    Api.post('/youtube/api/shorts/' + currentShorts['id'] + '/comments/' + commentId + '/dislike').then(() => {
      getComments();
    });
  }

  useEffect(() => {
    if (!commentShow) {
      return;
    }
    getComments();
  }, [commentShow]);

  useEffect(() => {
    Api.get('/youtube/api/shorts/' + pathname.replace('/shorts/', ''))
      .then((data: any) => {
        setCurrentShorts(data.data.current_shorts);
        setNextShorts(data.data.next_shorts);
        setLikeDislike({like: data.data.liked, dislike: data.data.disliked});
      });
  }, []);

  return (
    <Body>
      <div className="shorts-main">
        <div className="row">
          <div className={commentShow ? '' : 'col-lg-3'}></div>

          <div className={commentShow ? 'col-lg-6' : 'col-lg-6'}>
            <ShortsMain
              width="100%"
              height="100%"
              src={currentShorts['content']}>
            </ShortsMain>
          </div>

          <div className={`d-flex flex-column align-items-start ${commentShow ? 'col-lg-1' : 'col-lg-3'}`}>
            <div className="shorts-main-btn" onClick={() => like()}>
              <i className={`bi bi-hand-thumbs-up-fill ${likeDislike['like']['liked'] ? 'active' : ''}`}></i>
            </div>
            <div className="shorts-main-text-like">
              {likeDislike['like']['cnt'] < 1000 && <><span style={{color: 'black'}}>0</span>{likeDislike['like']['cnt']}</>}
              {(likeDislike['like']['cnt'] >= 1000) && likeDislike['like']['cnt']}
            </div>
            <div className="shorts-main-btn" onClick={() => dislike()}>
              <i className={`bi bi-hand-thumbs-down-fill ${likeDislike['dislike']['disliked'] ? 'active' : ''}`}></i>
            </div>
            <div className="shorts-main-text-like">
              {likeDislike['dislike']['cnt'] < 1000 && <><span style={{color: 'black'}}>0</span>{likeDislike['dislike']['cnt']}</>}
              {(likeDislike['dislike']['cnt'] >= 1000) && likeDislike['dislike']['cnt']}
            </div>
            <div className="shorts-main-btn" onClick={() => {setCommentShow(!commentShow);}}>
              <i className="bi bi-chat-left-dots-fill"></i>
            </div>
            <div className="shorts-main-text">
              댓글
            </div>
            <div className="shorts-main-btn" onClick={() => share()}>
              <i className="bi bi-share-fill"></i>
            </div>
            <div className="shorts-main-text">
              공유
            </div>
            <Image style={{borderRadius: 10, marginLeft: 3, marginTop: 5}} src="/img/hanbit_logo.png" alt="" width={30} height={30}/>
            <div
              onClick={() => moveNextShorts()}
              className="shorts-main-btn"
              style={{
                position: 'fixed',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 1000,
              }}
            >
              <i className="bi bi-arrow-down"></i>
            </div>
          </div>

          {commentShow && (
            <div className="col-lg-5">
              <div className="shorts-main-comment">
                <div className="shorts-main-comment-header">
                  <span>댓글</span> <span>{comments.length}</span>
                </div>
                <div className="shorts-main-comment-body overflow-y-auto">
                  {comments.map((comment: any, index: number) => (
                    <div key={index} className="d-flex">
                      <div>
                        <Image style={{borderRadius: 10, marginTop: 3}} src={comment.profile_image} alt="" width={40} height={40}/>
                      </div>
                      <div style={{paddingLeft: 15, width: 280, marginBottom: 10}} className="d-flex flex-column">
                        <span style={{fontSize: 14}}>@{comment.nickname}</span>
                        <p style={{marginBottom: 5, fontSize: 16, wordBreak: "break-all"}}>{comment.content}</p>
                        <p>
                          <i onClick={() => {commentLike(comment.id);}} style={{cursor: "pointer"}} className={`bi ${comment.liked ? 'bi-hand-thumbs-up-fill' : 'bi-hand-thumbs-up'}`}></i><span style={{marginLeft: 3}}>{comment.like_cnt}</span>
                          <i onClick={() => {commentDislike(comment.id);}} style={{cursor: "pointer", marginLeft: 5}} className={`bi ${comment.disliked ? 'bi-hand-thumbs-down-fill' : 'bi-hand-thumbs-down'}`}></i><span style={{marginLeft: 3}}>{comment.dislike_cnt}</span>
                        </p>

                        <ChildShortsComment getComments={getComments} commentId={comment.id} shortsId={currentShorts.id} />

                        {comment.child_comments.map((childComment: any, index: number) => (
                          <>
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
                          </>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="shorts-main-comment-footer d-flex">
                  <input type="text" placeholder="댓글 추가..." onChange={(e) => setComment(e.target.value)} value={comment} />
                  <button onClick={createComment}>댓글</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Body>
  );
}
