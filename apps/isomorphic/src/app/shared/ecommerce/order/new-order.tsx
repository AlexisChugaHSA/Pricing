import React from "react";
import { useNavigate } from "react-router-dom";

export default function NewOrder() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Página Actual</h1>
      <button onClick={() => navigate("/nueva-pagina")}>
        Ir a Nueva Página
      </button>
    </div>
  );
};


