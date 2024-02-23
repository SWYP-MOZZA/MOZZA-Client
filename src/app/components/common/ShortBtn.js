export default function ShortBtn({children,style,disabled,onClick}){
    return(
        <button className={style} disabled={disabled} onClick={onClick}>
            <div className='btnText'>{children}</div>
        </button>
    )
}