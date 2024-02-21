import Header from '../components/common/Header';

export default function MainLayout({children}){
    return(
        <div className='layout'>
            <Header/>
            {children}
        </div>
    )
}