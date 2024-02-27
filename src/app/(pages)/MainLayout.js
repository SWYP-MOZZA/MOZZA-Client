import Header from '../components/common/Header';
import { FaBeer } from "react-icons/fa";
export default function MainLayout({children}){
    return(
        <div>
            <Header/>
            {children}
        </div>
    )
}