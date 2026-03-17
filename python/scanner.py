import requests
import random
from datetime import datetime

# Mesmos campos do backend
CAMPOS = ["hostname","ip","usuario","ram","ssd","status","sistema","ultimo_acesso","alerta","notas"]

API_URL = "http://localhost:3000/computadores"

# Função para gerar PC simulado automaticamente
def gerar_pc_simulado(i):
    ram_options = ["4GB","8GB","16GB","32GB"]
    ssd_options = ["128GB","256GB","512GB","1024GB"]
    status_options = ["ativo","inativo"]
    pc = {
        "hostname": f"PC-{i:03}",
        "ip": f"192.168.0.{i}",
        "usuario": f"user{i}",
        "ram": random.choice(ram_options),
        "ssd": random.choice(ssd_options),
        "status": random.choice(status_options),
        "sistema": random.choice(["Windows 10","Windows 11","Linux"]),
        "ultimo_acesso": datetime.now().strftime("%d/%m/%Y %H:%M:%S"),
        "alerta": "",
        "notas": ""
    }
    # Alertas automáticos
    if pc["ram"].replace("GB","") < "8":
        pc["alerta"] += "RAM baixa; "
    if pc["ssd"].replace("GB","") < "256":
        pc["alerta"] += "SSD pequeno; "
    return pc

# Quantos PCs gerar
NUM_PCS = 10

for i in range(1, NUM_PCS+1):
    pc = gerar_pc_simulado(i)
    try:
        r = requests.post(API_URL,json=pc)
        if r.status_code == 200:
            print(f"{pc['hostname']} enviado com sucesso! Alerta: {pc['alerta']}")
        else:
            print(f"Erro ao enviar {pc['hostname']}: {r.text}")
    except Exception as e:
        print(f"Erro de conexão: {e}")