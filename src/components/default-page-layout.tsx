type Props = {
    children: React.ReactNode;
}

export const DefaultPageLayout = ({ children }: Props) => {
    return (
        <div className="h-auto w-full max-w-[80rem] mx-auto my-0 px-4 py-10">
            {children}
        </div>
    )
}