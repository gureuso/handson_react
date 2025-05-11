'use client';
import {useState} from "react";
import Body from "@/component/common/body";
import VideoMain from "@/component/videoMain";

export default function Home() {
  const [tag, setTag] = useState("전체");
  const videoList = [
    { title: "파이썬으로 프로그래밍 시작하기", tag: "파이썬", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", poster: "https://cdn-prod.hanbit.co.kr/thumbnails/C2662526625_cover.jpg" },
    { title: "혼자 공부하는 파이썬", tag: "파이썬", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", poster: "https://cdn-prod.hanbit.co.kr/thumbnails/C5104434431_cover.jpg" },
    { title: "쿠버네티스로 시작하기", tag: "인프라", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", poster: "https://cdn-prod.hanbit.co.kr/thumbnails/C3865785505_cover.jpg" },
  ];
  const shortsList = [
    { title: "혼자 만들면서 공부하는 파이썬", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", poster: "https://www.hanbit.co.kr/data/books/B5580711889_l.jpg" },
    { title: "조코딩의 AI 비트코인 자동 매매 시스템 만들기", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", poster: "https://www.hanbit.co.kr/data/books/B5063161940_l.jpg" },
    { title: "챗GPT 일타강사의 직장인 업무 만렙 공략집", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", poster: "https://www.hanbit.co.kr/data/books/B3218030348_l.jpg" },
    { title: "조코딩의 AI 비트코인 자동 매매 시스템 만들기", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", poster: "https://www.hanbit.co.kr/data/books/B5493589109_l.jpg" },
  ];

  return (
    <Body>
      <ul className="video-tag">
        <li onClick={() => setTag("전체")} value="전체" className={tag === "전체" ? "active" : ""}>전체</li>
        <li onClick={() => setTag("파이썬")} value="파이썬" className={tag === "파이썬" ? "active" : ""}>파이썬</li>
        <li onClick={() => setTag("인프라")} value="인프라" className={tag === "인프라" ? "active" : ""}>인프라</li>
      </ul>

      <div className="video-main">
        <div className="row">
          {videoList.map((video, idx) => (
            (video.tag === tag || tag === "전체") ? <div key={idx+100} className="col-lg-4 col-sm-6" style={{cursor: "pointer"}}>
              <VideoMain
                width="100%"
                height="80%"
                key={idx}
                src={video.src}
                poster={video.poster}
              />
              <div className="row" style={{marginTop: 10}}>
                <div className="col-2">
                  <img style={{borderRadius: 30}} alt="" src="/img/hanbit_logo.png" width="30" height="30"/>
                </div>
                <div className="col-10 m-0 p-0">
                  <span>{video.title}</span><br/>
                  <span style={{fontSize: 14, color: "gray"}}>한빛미디어</span><br/>
                  <span style={{fontSize: 14, color: "gray"}}>조회수 1.1만회 2시간 전</span>
                </div>
              </div>
            </div> : <></>
          ))}
        </div>
      </div>

      <div className="shorts-main">
        <img style={{marginBottom: 20}} alt="" src="/img/shorts_logo.png" width="90" height="35"/>
        <div className="row">
          {shortsList.map((video, idx) => (
            <div key={idx+1000} className="col-lg-3 col-sm-4" style={{cursor: "pointer"}}>
              <VideoMain
                width="100%"
                height="80%"
                key={idx}
                src={video.src}
                poster={video.poster}
              />
              <p className="p-0 m-0">{video.title}</p>
              <p className="p-0 m-0">조회수 10만회</p>
            </div>
          ))}
        </div>
      </div>
    </Body>
  );
}
