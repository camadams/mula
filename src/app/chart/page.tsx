"use client";

import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
} from "@/components/ui/chart";
import { getChartData } from "./action";
import { useEffect, useState } from "react";
import { Spending } from "@/db/schema";
import { ChartDataType } from "../util";

export const description = "A pie chart with a label list";

// const chartData = [
//   { category: "chromelaa", price: 275, fill: "rgb(100,200,0)" },
//   { category: "safari", price: 200, fill: "rgb(0,200,200)" },
//   //   { category: "firefox", price: 187, fill: "var(--color-firefox)" },
//   //   { category: "edge", price: 173, fill: "var(--color-edge)" },
//   //   { category: "other", price: 90, fill: "var(--color-other)" },
// ];

// const chartData = [
//     {category: "food", price: 300, fill: "var(--color-chrome)"},
//     {category: "groceries", price: 200, fill: "var(--color-chrome)"}
//   ]

// const chartConfig: ChartConfig = {};

// chartData.forEach((item) => {
//   chartConfig[item.category] = {
//     label: item.category,
//   };
// });

// const d = getSpendingData();

export default function Component() {
  //   var chartData = await getSpendingData();
  //   var formatedChartData = chartData.map(d=>({ca: d.category,pr:d.price, fill: "var(--color-chrome)"}))

  const [spendings, setspendings] = useState<Spending[] | null>(null);
  const [chartData, setChartData] = useState<ChartDataType[] | null>(null);
  const [chartConfig, setChartConfig] = useState<ChartConfig | null>(null);
  const [isLoadingspendings, setIsLoadingspendings] = useState<boolean>(false);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setIsLoadingspendings(true);
        const chartData: ChartDataType[] = await getChartData();
        setChartData((prev) => chartData);

        const chartConfig: ChartConfig = {};

        chartData.forEach((item) => {
          chartConfig[item.category] = {
            label: item.category,
          };
        });
        setChartConfig(() => chartConfig);
      } catch (error) {
        console.error("Failed to get spendings:", error);
      } finally {
        setIsLoadingspendings(false);
      }
    };
    fetchChartData();
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Label List</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {chartData && chartConfig && (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              {/* <ChartTooltip
              content={<ChartTooltipContent nameKey="price" hideLabel />}
            /> */}
              <Pie data={chartData} dataKey="price" label>
                <LabelList
                  dataKey="category"
                  className="fill-background"
                  stroke="none"
                  fontSize={12}
                  formatter={(value: keyof typeof chartConfig) =>
                    chartConfig[value]?.label
                  }
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
