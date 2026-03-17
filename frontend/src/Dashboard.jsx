import { useState, useEffect } from "react";

// Campos configuráveis (mesmo do backend)
const CAMPOS = ["hostname","ip","usuario","ram","ssd","status","sistema","ultimo_acesso","alerta","notas"];

export default function Dashboard({ computadoresExternos }) {
  const [computadores, setComputadores] = useState([]);
  const [filtro, setFiltro] = useState("");

  // Carregar PCs do backend se não forem passados via props
  const carregar = async () => {
    if(computadoresExternos){
      setComputadores(computadoresExternos);
      return;
    }
    const res = await fetch("http://localhost:3000/computadores");
    const data = await res.json();
    setComputadores(data);
  }

  useEffect(()=>{carregar()}, [computadoresExternos]);

  // Filtro por hostname ou status
  const filtrados = computadores.filter(pc =>
    pc.hostname.toLowerCase().includes(filtro.toLowerCase()) ||
    pc.status.toLowerCase().includes(filtro.toLowerCase())
  );

  // Cálculos para dashboard
  const total = filtrados.length;
  const ativos = filtrados.filter(pc => pc.status === "ativo").length;
  const inativos = filtrados.filter(pc => pc.status === "inativo").length;

  // Somar RAM e SSD (converte para GB se estiver em string tipo "16GB")
  const totalRAM = filtrados.reduce((acc,pc)=>{
    const v = pc.ram ? parseInt(pc.ram.replace("GB","")) : 0;
    return acc + v;
  },0);

  const totalSSD = filtrados.reduce((acc,pc)=>{
    const v = pc.ssd ? parseInt(pc.ssd.replace("GB","")) : 0;
    return acc + v;
  },0);

  return (
    <div style={{marginTop:30}}>
      <h2>Dashboard</h2>
      <div style={{marginBottom:10}}>
        <input placeholder="Filtrar por hostname/status" 
          value={filtro} 
          onChange={e=>setFiltro(e.target.value)}
          style={{padding:5, width:250}}
        />
      </div>
      <div style={{display:"flex", gap:20, flexWrap:"wrap"}}>
        <div>Total PCs: {total}</div>
        <div style={{color:"green"}}>Ativos: {ativos}</div>
        <div style={{color:"red"}}>Inativos: {inativos}</div>
        <div>RAM total: {totalRAM} GB</div>
        <div>SSD total: {totalSSD} GB</div>
      </div>

      <table border="1" cellPadding="5" style={{marginTop:20,borderCollapse:"collapse",width:"100%"}}>
        <thead style={{backgroundColor:"#f0f0f0"}}>
          <tr>
            {CAMPOS.map(c => <th key={c}>{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {filtrados.map((pc,i)=>(
            <tr key={i} style={{color: pc.status==="inativo"?"red":"green"}}>
              {CAMPOS.map(c => <td key={c}>{pc[c] || "-"}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}