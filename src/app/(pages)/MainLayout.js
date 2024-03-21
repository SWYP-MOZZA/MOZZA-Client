"use client"
import Header from '../components/common/Header';
import { QueryClient, QueryClientProvider } from 'react-query';
import { FaBeer } from "react-icons/fa";
import React,{Suspense} from 'react';

const queryClient = new QueryClient();

export default function MainLayout({children}){
    return(
        <Suspense fallback={<div>Loading...</div>}>
        <QueryClientProvider client={queryClient}>
            <script defer src="https://cdn.swygbro.com/public/widget/swyg-widget.js"></script>
            <Header/>
            {children}
        </QueryClientProvider>
        </Suspense>
    )
}