"use client"
import Header from '../components/common/Header';
import { QueryClient, QueryClientProvider } from 'react-query';
import { FaBeer } from "react-icons/fa";

const queryClient = new QueryClient();

export default function MainLayout({children}){
    return(
        <QueryClientProvider client={queryClient}>
            <Header/>
            {children}
        </QueryClientProvider>
    )
}