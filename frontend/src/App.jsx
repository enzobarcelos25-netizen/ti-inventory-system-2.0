import { useState } from "react";
import PCForm from "./components/PCForm";
import Dashboard from "./Dashboard";
import Copilot from "./components/Copilot";

export default function App() {
  const [computadores, setComputadores] = useState([]);

  return (
    <div style={{padding:30, fontFamily:"Arial, sans-serif"}}>
      <h1>TI Inventory - Sistema Profissional</h1>
      
      {/* Formulário de cadastro */}
      <PCForm onAtualizar={setComputadores} />

      {/* Dashboard */}
      <Dashboard computadoresExternos={computadores} />
      <Copilot />

      <footer style={{marginTop:50, textAlign:"center", color:"#666"}}>
        Sistema de Inventário de TI - Desenvolvido por você 💻
      </footer>
    </div>
  )
}