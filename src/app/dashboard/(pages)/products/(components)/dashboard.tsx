import Link from "next/link"
import {
    Home,
    LineChart,
    Package,
    Package2,
    PanelLeft,
    ShoppingCart,
    Users2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tabs,
    TabsContent,
} from "@/components/ui/tabs"
import { ProductsList } from "./products-list"
import { DashboardHeader } from "./dashboard-header"
import { CardActions } from "./card-actions"
import { PaginationComponent } from "./pagination"
import { getDashboardProductsDTO } from "@/services/product_crud"

// const productsFull: Product[] = [{
//     "id": "prod_QnlDKAlqV01URt",
//     "category_id": 6,
//     "created_at": 1725658094,
//     "description": [
//         "Mini Mike Wazowski em crochê!",
//         "Tem aproximadamente de 5 a 6 cm, e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Mini-Mike-Wazowski-em-Croch%C3%AA-Amigurumi-Monstros-S.A.-SA-Chaveiro-i.623543065.22297281341?sp_atk=d5deb6d8-0b13-4d08-8326-68cb1aefda7f&xptdk=d5deb6d8-0b13-4d08-8326-68cb1aefda7f",
//     "media": [
//         "https://i.ibb.co/whGv5VF/br-11134201-7r98o-lza3dw6pzewx57.jpg"
//     ],
//     "price": 27.9,
//     "product_group": "Monstros S.A.",
//     "purchase_count": 1,
//     "tag": "Mini Mike Wazowski em Crochê Amigurumi Monstros S.A. SA Chaveiro",
//     "title": "Mini Mike Wazowski"
// },
// {
//     "id": "prod_QorXf13VQnsb0F",
//     "category_id": 2,
//     "created_at": 1725912244,
//     "description": [
//         "Yor Forger em Crochê Amigurumi de Spy X Family",
//         "Tem aproximadamente de 12 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Yor-Forger-em-Croch%C3%AA-Amigurumi-de-Spy-X-Family-Anya-Loid-i.623543065.23697282109?sp_atk=39c9f8cf-d975-4030-9445-70b6f89f98c4&xptdk=39c9f8cf-d975-4030-9445-70b6f89f98c4",
//     "media": [
//         "https://i.ibb.co/0yPWz9w/yor-img.jpg"
//     ],
//     "price": 145.9,
//     "product_group": "Spy x Family",
//     "purchase_count": 0,
//     "tag": "Yor Forger Spy x Family Anya Loid",
//     "title": "Yor Forger - Spy x Family"
// },
// {
//     "id": "prod_QordUcPzFGiVRh",
//     "category_id": 2,
//     "created_at": 1725912563,
//     "description": [
//         "O espião da família Forger em crochê! Loid Forger!",
//         "Tem aproximadamente de 12 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Loid-Forger-em-Croch%C3%AA-Amigurumi-de-Spy-X-Family-Anya-Yor-Chaveiro-i.623543065.23597287072?sp_atk=e0d4ed59-71d0-46f8-871c-10d91b2836c1&xptdk=e0d4ed59-71d0-46f8-871c-10d91b2836c1",
//     "media": [
//         "https://i.ibb.co/7XBm02C/loid-img.jpg"
//     ],
//     "price": 145.90,
//     "product_group": "Spy x Family",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Loid Forger - Spy x Family Anya Yor",
//     "title": "Loid Forger - Spy x Family"
// },
// {
//     "id": "prod_QorglbIhGQ6Iue",
//     "category_id": 2,
//     "created_at": 1725912794,
//     "description": [
//         "˚˖𓍢ִ໋🌷͙֒✧˚.🎀༘⋆ A filha telepata da família Forger em Crochê! ⋆˚🐾˖°",
//         "Tem aproximadamente de 12 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Anya-Forger-em-Croch%C3%AA-Amigurumi-de-Spy-X-Family-Yor-Loid-Chaveiro-i.623543065.23592785536?sp_atk=2b090b0d-445a-4592-a9b7-cf79673d720b&xptdk=2b090b0d-445a-4592-a9b7-cf79673d720b",
//     "media": [
//         "https://i.ibb.co/fNcwzF7/anya-img.jpg"
//     ],
//     "price": 145.9,
//     "product_group": "Spy x Family",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Anya Forger - Spy x Family Loid Yor",
//     "title": "Anya Forger - Spy x Family"
// },
// {
//     "id": "prod_QorlYCRhths6zb",
//     "category_id": 2,
//     "created_at": 1725913072,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Zoro em crochê! Versão funko.",
//         "Personagens com aproximadamente entre 12 e 15 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Zoro-em-Croch%C3%AA-Amigurumi-de-One-Piece-i.623543065.23492810930?sp_atk=dd2b753a-cb89-47d5-b4af-d046bd38a7cb&xptdk=dd2b753a-cb89-47d5-b4af-d046bd38a7cb",
//     "media": [
//         "https://i.ibb.co/m0YK8K9/zoro-funko-img.jpg"
//     ],
//     "price": 118.9,
//     "product_group": "One Piece",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Zoro Funko - One Piece Luffy Sanji Nami",
//     "title": "Zoro Funko - One Piece"
// },
// {
//     "id": "prod_Qorv0awvAySumF",
//     "category_id": 2,
//     "created_at": 1725913651,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Sanji em crochê! Versão funko.",
//         "Personagens com aproximadamente entre 12 e 15 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Sanji-em-Croch%C3%AA-Amigurumi-de-One-Piece-i.623543065.22997302733?sp_atk=e6ed8f08-8640-4b2c-bb2b-71f3f0c804e8&xptdk=e6ed8f08-8640-4b2c-bb2b-71f3f0c804e8",
//     "media": [
//         "https://i.ibb.co/4RNRPFm/sanji-funko-img.jpg"
//     ],
//     "price": 118.9,
//     "product_group": "One Piece",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Sanji Funko - One Piece Luffy Zoro Nami",
//     "title": "Sanji Funko - One Piece"
// },
// {
//     "id": "prod_QorxReIQ7EeOkO",
//     "category_id": 2,
//     "created_at": 1725913817,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Nami em crochê! Versão funko.",
//         "Personagens com aproximadamente entre 12 e 15 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Nami-em-Croch%C3%AA-Amigurumi-de-One-Piece-i.623543065.23697307702?sp_atk=8554506e-d9b8-4720-8865-b37f75211b03&xptdk=8554506e-d9b8-4720-8865-b37f75211b03",
//     "media": [
//         "https://i.ibb.co/9hR0SBH/nami-funko-img.jpg"
//     ],
//     "price": 118.9,
//     "product_group": "One Piece",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Nami Funko - One Piece Luffy Sanji Zoro",
//     "title": "Nami Funko - One Piece"
// },
// {
//     "id": "prod_Qos1w42gtmEIqB",
//     "category_id": 2,
//     "created_at": 1725914008,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Luffy em crochê! Versão funko.",
//         "Personagens com aproximadamente entre 12 e 15 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Luffy-em-Croch%C3%AA-Amigurumi-de-One-Piece-i.623543065.19699188158?sp_atk=4f8cf0af-4169-4e34-991a-a3e37f9a24f5&xptdk=4f8cf0af-4169-4e34-991a-a3e37f9a24f5",
//     "media": [
//         "https://i.ibb.co/rGxCDF7/luffy-funko-img.jpg"
//     ],
//     "price": 118.9,
//     "product_group": "One Piece",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Luffy Funko - One Piece Nami Sanji Zoro",
//     "title": "Luffy Funko - One Piece"
// },
// {
//     "id": "prod_Qos5YqinVeQlX6",
//     "category_id": 2,
//     "created_at": 1725914270,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Zoro em crochê! Versão tradicional.",
//         "Personagens com aproximadamente entre 12 e 15 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Zoro-em-Croch%C3%AA-Amigurumi-de-One-Piece-i.623543065.23492810930?sp_atk=dd2b753a-cb89-47d5-b4af-d046bd38a7cb&xptdk=dd2b753a-cb89-47d5-b4af-d046bd38a7cb",
//     "media": [
//         "https://i.ibb.co/dg4YNmR/zoro-img.jpg"
//     ],
//     "price": 62.5,
//     "product_group": "One Piece",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Zoro - One Piece Luffy Sanji Nami",
//     "title": "Zoro - One Piece"
// },
// {
//     "id": "prod_Qos7xJqVtX2sBA",
//     "category_id": 2,
//     "created_at": 1725914393,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Sanji em crochê! Versão tradicional.",
//         "Personagens com aproximadamente entre 12 e 15 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Sanji-em-Croch%C3%AA-Amigurumi-de-One-Piece-i.623543065.22997302733?sp_atk=e6ed8f08-8640-4b2c-bb2b-71f3f0c804e8&xptdk=e6ed8f08-8640-4b2c-bb2b-71f3f0c804e8",
//     "media": [
//         "https://i.ibb.co/6WNDTG3/sanji-img.jpg"
//     ],
//     "price": 62.5,
//     "product_group": "One Piece",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Sanji - One Piece Luffy Zoro Nami",
//     "title": "Sanji - One Piece"
// },
// {
//     "id": "prod_QosASonKMe4Mo4",
//     "category_id": 2,
//     "created_at": 1725914560,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Nami em crochê! Versão tradicional.",
//         "Personagens com aproximadamente entre 12 e 15 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Nami-em-Croch%C3%AA-Amigurumi-de-One-Piece-i.623543065.23697307702?sp_atk=8554506e-d9b8-4720-8865-b37f75211b03&xptdk=8554506e-d9b8-4720-8865-b37f75211b03",
//     "media": [
//         "https://i.ibb.co/PYZf90g/nami-img.jpg"
//     ],
//     "price": 62.5,
//     "product_group": "One Piece",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Nami - One Piece Luffy Sanji Zoro",
//     "title": "Nami - One Piece"
// },
// {
//     "id": "prod_QosBaMRykm7CyL",
//     "category_id": 2,
//     "created_at": 1725914653,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Luffy em crochê! Versão tradicional.",
//         "Personagens com aproximadamente entre 12 e 15 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Luffy-em-Croch%C3%AA-Amigurumi-de-One-Piece-i.623543065.19699188158?sp_atk=4f8cf0af-4169-4e34-991a-a3e37f9a24f5&xptdk=4f8cf0af-4169-4e34-991a-a3e37f9a24f5",
//     "media": [
//         "https://i.ibb.co/f43w9L0/luffy-img.jpg"
//     ],
//     "price": 62.5,
//     "product_group": "One Piece",
//     "purchase_count": 1,
//     "rating": 0,
//     "tag": "Luffy - One Piece Nami Sanji Zoro",
//     "title": "Luffy - One Piece"
// },
// {
//     "id": "prod_QosEafiyumX3k2",
//     "category_id": 2,
//     "created_at": 1725914792,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Tanjiro em crochê!",
//         "Tem aproximadamente de 12 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Tanjiro-em-Croch%C3%AA-Amigurumi-de-Demon-Slayer-i.623543065.23297302681?sp_atk=22444519-9e25-4d0e-bba2-e21cae6111e0&xptdk=22444519-9e25-4d0e-bba2-e21cae6111e0",
//     "media": [
//         "https://i.ibb.co/K6Pkh5Q/tanjiro-img.jpg"
//     ],
//     "price": 145.9,
//     "product_group": "Demon Slayer",
//     "purchase_count": 1,
//     "rating": 0,
//     "tag": "Tanjiro Kamado - Demon Slayer Kimetsu no Yaiba",
//     "title": "Tanjiro - Demon Slayer"
// },
// {
//     "id": "prod_QosGQgCIqal5G0",
//     "category_id": 2,
//     "created_at": 1725914792,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Nezuko em crochê!",
//         "Tem aproximadamente de 12 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Nezuko-em-Croch%C3%AA-Amigurumi-de-Demon-Slayer-i.623543065.23397302642?sp_atk=d3fc5176-0bfa-45c3-9a40-c618a5ad9187&xptdk=d3fc5176-0bfa-45c3-9a40-c618a5ad9187",
//     "media": [
//         "https://i.ibb.co/7QH57Vx/nezuko-img.jpg"
//     ],
//     "price": 145.9,
//     "product_group": "Demon Slayer",
//     "purchase_count": 1,
//     "rating": 0,
//     "tag": "Nezuko Kamado - Demon Slayer Kimetsu no Yaiba",
//     "title": "Nezuko - Demon Slayer"
// },
// {
//     "id": "prod_QosJsnSMIr0DKt",
//     "category_id": 2,
//     "created_at": 1725915107,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Zenitsu em crochê!",
//         "Tem aproximadamente de 12 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Zenitsu-em-Croch%C3%AA-Amigurumi-de-Demon-Slayer-i.623543065.23392806062?sp_atk=4f47a9b5-1330-4048-b1b1-0de2a58d3c99&xptdk=4f47a9b5-1330-4048-b1b1-0de2a58d3c99",
//     "media": [
//         "https://i.ibb.co/q0XCQyk/zenitsu-img.jpg"
//     ],
//     "price": 145.9,
//     "product_group": "Demon Slayer",
//     "purchase_count": 1,
//     "rating": 0,
//     "tag": "Zenitsu - Demon Slayer Kimetsu no Yaiba",
//     "title": "Zenitsu - Demon Slayer"
// },
// {
//     "id": "prod_QosKEkomcUL7VS",
//     "category_id": 2,
//     "created_at": 1725915183,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Inosuke em crochê!",
//         "Tem aproximadamente de 12 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Inosuke-em-Croch%C3%AA-Amigurumi-de-Demon-Slayer-i.623543065.23197302949?sp_atk=c7b5cf59-e906-43b7-ac57-5299a568685b&xptdk=c7b5cf59-e906-43b7-ac57-5299a568685b",
//     "media": [
//         "https://i.ibb.co/hCnSQc3/inosuke-img.jpg"
//     ],
//     "price": 145.9,
//     "product_group": "Demon Slayer",
//     "purchase_count": 1,
//     "rating": 0,
//     "tag": "Inosuke - Demon Slayer Kimetsu no Yaiba",
//     "title": "Inosuke - Demon Slayer"
// },
// {
//     "id": "prod_QouYzgzWiGlIVF",
//     "category_id": 3,
//     "created_at": 1725923479,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Zhongli em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Zhongli-em-Croch%C3%AA-Amigurumi-de-Genshin-Impact-i.623543065.22192871502?sp_atk=cf998dca-0e8a-42ac-97b2-8efa99fb5428&xptdk=cf998dca-0e8a-42ac-97b2-8efa99fb5428",
//     "media": [
//         "https://i.ibb.co/NrrbNpN/zhongli-img.jpg"
//     ],
//     "price": 225.0,
//     "product_group": "Genshin Impact",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Zhongli - Genshin Impact",
//     "title": "Zhongli - Genshin Impact"
// },
// {
//     "id": "prod_QouauaWB90Ggve",
//     "category_id": 3,
//     "created_at": 1725923580,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Xiao em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Xiao-em-Croch%C3%AA-Amigurumi-de-Genshin-Impact-i.623543065.22192871568?sp_atk=1bba6031-960d-4fad-bf97-8910e2bd79ff&xptdk=1bba6031-960d-4fad-bf97-8910e2bd79ff",
//     "media": [
//         "https://i.ibb.co/sHQp5Hn/xiao-img.jpg"
//     ],
//     "price": 225.0,
//     "product_group": "Genshin Impact",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Xiao - Genshin Impact",
//     "title": "Xiao - Genshin Impact"
// },
// {
//     "id": "prod_Qouc7Y5RvGJibW",
//     "category_id": 3,
//     "created_at": 1725923678,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Ningguang em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Ningguang-em-Croch%C3%AA-Amigurumi-de-Genshin-Impact-i.623543065.22397363054?sp_atk=27265680-ad04-4546-bff9-c8528574b0aa&xptdk=27265680-ad04-4546-bff9-c8528574b0aa",
//     "media": [
//         "https://i.ibb.co/T0jwtKk/ningguang-img.jpg"
//     ],
//     "price": 225.0,
//     "product_group": "Genshin Impact",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Ningguang - Genshin Impact",
//     "title": "Ningguang - Genshin Impact"
// },
// {
//     "id": "prod_QoufoKsitZrf1D",
//     "category_id": 3,
//     "created_at": 1725923846,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Fu Xuan em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Fu-Xuan-em-Croch%C3%AA-Amigurumi-de-Honkai-i.623543065.22397363138?sp_atk=45623402-e39a-4dc9-bd8c-26c56f981fbb&xptdk=45623402-e39a-4dc9-bd8c-26c56f981fbb",
//     "media": [
//         "https://i.ibb.co/nzmQv12/fu-xuan-img.jpg"
//     ],
//     "price": 225.0,
//     "product_group": "Genshin Impact",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Fu Xuan - Genshin Impact",
//     "title": "Fu Xuan - Genshin Impact"
// },
// {
//     "id": "prod_QouhvJSJFr0bux",
//     "category_id": 3,
//     "created_at": 1725923973,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Kokomi em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Sangonomiya-Kokomi-em-Croch%C3%AA-Amigurumi-de-Genshin-Impact-i.623543065.23992858719?sp_atk=abe8aa14-a643-4294-bf98-d1e3ed33b5cc&xptdk=abe8aa14-a643-4294-bf98-d1e3ed33b5cc",
//     "media": [
//         "https://i.ibb.co/S5Y3qKp/kokomi-img.jpg"
//     ],
//     "price": 225.0,
//     "product_group": "Genshin Impact",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Kokomi - Genshin Impact",
//     "title": "Kokomi - Genshin Impact"
// },
// {
//     "id": "prod_QouiVUojLzqZv8",
//     "category_id": 3,
//     "created_at": 1725924061,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Ayaka em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Kamisato-Ayaka-em-Croch%C3%AA-Amigurumi-de-Genshin-Impact-i.623543065.23997350337?sp_atk=93bb4a64-3728-4022-b2dd-cfa76fa3c445&xptdk=93bb4a64-3728-4022-b2dd-cfa76fa3c445",
//     "media": [
//         "https://i.ibb.co/3crqkD9/ayaka-img.jpg"
//     ],
//     "price": 220.0,
//     "product_group": "Genshin Impact",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Ayaka - Genshin Impact",
//     "title": "Ayaka - Genshin Impact"
// },
// {
//     "id": "prod_QoukooIeDFngj8",
//     "category_id": 3,
//     "created_at": 1725924143,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Kazuha em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Kaedehara-Kazuha-em-Croch%C3%AA-Amigurumi-de-Genshin-Impact-i.623543065.18697661590?sp_atk=cc7d9ced-55ce-4788-8ce4-fef922db6ffe&xptdk=cc7d9ced-55ce-4788-8ce4-fef922db6ffe",
//     "media": [
//         "https://i.ibb.co/q17wCKZ/kaedehara-kazuha-img.jpg"
//     ],
//     "price": 225.90,
//     "product_group": "Genshin Impact",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Kazuha - Genshin Impact",
//     "title": "Kazuha - Genshin Impact"
// },
// {
//     "id": "prod_QouoLDE3pJJkGr",
//     "category_id": 3,
//     "created_at": 1725924380,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Alhaitham em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Alhaitham-em-Croch%C3%AA-Amigurumi-de-Genshin-Impact-i.623543065.22192954444?sp_atk=7a39627f-6555-4871-8f53-e4d2c5bc45a6&xptdk=7a39627f-6555-4871-8f53-e4d2c5bc45a6",
//     "media": [
//         "https://i.ibb.co/2yyqYFX/alhaitham-img.jpg"
//     ],
//     "price": 225.90,
//     "product_group": "Genshin Impact",
//     "purchase_count": 1,
//     "rating": 0,
//     "tag": "Alhaitham - Genshin Impact",
//     "title": "Alhaitham - Genshin Impact"
// },
// {
//     "id": "prod_Qouq1YBqAeuaO0",
//     "category_id": 3,
//     "created_at": 1725924517,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Venti em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Venti-em-Croch%C3%AA-Amigurumi-de-Genshin-Impact-i.623543065.22792928493?sp_atk=a6232525-4581-42a2-a7d8-cfa98385a090&xptdk=a6232525-4581-42a2-a7d8-cfa98385a090",
//     "media": [
//         "https://i.ibb.co/1ZTfHLL/venti-img.jpg"
//     ],
//     "price": 225.90,
//     "product_group": "Genshin Impact",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Venti - Genshin Impact",
//     "title": "Venti - Genshin Impact"
// },
// {
//     "id": "prod_QousuM4iaqNvdZ",
//     "category_id": 3,
//     "created_at": 1725924632,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Yoimiya em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Yoimiya-em-croch%C3%AA-Amigurumi-de-Genshin-Impact-i.623543065.22197368177?sp_atk=fed6bdb6-bd21-4e41-8ba9-0629ce875851&xptdk=fed6bdb6-bd21-4e41-8ba9-0629ce875851",
//     "media": [
//         "https://i.ibb.co/LPQTY0Y/yoimiya-img.jpg"
//     ],
//     "price": 225.90,
//     "product_group": "Genshin Impact",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Yoimiya - Genshin Impact",
//     "title": "Yoimiya - Genshin Impact"
// },
// {
//     "id": "prod_QouwTNqiqAQEh3",
//     "category_id": 3,
//     "created_at": 1725924870,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Yanfei em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Yanfei-em-Croch%C3%AA-Amigurumi-de-Genshin-Impact-i.623543065.21899299480?sp_atk=8f6982b4-a63e-4979-91c7-921cf83d116a&xptdk=8f6982b4-a63e-4979-91c7-921cf83d116a",
//     "media": [
//         "https://i.ibb.co/G30WtMX/yanfei-img.jpg"
//     ],
//     "price": 225.90,
//     "product_group": "Genshin Impact",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Yanfei - Genshin Impact",
//     "title": "Yanfei - Genshin Impact"
// },
// {
//     "id": "prod_QouzFZtj48LJ70",
//     "category_id": 3,
//     "created_at": 1725925099,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Miles Morales em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Miles-Morales-em-Crochet-Amigurumi-Chaveiro-i.623543065.21799256471?sp_atk=ff6deea0-014c-427c-94ff-d5d5e263ce84&xptdk=ff6deea0-014c-427c-94ff-d5d5e263ce84",
//     "media": [
//         "https://i.ibb.co/cQr9GJB/miles-morales-img.jpg"
//     ],
//     "price": 43.75,
//     "product_group": "Homem Aranha",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Miles Morales - Homem Aranha",
//     "title": "Miles Morales"
// },
// {
//     "id": "prod_QpFDquDcu9ztWr",
//     "category_id": 3,
//     "created_at": 1726000325,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ homem aranha em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Homem-Aranha-em-Croch%C3%AA-Chaveiro-de-Amigurumi-i.623543065.22397337991?sp_atk=2e38ac65-6494-404d-9291-bcf813ea4210",
//     "media": [
//         "https://i.ibb.co/PwgwLdv/miranha-img.jpg"
//     ],
//     "price": 45.90,
//     "product_group": "Homem Aranha",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Peter Parker - Homem Aranha",
//     "title": "Homem Aranha"
// },
// {
//     "id": "prod_QpFMnA3w5yuo4y",
//     "category_id": 3,
//     "created_at": 1726000325,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ homem aranha em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Chaveiro-de-Gatinho-com-cora%C3%A7%C3%A3o-em-Croch%C3%AA-Amigurumi-i.623543065.20097609426?sp_atk=a95bebb4-936c-4df1-a8c3-ecbc9e8f0a50",
//     "media": [
//         "https://i.ibb.co/d28ZF2s/gatinho-img.jpg"
//     ],
//     "price": 32.90,
//     "product_group": "Chaveiros",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Gatinho chaveiro",
//     "title": "Chaveiro de gatinho"
// },
// {
//     "id": "prod_QpG1GFIOC9vW2R",
//     "category_id": 3,
//     "created_at": 1726003280,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ ursinho Pooh em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Ursinho-Pooh-em-Croch%C3%AA-Amigurumi-Puff-Winnie-the-Pooh-Tigr%C3%A3o-I%C3%B3-e-Leit%C3%A3o-i.623543065.22792811817?sp_atk=82d1a189-700f-48c2-bdbc-e863b862041d",
//     "media": [
//         "https://i.ibb.co/MsLxmv1/ursinho-pooh-img.jpg"
//     ],
//     "price": 52.90,
//     "product_group": "Ursinho Pooh",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Ursinho Pooh - Tigrão Leitão Ió",
//     "title": "Ursinho Pooh"
// },
// {
//     "id": "prod_QpG55yoexscFtl",
//     "category_id": 3,
//     "created_at": 1726003555,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Tigrão em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Ursinho-Pooh-em-Croch%C3%AA-Amigurumi-Puff-Winnie-the-Pooh-Tigr%C3%A3o-I%C3%B3-e-Leit%C3%A3o-i.623543065.22792811817?sp_atk=82d1a189-700f-48c2-bdbc-e863b862041d",
//     "media": [
//         "https://i.ibb.co/MsLxmv1/ursinho-pooh-img.jpg"
//     ],
//     "price": 52.90,
//     "product_group": "Ursinho Pooh",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Tigrão - Pooh Leitão Ió",
//     "title": "Tigrão"
// },
// {
//     "id": "prod_QpGCQNpUQ27jpj",
//     "category_id": 3,
//     "created_at": 1726003948,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Leitão em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Ursinho-Pooh-em-Croch%C3%AA-Amigurumi-Puff-Winnie-the-Pooh-Tigr%C3%A3o-I%C3%B3-e-Leit%C3%A3o-i.623543065.22792811817?sp_atk=82d1a189-700f-48c2-bdbc-e863b862041d",
//     "media": [
//         "https://i.ibb.co/MsLxmv1/ursinho-pooh-img.jpg"
//     ],
//     "price": 52.90,
//     "product_group": "Ursinho Pooh",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Leitão - Pooh Tigrão Ió",
//     "title": "Leitão"
// },
// {
//     "id": "prod_QpGERX0nCwLeGy",
//     "category_id": 3,
//     "created_at": 1726004068,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Ió em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Ursinho-Pooh-em-Croch%C3%AA-Amigurumi-Puff-Winnie-the-Pooh-Tigr%C3%A3o-I%C3%B3-e-Leit%C3%A3o-i.623543065.22792811817?sp_atk=82d1a189-700f-48c2-bdbc-e863b862041d",
//     "media": [
//         "https://i.ibb.co/MsLxmv1/ursinho-pooh-img.jpg"
//     ],
//     "price": 52.90,
//     "product_group": "Ursinho Pooh",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Ió - Pooh Leitão Tigrão",
//     "title": "Ió"
// },
// {
//     "id": "prod_Qpb85k2scSDVxx",
//     "category_id": 3,
//     "created_at": 1726081827,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Killjoy em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Killjoy-em-croch%C3%AA-Amigurumi-de-Valorant-i.623543065.23292810791?sp_atk=da09f009-2ae9-40ac-a301-bb70d572e548",
//     "media": [
//         "https://i.ibb.co/b5kg4Z8/killjoy-img.jpg"
//     ],
//     "price": 135.90,
//     "product_group": "Valorant",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Killjoy - Valorant",
//     "title": "Killjoy"
// },
// {
//     "id": "prod_QpbCLS174GBlPZ",
//     "category_id": 3,
//     "created_at": 1726082076,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Sage em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Sage-em-croch%C3%AA-Amigurumi-de-Valorant-i.623543065.23497302181?sp_atk=6a1224d4-3558-4bbf-b786-ff98921c5907",
//     "media": [
//         "https://i.ibb.co/gV9m4Zs/sage-img.jpg"
//     ],
//     "price": 135.90,
//     "product_group": "Valorant",
//     "purchase_count": 1,
//     "rating": 0,
//     "tag": "Sage - Valorant",
//     "title": "Sage"
// },
// {
//     "id": "prod_QpbDvUfEsNqQVw",
//     "category_id": 3,
//     "created_at": 1726082162,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Jett em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Jett-em-Croch%C3%AA-Amigurumi-de-Valorant-i.623543065.23697302314?sp_atk=1ed8887e-6998-4077-83fb-b3d7cef9a316",
//     "media": [
//         "https://i.ibb.co/1d2gfqt/jett-img.jpg"
//     ],
//     "price": 135.90,
//     "product_group": "Valorant",
//     "purchase_count": 3,
//     "rating": 0,
//     "tag": "Jett - Valorant",
//     "title": "Jett"
// },
// {
//     "id": "prod_QpbFsRfn4v3UHU",
//     "category_id": 3,
//     "created_at": 1726082247,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Viper em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Viper-em-Croch%C3%AA-Amigurumi-de-Valorant-i.623543065.19097615701?sp_atk=a219d39e-165d-4714-a7f2-537cceab387e",
//     "media": [
//         "https://i.ibb.co/pZGGtNj/viper-img.jpg"
//     ],
//     "price": 135.90,
//     "product_group": "Valorant",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Viper - Valorant",
//     "title": "Viper"
// },
// {
//     "id": "prod_QpbFsRfn4v3UHU",
//     "category_id": 3,
//     "created_at": 1726082247,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Viper em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Viper-em-Croch%C3%AA-Amigurumi-de-Valorant-i.623543065.19097615701?sp_atk=a219d39e-165d-4714-a7f2-537cceab387e",
//     "media": [
//         "https://i.ibb.co/pZGGtNj/viper-img.jpg"
//     ],
//     "price": 135.90,
//     "product_group": "Valorant",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Viper - Valorant",
//     "title": "Viper"
// },
// {
//     "id": "prod_QpbFsRfn4v3UHU",
//     "category_id": 3,
//     "created_at": 1726082247,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Viper em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Viper-em-Croch%C3%AA-Amigurumi-de-Valorant-i.623543065.19097615701?sp_atk=a219d39e-165d-4714-a7f2-537cceab387e",
//     "media": [
//         "https://i.ibb.co/pZGGtNj/viper-img.jpg"
//     ],
//     "price": 135.90,
//     "product_group": "Valorant",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Viper - Valorant",
//     "title": "Viper"
// },
// {
//     "id": "prod_QpbFsRfn4v3UHU",
//     "category_id": 3,
//     "created_at": 1726082247,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Viper em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Viper-em-Croch%C3%AA-Amigurumi-de-Valorant-i.623543065.19097615701?sp_atk=a219d39e-165d-4714-a7f2-537cceab387e",
//     "media": [
//         "https://i.ibb.co/pZGGtNj/viper-img.jpg"
//     ],
//     "price": 135.90,
//     "product_group": "Valorant",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Viper - Valorant",
//     "title": "Viper"
// },
// {
//     "id": "prod_QpbFsRfn4v3UHU",
//     "category_id": 3,
//     "created_at": 1726082247,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Viper em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Viper-em-Croch%C3%AA-Amigurumi-de-Valorant-i.623543065.19097615701?sp_atk=a219d39e-165d-4714-a7f2-537cceab387e",
//     "media": [
//         "https://i.ibb.co/pZGGtNj/viper-img.jpg"
//     ],
//     "price": 135.90,
//     "product_group": "Valorant",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Viper - Valorant",
//     "title": "Viper"
// },
// {
//     "id": "prod_QpbFsRfn4v3UHU",
//     "category_id": 3,
//     "created_at": 1726082247,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Viper em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Viper-em-Croch%C3%AA-Amigurumi-de-Valorant-i.623543065.19097615701?sp_atk=a219d39e-165d-4714-a7f2-537cceab387e",
//     "media": [
//         "https://i.ibb.co/pZGGtNj/viper-img.jpg"
//     ],
//     "price": 135.90,
//     "product_group": "Valorant",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Viper - Valorant",
//     "title": "Viper"
// },
// {
//     "id": "prod_QpbFsRfn4v3UHU",
//     "category_id": 3,
//     "created_at": 1726082247,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Viper em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Viper-em-Croch%C3%AA-Amigurumi-de-Valorant-i.623543065.19097615701?sp_atk=a219d39e-165d-4714-a7f2-537cceab387e",
//     "media": [
//         "https://i.ibb.co/pZGGtNj/viper-img.jpg"
//     ],
//     "price": 135.90,
//     "product_group": "Valorant",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Viper - Valorant",
//     "title": "Viper"
// },
// {
//     "id": "prod_QpbFsRfn4v3UHU",
//     "category_id": 3,
//     "created_at": 1726082247,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Viper em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Viper-em-Croch%C3%AA-Amigurumi-de-Valorant-i.623543065.19097615701?sp_atk=a219d39e-165d-4714-a7f2-537cceab387e",
//     "media": [
//         "https://i.ibb.co/pZGGtNj/viper-img.jpg"
//     ],
//     "price": 135.90,
//     "product_group": "Valorant",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Viper - Valorant",
//     "title": "Viper"
// },
// {
//     "id": "prod_QpbFsRfn4v3UHU",
//     "category_id": 3,
//     "created_at": 1726082247,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Viper em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Viper-em-Croch%C3%AA-Amigurumi-de-Valorant-i.623543065.19097615701?sp_atk=a219d39e-165d-4714-a7f2-537cceab387e",
//     "media": [
//         "https://i.ibb.co/pZGGtNj/viper-img.jpg"
//     ],
//     "price": 135.90,
//     "product_group": "Valorant",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Viper - Valorant",
//     "title": "Viper"
// },
// {
//     "id": "prod_QpbFsRfn4v3UHU",
//     "category_id": 3,
//     "created_at": 1726082247,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Viper em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Viper-em-Croch%C3%AA-Amigurumi-de-Valorant-i.623543065.19097615701?sp_atk=a219d39e-165d-4714-a7f2-537cceab387e",
//     "media": [
//         "https://i.ibb.co/pZGGtNj/viper-img.jpg"
//     ],
//     "price": 135.90,
//     "product_group": "Valorant",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Viper - Valorant",
//     "title": "Viper"
// },
// {
//     "id": "prod_QpbFsRfn4v3UHU",
//     "category_id": 3,
//     "created_at": 1726082247,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Viper em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Viper-em-Croch%C3%AA-Amigurumi-de-Valorant-i.623543065.19097615701?sp_atk=a219d39e-165d-4714-a7f2-537cceab387e",
//     "media": [
//         "https://i.ibb.co/pZGGtNj/viper-img.jpg"
//     ],
//     "price": 135.90,
//     "product_group": "Valorant",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Viper - Valorant",
//     "title": "Viper"
// },
// {
//     "id": "prod_QpbFsRfn4v3UHU",
//     "category_id": 3,
//     "created_at": 1726082247,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Viper em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Viper-em-Croch%C3%AA-Amigurumi-de-Valorant-i.623543065.19097615701?sp_atk=a219d39e-165d-4714-a7f2-537cceab387e",
//     "media": [
//         "https://i.ibb.co/pZGGtNj/viper-img.jpg"
//     ],
//     "price": 135.90,
//     "product_group": "Valorant",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Viper - Valorant",
//     "title": "Viper"
// },
// {
//     "id": "prod_QpbFsRfn4v3UHU",
//     "category_id": 3,
//     "created_at": 1726082247,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Viper em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Viper-em-Croch%C3%AA-Amigurumi-de-Valorant-i.623543065.19097615701?sp_atk=a219d39e-165d-4714-a7f2-537cceab387e",
//     "media": [
//         "https://i.ibb.co/pZGGtNj/viper-img.jpg"
//     ],
//     "price": 135.90,
//     "product_group": "Valorant",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Viper - Valorant",
//     "title": "Viper"
// },
// {
//     "id": "prod_QpbFsRfn4v3UHU",
//     "category_id": 3,
//     "created_at": 1726082247,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Viper em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Viper-em-Croch%C3%AA-Amigurumi-de-Valorant-i.623543065.19097615701?sp_atk=a219d39e-165d-4714-a7f2-537cceab387e",
//     "media": [
//         "https://i.ibb.co/pZGGtNj/viper-img.jpg"
//     ],
//     "price": 135.90,
//     "product_group": "Valorant",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Viper - Valorant",
//     "title": "Viper"
// },
// {
//     "id": "prod_QpbFsRfn4v3UHU",
//     "category_id": 3,
//     "created_at": 1726082247,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Viper em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Viper-em-Croch%C3%AA-Amigurumi-de-Valorant-i.623543065.19097615701?sp_atk=a219d39e-165d-4714-a7f2-537cceab387e",
//     "media": [
//         "https://i.ibb.co/pZGGtNj/viper-img.jpg"
//     ],
//     "price": 135.90,
//     "product_group": "Valorant",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Viper - Valorant",
//     "title": "Viper"
// },
// {
//     "id": "prod_QpbFsRfn4v3UHU",
//     "category_id": 3,
//     "created_at": 1726082247,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Viper em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Viper-em-Croch%C3%AA-Amigurumi-de-Valorant-i.623543065.19097615701?sp_atk=a219d39e-165d-4714-a7f2-537cceab387e",
//     "media": [
//         "https://i.ibb.co/pZGGtNj/viper-img.jpg"
//     ],
//     "price": 135.90,
//     "product_group": "Valorant",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Viper - Valorant",
//     "title": "Viper"
// },
// {
//     "id": "prod_QpbFsRfn4v3UHU",
//     "category_id": 3,
//     "created_at": 1726082247,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Viper em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Viper-em-Croch%C3%AA-Amigurumi-de-Valorant-i.623543065.19097615701?sp_atk=a219d39e-165d-4714-a7f2-537cceab387e",
//     "media": [
//         "https://i.ibb.co/pZGGtNj/viper-img.jpg"
//     ],
//     "price": 135.90,
//     "product_group": "Valorant",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Viper - Valorant",
//     "title": "Viper"
// },
// {
//     "id": "prod_QpbFsRfn4v3UHU",
//     "category_id": 3,
//     "created_at": 1726082247,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Viper em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Viper-em-Croch%C3%AA-Amigurumi-de-Valorant-i.623543065.19097615701?sp_atk=a219d39e-165d-4714-a7f2-537cceab387e",
//     "media": [
//         "https://i.ibb.co/pZGGtNj/viper-img.jpg"
//     ],
//     "price": 135.90,
//     "product_group": "Valorant",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Viper - Valorant",
//     "title": "Viper"
// },
// {
//     "id": "prod_QpbFsRfn4v3UHU",
//     "category_id": 3,
//     "created_at": 1726082247,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Viper em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Viper-em-Croch%C3%AA-Amigurumi-de-Valorant-i.623543065.19097615701?sp_atk=a219d39e-165d-4714-a7f2-537cceab387e",
//     "media": [
//         "https://i.ibb.co/pZGGtNj/viper-img.jpg"
//     ],
//     "price": 135.90,
//     "product_group": "Valorant",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Viper - Valorant",
//     "title": "Viper"
// },
// {
//     "id": "prod_QpbFsRfn4v3UHU",
//     "category_id": 3,
//     "created_at": 1726082247,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Viper em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Viper-em-Croch%C3%AA-Amigurumi-de-Valorant-i.623543065.19097615701?sp_atk=a219d39e-165d-4714-a7f2-537cceab387e",
//     "media": [
//         "https://i.ibb.co/pZGGtNj/viper-img.jpg"
//     ],
//     "price": 135.90,
//     "product_group": "Valorant",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Viper - Valorant",
//     "title": "Viper"
// },
// {
//     "id": "prod_QpbFsRfn4v3UHU",
//     "category_id": 3,
//     "created_at": 1726082247,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Viper em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Viper-em-Croch%C3%AA-Amigurumi-de-Valorant-i.623543065.19097615701?sp_atk=a219d39e-165d-4714-a7f2-537cceab387e",
//     "media": [
//         "https://i.ibb.co/pZGGtNj/viper-img.jpg"
//     ],
//     "price": 135.90,
//     "product_group": "Valorant",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Viper - Valorant",
//     "title": "Viper"
// },
// {
//     "id": "prod_QpbFsRfn4v3UHU",
//     "category_id": 3,
//     "created_at": 1726082247,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Viper em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Viper-em-Croch%C3%AA-Amigurumi-de-Valorant-i.623543065.19097615701?sp_atk=a219d39e-165d-4714-a7f2-537cceab387e",
//     "media": [
//         "https://i.ibb.co/pZGGtNj/viper-img.jpg"
//     ],
//     "price": 135.90,
//     "product_group": "Valorant",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Viper - Valorant",
//     "title": "Viper"
// },
// {
//     "id": "prod_QpbFsRfn4v3UHU",
//     "category_id": 3,
//     "created_at": 1726082247,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Viper em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Viper-em-Croch%C3%AA-Amigurumi-de-Valorant-i.623543065.19097615701?sp_atk=a219d39e-165d-4714-a7f2-537cceab387e",
//     "media": [
//         "https://i.ibb.co/pZGGtNj/viper-img.jpg"
//     ],
//     "price": 135.90,
//     "product_group": "Valorant",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Viper - Valorant",
//     "title": "Viper"
// },
// {
//     "id": "prod_QpbFsRfn4v3UHU",
//     "category_id": 3,
//     "created_at": 1726082247,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Viper em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Viper-em-Croch%C3%AA-Amigurumi-de-Valorant-i.623543065.19097615701?sp_atk=a219d39e-165d-4714-a7f2-537cceab387e",
//     "media": [
//         "https://i.ibb.co/pZGGtNj/viper-img.jpg"
//     ],
//     "price": 135.90,
//     "product_group": "Valorant",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Viper - Valorant",
//     "title": "Viper"
// },
// {
//     "id": "prod_QpbFsRfn4v3UHU",
//     "category_id": 3,
//     "created_at": 1726082247,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Viper em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Viper-em-Croch%C3%AA-Amigurumi-de-Valorant-i.623543065.19097615701?sp_atk=a219d39e-165d-4714-a7f2-537cceab387e",
//     "media": [
//         "https://i.ibb.co/pZGGtNj/viper-img.jpg"
//     ],
//     "price": 135.90,
//     "product_group": "Valorant",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Viper - Valorant",
//     "title": "Viper"
// },
// {
//     "id": "prod_QpbFsRfn4v3UHU",
//     "category_id": 3,
//     "created_at": 1726082247,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Viper em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Viper-em-Croch%C3%AA-Amigurumi-de-Valorant-i.623543065.19097615701?sp_atk=a219d39e-165d-4714-a7f2-537cceab387e",
//     "media": [
//         "https://i.ibb.co/pZGGtNj/viper-img.jpg"
//     ],
//     "price": 135.90,
//     "product_group": "Valorant",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Viper - Valorant",
//     "title": "Viper"
// },
// {
//     "id": "prod_QpbFsRfn4v3UHU",
//     "category_id": 3,
//     "created_at": 1726082247,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Viper em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Viper-em-Croch%C3%AA-Amigurumi-de-Valorant-i.623543065.19097615701?sp_atk=a219d39e-165d-4714-a7f2-537cceab387e",
//     "media": [
//         "https://i.ibb.co/pZGGtNj/viper-img.jpg"
//     ],
//     "price": 135.90,
//     "product_group": "Valorant",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Viper - Valorant",
//     "title": "Viper"
// },
// {
//     "id": "prod_QpbFsRfn4v3UHU",
//     "category_id": 3,
//     "created_at": 1726082247,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Viper em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Viper-em-Croch%C3%AA-Amigurumi-de-Valorant-i.623543065.19097615701?sp_atk=a219d39e-165d-4714-a7f2-537cceab387e",
//     "media": [
//         "https://i.ibb.co/pZGGtNj/viper-img.jpg"
//     ],
//     "price": 135.90,
//     "product_group": "Valorant",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Viper - Valorant",
//     "title": "Viper"
// },
// {
//     "id": "prod_QpbFsRfn4v3UHU",
//     "category_id": 3,
//     "created_at": 1726082247,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Viper em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Viper-em-Croch%C3%AA-Amigurumi-de-Valorant-i.623543065.19097615701?sp_atk=a219d39e-165d-4714-a7f2-537cceab387e",
//     "media": [
//         "https://i.ibb.co/pZGGtNj/viper-img.jpg"
//     ],
//     "price": 135.90,
//     "product_group": "Valorant",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Viper - Valorant",
//     "title": "Viper"
// },
// {
//     "id": "prod_QpbFsRfn4v3UHU",
//     "category_id": 3,
//     "created_at": 1726082247,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Viper em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Viper-em-Croch%C3%AA-Amigurumi-de-Valorant-i.623543065.19097615701?sp_atk=a219d39e-165d-4714-a7f2-537cceab387e",
//     "media": [
//         "https://i.ibb.co/pZGGtNj/viper-img.jpg"
//     ],
//     "price": 135.90,
//     "product_group": "Valorant",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Viper - Valorant",
//     "title": "Viper"
// },
// {
//     "id": "prod_QpbFsRfn4v3UHU",
//     "category_id": 3,
//     "created_at": 1726082247,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Viper em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Viper-em-Croch%C3%AA-Amigurumi-de-Valorant-i.623543065.19097615701?sp_atk=a219d39e-165d-4714-a7f2-537cceab387e",
//     "media": [
//         "https://i.ibb.co/pZGGtNj/viper-img.jpg"
//     ],
//     "price": 135.90,
//     "product_group": "Valorant",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Viper - Valorant",
//     "title": "Viper"
// },
// {
//     "id": "prod_QpbFsRfn4v3UHU",
//     "category_id": 3,
//     "created_at": 1726082247,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Viper em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Viper-em-Croch%C3%AA-Amigurumi-de-Valorant-i.623543065.19097615701?sp_atk=a219d39e-165d-4714-a7f2-537cceab387e",
//     "media": [
//         "https://i.ibb.co/pZGGtNj/viper-img.jpg"
//     ],
//     "price": 135.90,
//     "product_group": "Valorant",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Viper - Valorant",
//     "title": "Viper"
// },
// {
//     "id": "prod_QpbFsRfn4v3UHU",
//     "category_id": 3,
//     "created_at": 1726082247,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Viper em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Viper-em-Croch%C3%AA-Amigurumi-de-Valorant-i.623543065.19097615701?sp_atk=a219d39e-165d-4714-a7f2-537cceab387e",
//     "media": [
//         "https://i.ibb.co/pZGGtNj/viper-img.jpg"
//     ],
//     "price": 135.90,
//     "product_group": "Valorant",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Viper - Valorant",
//     "title": "Viper"
// },
// {
//     "id": "prod_QpbFsRfn4v3UHU",
//     "category_id": 3,
//     "created_at": 1726082247,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Viper em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Viper-em-Croch%C3%AA-Amigurumi-de-Valorant-i.623543065.19097615701?sp_atk=a219d39e-165d-4714-a7f2-537cceab387e",
//     "media": [
//         "https://i.ibb.co/pZGGtNj/viper-img.jpg"
//     ],
//     "price": 135.90,
//     "product_group": "Valorant",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Viper - Valorant",
//     "title": "Viper"
// },
// {
//     "id": "prod_QpbFsRfn4v3UHU",
//     "category_id": 3,
//     "created_at": 1726082247,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Viper em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Viper-em-Croch%C3%AA-Amigurumi-de-Valorant-i.623543065.19097615701?sp_atk=a219d39e-165d-4714-a7f2-537cceab387e",
//     "media": [
//         "https://i.ibb.co/pZGGtNj/viper-img.jpg"
//     ],
//     "price": 135.90,
//     "product_group": "Valorant",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Viper - Valorant",
//     "title": "Viper"
// },
// {
//     "id": "prod_QpbFsRfn4v3UHU",
//     "category_id": 3,
//     "created_at": 1726082247,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Viper em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Viper-em-Croch%C3%AA-Amigurumi-de-Valorant-i.623543065.19097615701?sp_atk=a219d39e-165d-4714-a7f2-537cceab387e",
//     "media": [
//         "https://i.ibb.co/pZGGtNj/viper-img.jpg"
//     ],
//     "price": 135.90,
//     "product_group": "Valorant",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Viper - Valorant",
//     "title": "Viper"
// },
// {
//     "id": "prod_QpbFsRfn4v3UHU",
//     "category_id": 3,
//     "created_at": 1726082247,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Viper em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Viper-em-Croch%C3%AA-Amigurumi-de-Valorant-i.623543065.19097615701?sp_atk=a219d39e-165d-4714-a7f2-537cceab387e",
//     "media": [
//         "https://i.ibb.co/pZGGtNj/viper-img.jpg"
//     ],
//     "price": 135.90,
//     "product_group": "Valorant",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Viper - Valorant",
//     "title": "Viper"
// },
// {
//     "id": "prod_QpbFsRfn4v3UHU",
//     "category_id": 3,
//     "created_at": 1726082247,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Viper em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Viper-em-Croch%C3%AA-Amigurumi-de-Valorant-i.623543065.19097615701?sp_atk=a219d39e-165d-4714-a7f2-537cceab387e",
//     "media": [
//         "https://i.ibb.co/pZGGtNj/viper-img.jpg"
//     ],
//     "price": 135.90,
//     "product_group": "Valorant",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Viper - Valorant",
//     "title": "Viper"
// },
// {
//     "id": "prod_QpbFsRfn4v3UHU",
//     "category_id": 3,
//     "created_at": 1726082247,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Viper em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Viper-em-Croch%C3%AA-Amigurumi-de-Valorant-i.623543065.19097615701?sp_atk=a219d39e-165d-4714-a7f2-537cceab387e",
//     "media": [
//         "https://i.ibb.co/pZGGtNj/viper-img.jpg"
//     ],
//     "price": 135.90,
//     "product_group": "Valorant",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Viper - Valorant",
//     "title": "Viper"
// },
// {
//     "id": "prod_QpbFsRfn4v3UHU",
//     "category_id": 3,
//     "created_at": 1726082247,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Viper em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Viper-em-Croch%C3%AA-Amigurumi-de-Valorant-i.623543065.19097615701?sp_atk=a219d39e-165d-4714-a7f2-537cceab387e",
//     "media": [
//         "https://i.ibb.co/pZGGtNj/viper-img.jpg"
//     ],
//     "price": 135.90,
//     "product_group": "Valorant",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Viper - Valorant",
//     "title": "Viper"
// },
// {
//     "id": "prod_QpbFsRfn4v3UHU",
//     "category_id": 3,
//     "created_at": 1726082247,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Viper em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Viper-em-Croch%C3%AA-Amigurumi-de-Valorant-i.623543065.19097615701?sp_atk=a219d39e-165d-4714-a7f2-537cceab387e",
//     "media": [
//         "https://i.ibb.co/pZGGtNj/viper-img.jpg"
//     ],
//     "price": 135.90,
//     "product_group": "Valorant",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Viper - Valorant",
//     "title": "Viper"
// },
// {
//     "id": "prod_QpbFsRfn4v3UHU",
//     "category_id": 3,
//     "created_at": 1726082247,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Viper em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Viper-em-Croch%C3%AA-Amigurumi-de-Valorant-i.623543065.19097615701?sp_atk=a219d39e-165d-4714-a7f2-537cceab387e",
//     "media": [
//         "https://i.ibb.co/pZGGtNj/viper-img.jpg"
//     ],
//     "price": 135.90,
//     "product_group": "Valorant",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Viper - Valorant",
//     "title": "Viper"
// },
// {
//     "id": "prod_QpbFsRfn4v3UHU",
//     "category_id": 3,
//     "created_at": 1726082247,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Viper em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Viper-em-Croch%C3%AA-Amigurumi-de-Valorant-i.623543065.19097615701?sp_atk=a219d39e-165d-4714-a7f2-537cceab387e",
//     "media": [
//         "https://i.ibb.co/pZGGtNj/viper-img.jpg"
//     ],
//     "price": 135.90,
//     "product_group": "Valorant",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Viper - Valorant",
//     "title": "Viper"
// },
// {
//     "id": "prod_QpbFsRfn4v3UHU",
//     "category_id": 3,
//     "created_at": 1726082247,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Viper em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Viper-em-Croch%C3%AA-Amigurumi-de-Valorant-i.623543065.19097615701?sp_atk=a219d39e-165d-4714-a7f2-537cceab387e",
//     "media": [
//         "https://i.ibb.co/pZGGtNj/viper-img.jpg"
//     ],
//     "price": 135.90,
//     "product_group": "Valorant",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Viper - Valorant",
//     "title": "Viper"
// },
// {
//     "id": "prod_QpbFsRfn4v3UHU",
//     "category_id": 3,
//     "created_at": 1726082247,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Viper em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Viper-em-Croch%C3%AA-Amigurumi-de-Valorant-i.623543065.19097615701?sp_atk=a219d39e-165d-4714-a7f2-537cceab387e",
//     "media": [
//         "https://i.ibb.co/pZGGtNj/viper-img.jpg"
//     ],
//     "price": 135.90,
//     "product_group": "Valorant",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Viper - Valorant",
//     "title": "Viper"
// },
// {
//     "id": "prod_QpbFsRfn4v3UHU",
//     "category_id": 3,
//     "created_at": 1726082247,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Viper em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Viper-em-Croch%C3%AA-Amigurumi-de-Valorant-i.623543065.19097615701?sp_atk=a219d39e-165d-4714-a7f2-537cceab387e",
//     "media": [
//         "https://i.ibb.co/pZGGtNj/viper-img.jpg"
//     ],
//     "price": 135.90,
//     "product_group": "Valorant",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Viper - Valorant",
//     "title": "Viper"
// },
// {
//     "id": "prod_QpbFsRfn4v3UHU",
//     "category_id": 3,
//     "created_at": 1726082247,
//     "description": [
//         "°❀⋆.ೃ࿔*:･ Viper em crochê!",
//         "Tem aproximadamente de 13 cm, olhos com trava e enchimento de fibra siliconada antialérgica."
//     ],
//     "link": "https://shopee.com.br/Viper-em-Croch%C3%AA-Amigurumi-de-Valorant-i.623543065.19097615701?sp_atk=a219d39e-165d-4714-a7f2-537cceab387e",
//     "media": [
//         "https://i.ibb.co/pZGGtNj/viper-img.jpg"
//     ],
//     "price": 135.90,
//     "product_group": "Valorant",
//     "purchase_count": 0,
//     "rating": 0,
//     "tag": "Viper - Valorant",
//     "title": "Viper"
// }
// ]

