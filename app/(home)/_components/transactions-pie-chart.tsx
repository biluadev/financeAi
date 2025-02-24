"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import { Card, CardContent } from "@/app/_components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";
import { TransactionType } from "@prisma/client";
import { TransactionPercentagePerType } from "@/app/_data/get-dashboard/types";
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import PercentageItem from "./percentage-item";

const chartConfig = {
  [TransactionType.INVESTMENT]: {
    label: "Investido",
    color: "#fff",
  },

  [TransactionType.DEPOSIT]: {
    label: "Receita",
    color: "#55B02E",
  },

  [TransactionType.EXPENSE]: {
    label: "Despesa",
    color: "#E93030",
  },
} satisfies ChartConfig;

interface TransactionsPieChartProps {
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
  typesPercentage: TransactionPercentagePerType;
}

const TransactionPieChart = ({
  depositsTotal,
  investmentsTotal,
  expensesTotal,
  typesPercentage,
}: TransactionsPieChartProps) => {
  const chartData = [
    {
      type: TransactionType.DEPOSIT,
      amount: depositsTotal,
      fill: "#55B02E",
    },

    {
      type: TransactionType.EXPENSE,
      amount: expensesTotal,
      fill: "#E93030",
    },

    {
      type: TransactionType.INVESTMENT,
      amount: investmentsTotal,
      fill: "#FFF",
    },
  ];

  return (
    <Card className="flex flex-col">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        ></tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        ></tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>

        <div className="space-y-2">
          <PercentageItem
            icon={<TrendingUpIcon size={16} className="text-primary" />}
            title="Recitas"
            value={typesPercentage[TransactionType.DEPOSIT]}
          />
        </div>

        <div className="space-y-2">
          <PercentageItem
            icon={<TrendingDownIcon size={16} className="text-red-500" />}
            title="Despesas"
            value={typesPercentage[TransactionType.EXPENSE]}
          />
        </div>

        <div className="space-y-2">
          <PercentageItem
            icon={<PiggyBankIcon size={16} />}
            title="Investido"
            value={typesPercentage[TransactionType.INVESTMENT]}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionPieChart;
