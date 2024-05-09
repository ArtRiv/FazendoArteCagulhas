type Props = {
    text: string;
}

export const ListText = ({ text }: Props): React.ReactNode => {
    return (
        <li className="animateBorderBottom relative text-small text-font-color leading-line-height-big tracking-letter-space-smallest select-none cursor-pointer transition-transform duration-300 ease-in-out hover:text-light-heading">
            {text}
        </li>
    )
}