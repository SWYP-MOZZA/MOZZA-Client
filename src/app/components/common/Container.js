export default function Container({children,type,style}){
    return(
        <div className={`${type} ${style}`}>
            <div>{children}</div>
        </div>
    )
}