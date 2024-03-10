import { Inter } from "next/font/google";
import "./globals.css";
import MainLayout from './(pages)/MainLayout';
import { Providers } from './redux/provider';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col items-center pt-[80px] bg-white">
          <Providers>
          <MainLayout></MainLayout>
            {children}
          </Providers>
        </main>        
      </body>
    </html>
  );
}
