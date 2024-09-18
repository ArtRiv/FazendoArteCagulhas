import React from "react";
import { TopBar } from "./top-bar/top-bar";
import { Grid } from "./grid/grid";

interface DashbarInterface {
  selectedRoute: string,
};

export const Dashboard = ({ selectedRoute }: DashbarInterface) => {
  return (
    <div className="bg-white rounded-lg pb-4 shadow absolute top-3 left-56 w-10/12">
      <TopBar />
      <Grid />
    </div>
  );
};