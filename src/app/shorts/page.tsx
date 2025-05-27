import Body from "@/component/common/body";
import ShortsMain from "@/component/ShortsMain";
import Image from "next/image";

export default function Short() {
  // const shortsList = [
  //   { src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
  //   { src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
  //   { src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
  //   { src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
  // ];

  return (
    <Body>
      <div className="shorts-main">
        <div className="row">
          <div className="col-lg-3">
          </div>
          <div className="col-lg-6">
            <ShortsMain
              width="100%"
              height="100%"
              src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4">
            </ShortsMain>
          </div>
          <div className="col-lg-3 d-flex flex-column align-items-start">
            <div className="shorts-main-btn">
              <i className="bi bi-hand-thumbs-up-fill"></i>
            </div>
            <div className="shorts-main-text-like">
              좋아요
            </div>
            <div className="shorts-main-btn">
              <i className="bi bi-hand-thumbs-down-fill"></i>
            </div>
            <div className="shorts-main-text-like">
              싫어요
            </div>
            <div className="shorts-main-btn">
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
        </div>
      </div>
    </Body>
  );
}
