const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { WebSocketServer } = require("ws");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const CAMPOS = ["hostname","ip","usuario","ram","ssd","status","sistema","ultimo_acesso","alerta","notas"];
let pcs = [];
let wsClients = [];

// Função de broadcast para WebSocket
const broadcast = (data) => {
  wsClients.forEach(client => {
    if(client.readyState === 1) client.send(JSON.stringify(data));
  });
};

// Rotas REST
app.get("/computadores", (req,res) => res.json(pcs));

app.post("/computadores", (req,res) => {
  const pc = req.body;
  const index = pcs.findIndex(p => p.hostname === pc.hostname);
  if(index >= 0) pcs[index] = pc;
  else pcs.push(pc);
  broadcast(pcs);
  res.json({ status:"ok", pc });
});

app.delete("/computadores/:hostname", (req,res) => {
  const { hostname } = req.params;
  const index = pcs.findIndex(p => p.hostname === hostname);
  if(index >= 0){
    pcs.splice(index,1);
    broadcast(pcs);
    res.json({ status:"ok", message:`${hostname} removido` });
  } else {
    res.status(404).json({ status:"erro", message:"PC não encontrado" });
  }
});

// Servidor HTTP + WebSocket
const server = app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("Frontend conectado via WS");
  wsClients.push(ws);
  ws.send(JSON.stringify(pcs));
  ws.on("close", () => {
    wsClients = wsClients.filter(c => c !== ws);
    console.log("Frontend desconectado");
  });
});
app.post("/copilot", (req,res) => {
  const { pergunta } = req.body;

  // segurança básica
  if(!pergunta){
    return res.json({ resposta: "Pergunta vazia 😅" });
  }

  const texto = pergunta.toLowerCase();

  // 🔴 PCs inativos
  if(texto.includes("inativo")){
    const inativos = pcs.filter(p => p.status === "inativo");
    return res.json({
      resposta: `Existem ${inativos.length} PCs inativos`
    });
  }

  // 🧠 RAM baixa
  if(texto.includes("ram")){
    const fracos = pcs.filter(p => parseInt(p.ram) < 8);
    return res.json({
      resposta: `${fracos.length} PCs com RAM baixa`
    });
  }

  // 💾 SSD pequeno
  if(texto.includes("ssd")){
    const pequenos = pcs.filter(p => parseInt(p.ssd) < 256);
    return res.json({
      resposta: `${pequenos.length} PCs com SSD pequeno`
    });
  }

  // ⚠️ alertas
  if(texto.includes("alerta")){
    const alertas = pcs.filter(p => p.alerta && p.alerta !== "");
    return res.json({
      resposta: `${alertas.length} PCs com alertas`
    });
  }

  // 🖥️ total
  if(texto.includes("total")){
    return res.json({
      resposta: `Você tem ${pcs.length} PCs cadastrados`
    });
  }

  // fallback
  res.json({
    resposta: "Ainda não entendi 😅 (tenta perguntar sobre RAM, SSD, inativos...)"
  });
});