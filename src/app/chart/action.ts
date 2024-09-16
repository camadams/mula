"use server";

import { db } from "@/db";
import { Spending, spendingTable } from "@/db/schema";
import { ChartDataType } from "../util";

export async function getChartData() : Promise<ChartDataType[]> {
  const spendings: Spending[] = await db.select().from(spendingTable);
  const chartData = spendings.map((spending) => ({
    category: spending.category,
    price: spending.price,
    fill: `rgb(${Math.floor(Math.random() * 256)},${Math.floor(
      Math.random() * 256
    )},${Math.floor(Math.random() * 256)})`,
  }));
  console.log(chartData)
  return chartData;
}
