'use client';

import { GOOGLE_CLIENT_ID, GITHUB_CLIENT_ID, KAKAO_CLIENT_ID } from '@/config.json';
import SigninBody from "@/component/common/signinBody";
import Image from "next/image";

export default function Subscription() {
  const get_redirect_uri = (provider: string) => {
    const protocol = location.protocol;
    const port = protocol === 'https:' ? ':443' : ':8888';
    const hostname = window.location.hostname;

    return protocol + '//' + hostname + port + '/youtube/api/callback/' + provider;
  }

  return (
    <SigninBody>
      <div className="mt-2 row">
        <div className="col-4">
        </div>
        <div className="col-4">
          <div id="google-login" className="login" onClick={() => window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?' +
            'scope=email%20profile&' +
            'response_type=code&' +
            'state=security_token%3D138r5719ru3e1%26url%3Dhttps://oauth2.example.com/token&' +
            'redirect_uri=' + get_redirect_uri('google') + '&' +
            'client_id=' + GOOGLE_CLIENT_ID}>
            <span>
              <Image src="/img/login_google_icon.png" alt=""/>
            </span>
            <span>구글로 시작</span>
          </div>
          <div id="kakao-login" className="login" onClick={() => window.location.href = 'https://kauth.kakao.com/oauth/authorize?' +
            'client_id=' + KAKAO_CLIENT_ID + '&' +
            'redirect_uri=' + get_redirect_uri('kakao') + '&' +
            'response_type=code'}>
            <span>
              <Image src="/img/login_kakao_icon.png" alt=""/>
            </span>
            <span>카카오로 시작</span>
          </div>
          <div id="github-login" className="login"
               onClick={() => window.location.href = 'https://github.com/login/oauth/authorize?client_id=' + GITHUB_CLIENT_ID + '&redirect_uri=' + get_redirect_uri('github')}>
            <span>
              <Image src="/img/login_github_icon.png" alt=""/>
            </span>
            <span>깃허브로 시작</span>
          </div>
        </div>
        <div className="col-4">
        </div>
      </div>
    </SigninBody>
  );
}
