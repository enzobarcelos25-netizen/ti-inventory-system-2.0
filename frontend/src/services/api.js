const API_URL = "http://localhost:3000"

export async function getComputadores() {
  const response = await fetch(`${API_URL}/computadores`)
  return response.json()
}

export async function addComputador(pc) {
  await fetch(`${API_URL}/computadores`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(pc)
  })
}