export function Dashboard({ products, totalItems }: { products: getDashboardProductsDTO[], totalItems: number }) {
    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <div className="flex flex-col">
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button size="icon" variant="outline" className="sm:hidden">
                                <PanelLeft className="h-5 w-5" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="sm:max-w-xs">
                            <nav className="grid gap-6 text-lg font-medium">
                                <Link
                                    href="#"
                                    className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                                >
                                    <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                                    <span className="sr-only">Acme Inc</span>
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    <Home className="h-5 w-5" />
                                    Dashboard
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    <ShoppingCart className="h-5 w-5" />
                                    Orders
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center gap-4 px-2.5 text-foreground"
                                >
                                    <Package className="h-5 w-5" />
                                    Products
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    <Users2 className="h-5 w-5" />
                                    Customers
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    <LineChart className="h-5 w-5" />
                                    Settings
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <DashboardHeader />
                </header>
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <Tabs defaultValue="all">
                        <TabsContent value="all">
                            <Card x-chunk="dashboard-06-chunk-0">
                                <CardHeader className="flex flex-row justify-between space-y-0">
                                    <div className="flex flex-col gap-2">
                                        <CardTitle>Produtos</CardTitle>
                                        <CardDescription>
                                            Gerencie seus produtos e monitore seus resultados
                                        </CardDescription>
                                    </div>
                                    <CardActions />
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="hidden w-[100px] sm:table-cell">
                                                    <span className="sr-only">Imagem</span>
                                                </TableHead>
                                                <TableHead>Nome</TableHead>
                                                <TableHead className="pl-[26px]">Status</TableHead>
                                                <TableHead className="hidden md:table-cell">
                                                    Preço
                                                </TableHead>
                                                <TableHead className="hidden md:table-cell">
                                                    Vendas totais
                                                </TableHead>
                                                <TableHead className="hidden md:table-cell"> 
                                                    Visualizações
                                                </TableHead>
                                                <TableHead className="hidden md:table-cell">
                                                    Criado em
                                                </TableHead>
                                                <TableHead>
                                                    <span className="sr-only">Ações</span>
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody className="w-full">
                                            <ProductsList products={products}/>
                                        </TableBody>
                                    </Table>
                                    <PaginationComponent
                                        totalProducts={totalItems}
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </main>
            </div>
        </div>
    )
}