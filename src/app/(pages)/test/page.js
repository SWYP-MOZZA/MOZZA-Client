"use client";
import React,{useEffect,useMemo, useState}from 'react';
import MeetConfirmed2 from '@/app/components/popup/meet-confirmed2';
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=8728eb9b1a227742d8aef92354fbb090&`
export default function Test(){
    const handleKakaoLogin = () => {
        window.location.href = KAKAO_AUTH_URL;
      };
    
      return (
        <MeetConfirmed2 handleKakaoLogin={handleKakaoLogin} onDecline={() => console.log('Declined')} />
      );
    };