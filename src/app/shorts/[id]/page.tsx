'use client'
import Image from "next/image";
import {useEffect, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import Api from "@/component/api";
import Body from "@/component/common/body";
import ShortsMain from "@/component/ShortsMain";

export default function Short() {
  const router = useRouter();
  const pathname = usePathname();
  const [commentShow, setCommentShow] = useState<boolean>(false);
  const [currentShorts, setCurrentShorts] = useState<any>({});
  const [nextShorts, setNextShorts] = useState<any>({});

  const moveNextShorts = async () => {
    router.push('/shorts/' + nextShorts['id']);
  }

  useEffect(() => {
    Api.get('/youtube/api/shorts/' + pathname.replace('/shorts/', '')).then((data: any) => {
      setCurrentShorts(data.data.current_shorts);
      setNextShorts(data.data.next_shorts);
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
            <div className="shorts-main-btn">
              <i className="bi bi-hand-thumbs-up-fill"></i>
            </div>
            <div className="shorts-main-text-like">
              {currentShorts['like_cnt'] < 1000 && '좋아요'}
              {(currentShorts['like_cnt'] >= 1000) && currentShorts['like_cnt']}
            </div>
            <div className="shorts-main-btn">
              <i className="bi bi-hand-thumbs-down-fill"></i>
            </div>
            <div className="shorts-main-text-like">
              {currentShorts['dislike_cnt'] < 1000 && '싫어요'}
              {(currentShorts['dislike_cnt'] >= 1000) && currentShorts['dislike_cnt']}
            </div>
            <div className="shorts-main-btn" onClick={() => setCommentShow(!commentShow)}>
              <i className="bi bi-chat-left-dots-fill"></i>
            </div>
            <div className="shorts-main-text">
              댓글
            </div>
            <div className="shorts-main-btn">
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
                  <span>댓글</span> <span>211</span>
                </div>
                <div className="shorts-main-comment-body">
                  213
                </div>
                <div className="shorts-main-comment-footer">
                  213
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Body>
  );
}
