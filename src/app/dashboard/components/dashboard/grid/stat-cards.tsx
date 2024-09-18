import Image from "next/image";
import React from "react";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export const StatCards = () => {
  return (
    <>
      <Card
        title="Visualização de produtos"
        total={1318}
        products={testeProducts}
        metric="views"
        period="From Jan 1st - Jul 31st"
        className="w-2/3"
      />
      <Card
        title="Produtos em carrinhos"
        total={32}
        products={testeProducts}
        metric="cart"
        period="Previous 365 days"
        className="w-1/3"
      />
    </>
  );
};

type analyticsProduct = {
  title: string,
  image: string,
  views: number,
  cart: number,
  trend: string,
}

const testeProducts: analyticsProduct[] = [
  {
    image: 'https://i.ibb.co/G30WtMX/yanfei-img.jpg',
    title: 'Yanfei',
    cart: 12,
    views: 534,
    trend: 'up',
  },
  {
    image: 'https://i.ibb.co/G30WtMX/yanfei-img.jpg',
    title: 'Yanfei',
    cart: 10,
    views: 296,
    trend: 'up',
  },
  {
    image: 'https://i.ibb.co/G30WtMX/yanfei-img.jpg',
    title: 'Yanfei',
    cart: 10,
    views: 137,
    trend: 'up',
  },
  {
    image: 'https://i.ibb.co/G30WtMX/yanfei-img.jpg',
    title: 'Yanfei',
    cart: 9,
    views: 121,
    trend: 'up',
  },
  {
    image: 'https://i.ibb.co/G30WtMX/yanfei-img.jpg',
    title: 'Yanfei',
    cart: 7,
    views: 101,
    trend: 'up',
  },
  {
    image: 'https://i.ibb.co/G30WtMX/yanfei-img.jpg',
    title: 'Yanfei',
    cart: 6,
    views: 95,
    trend: 'up',
  },
  {
    image: 'https://i.ibb.co/G30WtMX/yanfei-img.jpg',
    title: 'Ursinho Pooh',
    cart: 6,
    views: 83,
    trend: 'up',
  },
  {
    image: 'https://i.ibb.co/G30WtMX/yanfei-img.jpg',
    title: 'Yanfei',
    cart: 4,
    views: 74,
    trend: 'up',
  },
  {
    image: 'https://i.ibb.co/G30WtMX/yanfei-img.jpg',
    title: 'Yanfei',
    cart: 3,
    views: 53,
    trend: 'up',
  }
]

const Card = ({
  title,
  total,
  products,
  period,
  metric,
  className,
}: {
  title: string;
  total: number;
  products: analyticsProduct[];
  period: string;
  metric: 'views' | "cart";
  className?: string;
}) => {

  const getIntensityClass = (value: number) => {
    const percentage = (value / total) * 100;

    if (percentage >= 70) return "bg-green-600    text-green-100 shadow-xl";
    if (percentage >= 65) return "bg-green-500    text-green-100 shadow-xl";
    if (percentage >= 60) return "bg-green-500/90 text-green-800 shadow-lg";
    if (percentage >= 55) return "bg-green-500/80 text-green-800 shadow-lg";
    if (percentage >= 50) return "bg-green-500/70 text-green-800 shadow-lg";
    if (percentage >= 45) return "bg-green-500/60 text-green-900 shadow-md";
    if (percentage >= 30) return "bg-green-400    text-green-900 shadow-sm";
    if (percentage >= 15) return "bg-green-200    text-green-900 shadow-sm";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className={`${className} overflow-hidden p-4 rounded border border-stone-300`}>
      <div className="flex flex-col mb-4 items-start justify-between">
        <div className="w-full flex justify-between">
          <h3 className="text-stone-500 mb-4 text-md">{title}</h3>
          <h2 className="text-stone-500 mb-4 text-sm">
            <strong className="text-stone-700 mr-1">
              {total}
            </strong>
            {metric === 'views' ? ' visualizações totais' : ' produtos no carrinho'}
          </h2>
        </div>
        <ScrollArea className="w-full whitespace-nowrap rounded-md border bg-stone-100">
          <div className="flex w-max space-x-4 p-4">
            {products.map((product) => {
              return (
                <div>
                  <div className="relative cursor-pointer">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="flex flex-col gap-1">
                          <Image
                            src={product.image}
                            width={100}
                            height={100}
                            className="rounded-sm"
                            alt={product.title}
                          />
                          <span
                            className={`w-full text-xs flex items-center justify-between gap-1 font-medium px-2 py-1 backdrop-filter rounded ${getIntensityClass(
                              metric === "views" ? product.views : product.cart
                            )}`}
                          >
                            {metric === "views" ? `${product.views} views` : `${product.cart} in cart`}
                            {product.trend === "up" ? <FiTrendingUp /> : <FiTrendingDown />}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent className="bg-stone-100">
                          <p className="text-stone-700 text-sm text-center p-1">{product.title}</p>
                          <p className="text-stone-700 text-sm text-center p-1">
                            {metric === "views" ? `${(Math.round(product.views / total * 100))}% do total` : `${(Math.round(product.cart / total * 100))}% do total`}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              )
            })}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <p className="text-xs text-stone-500">{period}</p>
    </div>
  );
};


export interface Artwork {
  artist: string
  art: string
}

export const works: Artwork[] = [
  {
    artist: "Ornella Binni",
    art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Tom Byrom",
    art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
]

export function ScrollAreaHorizontalDemo() {
  return (
    <ScrollArea className="w-96 whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">

      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
