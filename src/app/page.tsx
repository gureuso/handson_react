'use client';
import {useEffect, useState} from "react";
import Body from "@/component/common/body";
import VideoMain from "@/component/videoMain";
import Image from "next/image";
import Api from "@/component/api";

export default function Home() {
  const [res, setRes] = useState({tags: [], videos: [], shorts: []});
  const [tag, setTag] = useState("전체");

  useEffect(() => {
    Api.get('/youtube/api/videos')
      .then((data) => setRes(data.data))
  }, []);

  return (
    <Body>
      <ul className="video-tag">
        <li onClick={() => setTag("전체")} value="전체" className={tag === "전체" ? "active" : ""}>전체</li>
        {res.tags.map((tag: any, idx) => (
          <li key={idx} onClick={() => setTag(tag.name)} value={tag.name} className={tag === tag.name ? "active" : ""}>{tag.name}</li>)
        )}
      </ul>

      <div className="video-main">
        <div className="row">
          {res.videos.map((video: any, idx) => (
            (video.tag === tag || tag === "전체") ? <div key={idx+100} className="col-lg-4 col-sm-6" style={{cursor: "pointer"}}>
              <VideoMain
                width="100%"
                height={undefined}
                key={idx}
                src={video.content}
                poster={video.thumbnail}
              />
              <div className="row" style={{marginTop: 10}}>
                <div className="col-2">
                  <Image style={{borderRadius: 30}} alt="" src={video.image} width="30" height="30"/>
                </div>
                <div className="col-10 m-0 p-0">
                  <span>{video.title}</span><br/>
                  <span style={{fontSize: 14, color: "gray"}}>{video.name}</span><br/>
                  <span style={{fontSize: 14, color: "gray"}}>조회수 {video.view_cnt}회 2시간 전</span>
                </div>
              </div>
            </div> : <></>
          ))}
        </div>
      </div>

      <div className="shorts-sub">
        <Image style={{marginBottom: 20}} alt="" src="/img/shorts_logo.png" width="110" height="35"/>
        <div className="row">
          {res.shorts.map((shorts: any, idx) => (
            <div key={idx+1000} className="col-lg-3 col-sm-4" style={{cursor: "pointer"}}>
              <VideoMain
                width="100%"
                height="85%"
                key={idx}
                src={shorts.content}
                poster={shorts.thumbnail}
              />
              <p className="p-0 m-0">{shorts.title}</p>
              <p className="p-0 m-0">조회수 {shorts.view_cnt}회</p>
            </div>
          ))}
        </div>
      </div>
    </Body>
  );
}
