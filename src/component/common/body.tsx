'use client';

import React from "react";
import {usePathname, useRouter} from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import {Dropdown} from "react-bootstrap";
import Image from "next/image";
import { APP_MODE } from '@/config.json';

interface IProps {
  children: React.ReactNode;
}

export default function Body({children}: IProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="row p-3">
      <div className="col-lg-12 d-flex justify-content-between">
        <div className="header-logo" onClick={() => router.push('/')}>
          <Image priority={true} src="/img/youtube_icon.png" alt="" width="110" height="35"/>
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
            <Dropdown>
              <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
                <Image src="/img/profile.png" height="40" width="40" alt="" style={{ borderRadius: '50%' }} />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {APP_MODE === 'development' ?
                  <Dropdown.Item href="http://localhost:8888/youtube/api/signout">로그아웃</Dropdown.Item> :
                  <Dropdown.Item href="https://youtube-api.devmaker.kr/youtube/api/signout">로그아웃</Dropdown.Item>}
                <Dropdown.Item href="/auth">유저인증</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-2 mt-4">
          <div className="nav-main">
            <div className={`nav-sub p-2 ${pathname === '/' ? 'active' : ''}`} onClick={() => router.push("/")}>
              <i className="bi bi-house text-white"></i>
              <span>홈</span>
            </div>
            <div className={`nav-sub p-2 ${pathname === '/shorts' ? 'active' : ''}`} onClick={() => router.push("/shorts/1")}>
              <i className="bi bi-film text-white"></i>
              <span>Shorts</span>
            </div>
            <div className={`nav-sub p-2 ${pathname === '/subscriptions' ? 'active' : ''}`} onClick={() => router.push("/subscriptions")}>
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
