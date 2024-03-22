"use client"
import Header from '../components/common/Header';
import React,{Suspense} from 'react';

export default function MainLayout({children}){
    return(
        <div>
            <script defer src="https://cdn.swygbro.com/public/widget/swyg-widget.js"></script>
            <Header/>
            {children}
        </div>
    )
}