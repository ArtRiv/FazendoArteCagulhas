"use client"
import React, { Dispatch, SetStateAction } from "react";
import { IconType } from "react-icons";
import {
  FiDollarSign,
  FiPackage,
  FiTag,
  FiUsers,
} from "react-icons/fi";
import { IoAnalytics } from "react-icons/io5";

interface RouteSelectInterface {
  selectedRoute: string,
  setSelectedRoute: Dispatch<SetStateAction<string>>,
};

export const RouteSelect = ({selectedRoute, setSelectedRoute}: RouteSelectInterface) => {
  const routes = [
    { Icon: IoAnalytics, title: "Analytics" },
    { Icon: FiPackage, title: "Produtos" },
    { Icon: FiDollarSign, title: "Transações" },
    { Icon: FiTag, title: "Etiquetas de envio" },
    { Icon: FiUsers, title: "Usuários" },
  ];
  return (
    <div className="space-y-1">
      {routes.map((route) => (
        <Route
          key={route.title}
          Icon={route.Icon}
          title={route.title}
          selected={selectedRoute === route.title}
          onClick={() => setSelectedRoute(route.title)}
        />
      ))}
    </div>
  );
};

const Route = ({
  selected,
  Icon,
  title,
  onClick,
}: {
  selected: boolean;
  Icon: IconType;
  title: string;
  onClick: () => void;
}) => {
  return (
    <button
      className={`flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] 
        ${selected
          ? "bg-white text-stone-950 shadow"
          : "hover:bg-stone-200 bg-transparent text-stone-500 shadow-none"
        }`}
      onClick={onClick}
    >
      <Icon className={selected ? "text-violet-500" : ""} />
      <span>{title}</span>
    </button>
  );
};