'use client';
import { useState } from "react";
import ComparativaCrecos from "./comparativa-crecos/comparativa_crecos";
import ComparativaModelos from "./comparativa-de-modelos/comparativa_modelos";

export default function ComparativaTabs() {
  const [activeTab, setActiveTab] = useState("crecos");

  return (
    <div>
      <div className="flex space-x-2 border-b">
        <button
          className={`p-2 ${activeTab === "crecos" ? "font-bold border-b-2 border-blue-500" : ""}`}
          onClick={() => setActiveTab("crecos")}
        >
          Comparativa Empresas
        </button>
        <button
          className={`p-2 ${activeTab === "modelos" ? "font-bold border-b-2 border-blue-500" : ""}`}
          onClick={() => setActiveTab("modelos")}
        >
          Comparativa Modelos
        </button>
      </div>

      <div className="mt-4">
        {activeTab === "crecos" && <ComparativaCrecos />}
        {activeTab === "modelos" && <ComparativaModelos />}
      </div>
    </div>
  );
}
