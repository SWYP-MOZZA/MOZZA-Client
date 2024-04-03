"use client";
import React,{useEffect,useMemo, useState}from 'react';
import MeetConfirmed2 from '@/app/components/popup/meet-confirmed2';
import axios from 'axios';
import { SERVER_BASE_URL } from '@/app/constants/BaseUrl';
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=8728eb9b1a227742d8aef92354fbb090&`
export default function Test(){

    const test=async() =>{
      const response = await axios.get(`${SERVER_BASE_URL}/meeting/48/details`);
        console.log('모임 정보:', response.data);
          
    }

      useEffect(()=>{
        test();
      }
      ,[])
    
      return (
        <div>
          dd
        </div>
      );
    };3