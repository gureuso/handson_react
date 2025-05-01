'use client';

import Body from "@/component/common/body";
import {Button, Form, InputGroup} from "react-bootstrap";
import {useState} from "react";
import axios from "axios";
import api from "@/component/api";

export default function Short() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [emailCode, setEmailCode] = useState("");

  const sendSMS = async () => {
    await api.post(
      "/youtube/api/auth/sms",
      {phone: phoneNumber},
      {headers: {"Content-Type": "application/json"}},
    );
    alert("인증 번호가 발송 되었습니다.");
  }

  const receivePhoneCode = async () => {
    await api.get(
      `/youtube/api/auth/sms?code=${phoneCode}`,
    );
    alert("인증이 완료 되었습니다.");
  }

  const sendEmail = async () => {
    await api.post(
      "/youtube/api/auth/email",
      {headers: {"Content-Type": "application/json"}},
    );
    alert("인증 번호가 발송 되었습니다.");
  }

  const receiveEmailCode = async () => {
    await api.get(
      `/youtube/api/auth/email?code=${emailCode}`,
    );
    alert("인증이 완료 되었습니다.");
  }

  return (
    <Body>
      <div className="mt-2 row">
        <div className="col-4">
        </div>
        <div className="col-4">
          <div className="mb-1">
            문자인증
          </div>
          <InputGroup className="mb-1">
            <Form.Control
              placeholder="전화번호"
              aria-label="전화번호"
              aria-describedby="basic-addon1"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <Button variant="outline-secondary" id="button-addon1" onClick={() => sendSMS()}>
              발송
            </Button>
          </InputGroup>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="인증번호"
              aria-label="인증번호"
              aria-describedby="basic-addon2"
              onChange={(e) => setPhoneCode(e.target.value)}
            />
            <Button variant="outline-secondary" id="button-addon2" onClick={() => receivePhoneCode()}>
              인증
            </Button>
          </InputGroup>

          <div className="mb-1">
            이메일인증
          </div>
          <InputGroup className="mb-1">
            <Form.Control
              placeholder="가입한 이메일로 발송"
              aria-label="가입한 이메일로 발송"
              aria-describedby="basic-addon3"
              disabled={true}
            />
            <Button variant="outline-secondary" id="button-addon3" onClick={() => sendEmail()}>
              발송
            </Button>
          </InputGroup>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="인증번호"
              aria-label="인증번호"
              aria-describedby="basic-addon4"
              onChange={(e) => setEmailCode(e.target.value)}
            />
            <Button variant="outline-secondary" id="button-addon4" onClick={() => receiveEmailCode()}>
              인증
            </Button>
          </InputGroup>
        </div>
        <div className="col-4">
        </div>
      </div>
    </Body>
  );
}
