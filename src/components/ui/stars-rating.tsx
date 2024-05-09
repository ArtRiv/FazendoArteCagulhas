import { StarIcon } from "../icons/starIcon"

export const StarsRating = ({ stars, purchase_count }: { stars: number, purchase_count?: number }) => {
    return (
        <div className="flex items-center mt-1 gap-1">
            <div className="flex items-center gap-1">
                {Array(stars).fill(0).map((_, i) => (
                    <StarIcon key={i} fill="#fdd261" />
                ))}
                {Array(5 - stars).fill(0).map((_, i) => (
                    <StarIcon key={i} fill="#41414D" />
                ))}
                {purchase_count !== undefined &&
                    <span className="text-small text-font-color/70 font-harmonia leading-line-height-big tracking-letter-space-normal break-words antialiased ml-1">
                        {purchase_count} vendido(s)
                    </span>
                }
            </div>
        </div>
    )
}   