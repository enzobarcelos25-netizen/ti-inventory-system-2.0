import { useState } from "react";

export default function Copilot() {
  const [pergunta, setPergunta] = useState("");
  const [resposta, setResposta] = useState("");

  const enviar = async () => {
    if(!pergunta) return;

    const res = await fetch("http://localhost:3000/copilot", {
      method:"POST",
      headers: { "Content-Type":"application/json" },
      body: JSON.stringify({ pergunta })
    });

    const data = await res.json();
    setResposta(data.resposta);
  };

  return (
    <div style={{
      marginTop:30,
      padding:20,
      border:"1px solid #ccc",
      borderRadius:10
    }}>
      <h3>Copilot IA 🤖</h3>

      <input
        placeholder="Pergunte algo (ex: PCs inativos)"
        value={pergunta}
        onChange={e=>setPergunta(e.target.value)}
        style={{padding:8, width:"70%", marginRight:10}}
      />

      <button onClick={enviar}>
        Perguntar
      </button>

      {resposta && (
        <div style={{marginTop:15}}>
          <strong>Resposta:</strong>
          <p>{resposta}</p>
        </div>
      )}
    </div>
  );
}