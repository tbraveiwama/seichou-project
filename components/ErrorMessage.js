
export function ErrorMessage({children,addClassName=""}){
    return <span className={`text-red-500 text-sm ${addClassName}`}>{children}</span>
}