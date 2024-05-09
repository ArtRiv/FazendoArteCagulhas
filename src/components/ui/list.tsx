type Props = {
    children: React.ReactNode;
}

export const List = ({ children }: Props) => {
    return (
        <ul className="search-modal top-6 w-44 list-none absolute bg-background px-0 py-4 rounded-radius-big border-shapes-dark-10 border-[1px] border-solid opacity-0 ">
            {children}
        </ul>
    )
}