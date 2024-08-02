import { useRouter } from "next/navigation"
import Image from "next/image";

export const Logo = () => {
    const router = useRouter();

    const handleNavigate = () => {
        router.push("/")
    }

    return (
        <div className="
        w-full h-auto max-w-44 mx-[auto] self-center
        md:[grid-area:heading] md:w-72 md:max-w-72">
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