import { InstagramIcon } from "../icons/instagramIcon";
import { ShopeeIconWithLink } from "../icons/shopeeIcon";
import { TiktokIcon } from "../icons/tiktokIcon";

export const SocialMediaIcons = () => {
    return (
        <div className="flex items-center h-5 gap-3">
            <InstagramIcon/>
            <TiktokIcon/>
            <ShopeeIconWithLink/>
        </div>
    )
}