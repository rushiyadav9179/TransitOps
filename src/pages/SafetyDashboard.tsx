import React from "react";
import { useApp } from "../context/AppContext";
import {
  ShieldCheck,
  AlertTriangle,
  UserCheck,
  Bell
} from "lucide-react";

export const SafetyDashboard: React.FC = () => {

  const { drivers, notifications } = useApp();

  const availableDrivers = drivers.filter(
    d => d.status === "Available"
  ).length;

  const activeDrivers = drivers.filter(
    d => d.status === "On Trip"
  ).length;

  const alerts = notifications.filter(
    n =>
      n.type === "Warning" ||
      n.type === "Error"
  );

  return (

    <div className="p-6 space-y-6">

      <div>

        <h1 className="text-3xl font-bold">

          Safety Operations

        </h1>

        <p className="text-gray-500">

          Driver safety and compliance monitoring

        </p>

      </div>

      <div className="grid md:grid-cols-3 gap-5">

        <div className="bg-white rounded-xl shadow p-5">

          <UserCheck
            className="text-blue-600 mb-3"
          />

          <h2 className="font-bold">

            Drivers Available

          </h2>

          <h1 className="text-3xl font-bold">

            {availableDrivers}

          </h1>

        </div>

        <div className="bg-white rounded-xl shadow p-5">

          <ShieldCheck
            className="text-green-600 mb-3"
          />

          <h2 className="font-bold">

            Drivers On Trip

          </h2>

          <h1 className="text-3xl font-bold">

            {activeDrivers}

          </h1>

        </div>

        <div className="bg-white rounded-xl shadow p-5">

          <AlertTriangle
            className="text-red-600 mb-3"
          />

          <h2 className="font-bold">

            Active Alerts

          </h2>

          <h1 className="text-3xl font-bold">

            {alerts.length}

          </h1>

        </div>

      </div>

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="font-bold text-lg flex items-center gap-2">

          <Bell size={18}/>

          Safety Notifications

        </h2>

        <div className="mt-4 space-y-3">

          {alerts.length===0 ?

          <p>No active alerts.</p>

          :

          alerts.map(alert=>(

            <div
              key={alert.id}
              className="border rounded-lg p-3">

              {alert.message}

            </div>

          ))

          }

        </div>

      </div>

    </div>

  );

};