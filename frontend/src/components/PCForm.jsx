import { useState } from "react";

const CAMPOS = ["hostname","ip","usuario","ram","ssd","status","sistema","ultimo_acesso","alerta","notas"];

export default function PCForm() {
  const [pc, setPc] = useState({
    hostname:"", ip:"", usuario:"", ram:"", ssd:"", status:"ativo", sistema:"", ultimo_acesso:"", alerta:"", notas:""
  });

  const handleChange = e => {
    const { name,value } = e.target;
    setPc({...pc,[name]:value});
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try{
      await fetch("http://localhost:3000/computadores", {
        method:"POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(pc)
      });
      setPc({hostname:"", ip:"", usuario:"", ram:"", ssd:"", status:"ativo", sistema:"", ultimo_acesso:"", alerta:"", notas:""});
    } catch(err){
      console.error("Erro ao enviar PC:", err);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{marginTop:30,border:"1px solid #ccc",padding:20,borderRadius:10}}>
      <h3>Adicionar / Atualizar PC</h3>
      <div style={{display:"flex", flexWrap:"wrap", gap:10}}>
        {CAMPOS.map(c => (
          <input key={c} name={c} placeholder={c} value={pc[c]} onChange={handleChange} style={{padding:5, flex:"1 0 150px"}}/>
        ))}
      </div>
      <button type="submit" style={{marginTop:10,padding:"5px 15px"}}>Cadastrar</button>
    </form>
  )
}