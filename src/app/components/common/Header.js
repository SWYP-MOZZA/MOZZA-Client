import Link from 'next/link';

export default function Header(){
    return (
        <div className='navbar flex justify-between items-center fixed w-full h-[80px] top-0 left-0 shadow-sm px-[360px] bg-white'>
            <Link href='/' className='navbar_logo'>
                <img src='\smallLogo.svg' alt='이미지_설명' />
            </Link>
            <div className='navbar_list flex gap-32 items-center'>
                <Link href='/' className='navbar_list-item'>새 모임 만들기</Link>
                <Link href='/mypage' className='navbar_list-item'>내 모임</Link>
            </div>
            <div className='login w-[210px] h-12 px-8 bg-emerald-100 rounded-3xl justify-center items-center gap-2.5 inline-flex'>
                <Link href='/user/login' className='navbar_list-item'>로그인/회원가입</Link>
            </div>
        </div>
        
    );
}