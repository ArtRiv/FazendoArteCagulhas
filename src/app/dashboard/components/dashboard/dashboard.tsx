import React from "react";
import { TopBar } from "./top-bar";
import { Grid } from "./grid";

export const Dashboard = () => {
  return (
    <div className="bg-white rounded-lg pb-4 shadow">
      <TopBar />
      <Grid />
    </div>
  );
};