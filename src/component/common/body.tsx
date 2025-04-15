'use client';

import React from "react";
import {useRouter} from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Body({children}) {
  const router = useRouter();

  return (
    <div className="row p-3">
      <div className="col-lg-12 d-flex justify-content-between">
        <div className="header-logo" onClick={() => router.push('/')}>
          <img src="/img/youtube_icon.png" alt="" width="120"/>
        </div>
        <div>
          <div className="input-group header-search">
            <input type="text" className="form-control" placeholder="검색" />
            <div className="input-group-append">
              <span className="input-group-text">
                <i className="bi bi-search text-white mb-1"></i>
              </span>
            </div>
          </div>
        </div>
        <div>
          <div className="input-group header-login-profile">
            <div className="dropdown">
              <a className="dropdown-toggle text-white text-decoration-none" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="/img/profile.png" width="40" alt="" style={{borderRadius: '50%'}} />
              </a>

              <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li><a className="dropdown-item" href="/youtube/logout/">로그아웃</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-2 mt-4">
          <div className="nav-main">
            <div className="nav-sub p-2 {% if request.path == '/youtube' %}active{% endif %}" onClick={() => router.push("/")}>
              <i className="bi bi-house text-white"></i>
              <span>홈</span>
            </div>
            <div className="nav-sub p-2 {% if request.path == '/youtube/shorts' %}active{% endif %}" onClick={() => router.push("/shorts")}>
              <i className="bi bi-film text-white"></i>
              <span>Shorts</span>
            </div>
            <div className="nav-sub p-2 {% if request.path == '/youtube/subscriptions' %}active{% endif %}" onClick={() => router.push("/subscriptions")}>
              <i className="bi bi-bookmark text-white"></i>
              <span>구독</span>
            </div>
          </div>
        </div>
        <div className="col-lg-9 m-3">
          <div className="content-main">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
