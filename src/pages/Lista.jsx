import { useState, useEffect } from "react";

const URL = "http://localhost:3001/registros";

function Lista() {
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => setRegistros(data));
  }, []);

  const handleDelete = (id) => {
    fetch(`${URL}/${id}`, { method: "DELETE" }).then(() =>
      setRegistros(registros.filter((r) => r.id !== id))
    );
  };

  return (
    <div>
      <h2>Registros Guardados</h2>
      <ul>
        {registros.map((r) => (
          <li key={r.id}>
            <strong>{r.cliente}</strong> – {r.vehiculo} ({r.servicio})
            <button onClick={() => handleDelete(r.id)} style={{ marginLeft: "10px" }}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Lista;
