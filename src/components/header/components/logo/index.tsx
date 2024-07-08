import { useRouter } from "next/navigation"
import Image from "next/image";

export const Logo = () => {
    const router = useRouter();

    const handleNavigate = () => {
        router.push("/")
    }

    return (
        <div className="
        w-full h-auto mx-[auto] self-center
        sm:[grid-area:heading] sm:w-72 sm:h-20">
            <a href="/" onClick={handleNavigate} className="flex justify-center">
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