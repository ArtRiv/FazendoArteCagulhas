"use client"
import { LoginLink, LogoutLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import { CiLogin } from "react-icons/ci";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { AnchorClientSide } from "../ui/anchor-client-side";

export const UserMenu = () => {

    const { user, isAuthenticated, isLoading, getPermission } = useKindeBrowserClient();
    const isAdmin = getPermission('enter:admin');

    return (
        <div className="flex flex-col gap-4">
            {isLoading && (
                <span className="text-normal text-font-color text-center tracking-letter-space-smallest">
                    Carregando...
                </span>
            )}

            {!isAuthenticated && (
                <div className="w-full h-full flex justify-center items-center">
                    <LoginLink
                        className="flex gap-3"
                        postLoginRedirectURL="/"
                        authUrlParams={{
                            lang: "pt-br"
                        }}>
                        <span className="relative font-harmonia text-normal text-font-color leading-line-height-small tracking-letter-space-small select-none underline [text-decoration-color:transparent] hover:transition-all animateBorderBottom changeTextColor">
                            Entrar
                        </span>
                        <CiLogin size={20} />
                    </LoginLink>
                </div>
            )}

            {user && (
                <div className="flex flex-col p-3 gap-2 border-2 border-decoration/70 rounded-md">
                    <div className="flex items-center gap-3">
                        {user?.picture && (
                            <Image
                                className="rounded-md"
                                src={user?.picture}
                                alt="Foto de perfil"
                                width={35}
                                height={35}
                            />
                        )}

                        {user && !user.picture && (
                            <div className="w-12 h-12">
                                {user?.given_name?.[0]}
                            </div>
                        )}
                        {user.given_name}
                    </div>
                    <span className="max-w-full text-start text-smallest text-font-color tracking-letter-space-smallest text-ellipsis whitespace-normal">
                        {user.email}
                    </span>
                </div>
            )}

            {isAuthenticated && (
                <div className="w-full h-full flex justify-center items-center">
                    <LogoutLink className="flex gap-3" postLogoutRedirectURL="/">
                        <span className="relative font-harmonia text-normal text-font-color leading-line-height-small tracking-letter-space-small select-none underline [text-decoration-color:transparent] hover:transition-all animateBorderBottom changeTextColor">
                            Sair
                        </span>
                        <CiLogin size={20} />
                    </LogoutLink>
                </div>
            )}

            {isAdmin?.isGranted && (
                <AnchorClientSide
                    twStyles="flex gap-2 justify-center font-harmonia text-normal text-font-color leading-line-height-small tracking-letter-space-small"
                    navigateLink={"/dashboard"}>
                    <span className="relative font-harmonia text-normal text-font-color leading-line-height-small tracking-letter-space-small select-none underline [text-decoration-color:transparent] hover:transition-all animateBorderBottom changeTextColor">
                        Admin dashboard
                    </span>
                    <MdOutlineAdminPanelSettings size={20} />
                </AnchorClientSide>
            )}
        </div>
    )
}