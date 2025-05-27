'use client';
import {useState} from "react";
import Body from "@/component/common/body";
import VideoMain from "@/component/videoMain";
import Image from "next/image";

export default function Home() {
  const [tag, setTag] = useState("전체");
  const videoList = [
    { title: "파이썬으로 프로그래밍 시작하기", tag: "파이썬", src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", poster: "https://cdn-prod.hanbit.co.kr/thumbnails/C2662526625_cover.jpg" },
    { title: "혼자 공부하는 파이썬", tag: "파이썬", src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", poster: "https://cdn-prod.hanbit.co.kr/thumbnails/C5104434431_cover.jpg" },
    { title: "쿠버네티스로 시작하기", tag: "인프라", src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", poster: "https://cdn-prod.hanbit.co.kr/thumbnails/C3865785505_cover.jpg" },
  ];
  const shortsList = [
    { title: "혼자 만들면서 공부하는 파이썬", src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", poster: "https://www.hanbit.co.kr/data/books/B5580711889_l.jpg" },
    { title: "조코딩의 AI 비트코인 자동 매매 시스템 만들기", src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", poster: "https://www.hanbit.co.kr/data/books/B5063161940_l.jpg" },
    { title: "소문난 명강의 김길성의 네트워크 딥다이브", src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", poster: "https://www.hanbit.co.kr/data/books/B9674813480_l.jpg" },
    { title: "요즘 교사를 위한 AI 수업 활용 가이드 with 2022 개정 교육과정", src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", poster: "https://www.hanbit.co.kr/data/books/B5865274723_l.jpg" },
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
                height={undefined}
                key={idx}
                src={video.src}
                poster={video.poster}
              />
              <div className="row" style={{marginTop: 10}}>
                <div className="col-2">
                  <Image style={{borderRadius: 30}} alt="" src="/img/hanbit_logo.png" width="30" height="30"/>
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

      <div className="shorts-sub">
        <Image style={{marginBottom: 20}} alt="" src="/img/shorts_logo.png" width="110" height="35"/>
        <div className="row">
          {shortsList.map((video, idx) => (
            <div key={idx+1000} className="col-lg-3 col-sm-4" style={{cursor: "pointer"}}>
              <VideoMain
                width="100%"
                height="85%"
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
