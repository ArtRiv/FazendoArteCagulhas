import { useRouter } from "next/navigation"
import Image from "next/image";

export const Logo = () => {
    const router = useRouter();

    const handleNavigate = () => {
        router.push("/")
    }

    return (
        <div className="[grid-area:heading] mx-[auto] my-[0] self-center w-[280px] h-[80px]">
            <a href="/" onClick={handleNavigate}>
                <Image
                    alt={'Logo Fazendo Arte com Agulhas'}
                    src="/logo-title-nobg.png"
                    width={280}
                    height={80}
                    quality={100}
                    draggable={false}
                    priority={true}
                />
            </a>
        </div>
    )
}