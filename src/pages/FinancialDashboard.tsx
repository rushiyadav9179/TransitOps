import React, { useMemo } from "react";
import { useApp } from "../context/AppContext";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  PieChart,
} from "lucide-react";

export const FinancialDashboard: React.FC = () => {

  const {
    trips,
    fuelLogs,
    maintenanceLogs,
    expenses
  } = useApp();

  const finance = useMemo(() => {

    const revenue = trips
      .filter(t => t.status === "Completed")
      .reduce((sum, t) => sum + t.revenue, 0);

    const fuel = fuelLogs
      .reduce((sum, f) => sum + f.cost, 0);

    const maintenance = maintenanceLogs
      .reduce((sum, m) => sum + (m.actualCost || 0), 0);

    const misc = expenses
      .reduce((sum, e) => sum + e.cost, 0);

    const totalExpenses =
      fuel +
      maintenance +
      misc;

    return {

      revenue,

      fuel,

      maintenance,

      misc,

      totalExpenses,

      profit:
        revenue -
        totalExpenses

    };

  }, [
    trips,
    fuelLogs,
    maintenanceLogs,
    expenses
  ]);

  return (

    <div className="p-6 space-y-6">

      <div>

        <h1 className="text-3xl font-bold">

          Finance Dashboard

        </h1>

        <p className="text-gray-500">

          Revenue, expense and profitability overview

        </p>

      </div>

      <div className="grid md:grid-cols-4 gap-5">

        <div className="bg-white rounded-xl shadow p-5">

          <TrendingUp className="text-green-600 mb-3"/>

          <p className="text-sm text-gray-500">

            Revenue

          </p>

          <h2 className="text-2xl font-bold">

            ₹{finance.revenue.toLocaleString()}

          </h2>

        </div>

        <div className="bg-white rounded-xl shadow p-5">

          <TrendingDown className="text-red-600 mb-3"/>

          <p className="text-sm text-gray-500">

            Expenses

          </p>

          <h2 className="text-2xl font-bold">

            ₹{finance.totalExpenses.toLocaleString()}

          </h2>

        </div>

        <div className="bg-white rounded-xl shadow p-5">

          <DollarSign className="text-blue-600 mb-3"/>

          <p className="text-sm text-gray-500">

            Net Profit

          </p>

          <h2 className="text-2xl font-bold">

            ₹{finance.profit.toLocaleString()}

          </h2>

        </div>

        <div className="bg-white rounded-xl shadow p-5">

          <PieChart className="text-purple-600 mb-3"/>

          <p className="text-sm text-gray-500">

            Fuel Cost

          </p>

          <h2 className="text-2xl font-bold">

            ₹{finance.fuel.toLocaleString()}

          </h2>

        </div>

      </div>

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="font-bold text-xl mb-4">

          Expense Breakdown

        </h2>

        <div className="space-y-3">

          <div className="flex justify-between">

            <span>Fuel</span>

            <strong>

              ₹{finance.fuel.toLocaleString()}

            </strong>

          </div>

          <div className="flex justify-between">

            <span>Maintenance</span>

            <strong>

              ₹{finance.maintenance.toLocaleString()}

            </strong>

          </div>

          <div className="flex justify-between">

            <span>Other Expenses</span>

            <strong>

              ₹{finance.misc.toLocaleString()}

            </strong>

          </div>

        </div>

      </div>

    </div>

  );

};