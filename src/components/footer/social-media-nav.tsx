import { InstagramIcon } from "../icons/instagram-icon";
import { ShopeeIconWithLink } from "../icons/shopee-icon";
import { TiktokIcon } from "../icons/tiktok-icon";

export const SocialMediaIcons = () => {
    return (
        <div className="flex items-center h-5 gap-3">
            <InstagramIcon/>
            <TiktokIcon/>
            <ShopeeIconWithLink/>
        </div>
    )
}