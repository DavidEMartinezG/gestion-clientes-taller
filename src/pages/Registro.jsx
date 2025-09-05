import { useState } from "react";

const URL = "http://localhost:3001/registros";

function Registro() {
  const [cliente, setCliente] = useState("");
  const [vehiculo, setVehiculo] = useState("");
  const [servicio, setServicio] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoRegistro = { cliente, vehiculo, servicio };

    fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoRegistro),
    }).then(() => {
      setCliente("");
      setVehiculo("");
      setServicio("");
      alert("Registro guardado con éxito ✅");
    });
  };

  return (
    <div>
      <h2>Formulario de Registro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Cliente: </label>
          <input value={cliente} onChange={(e) => setCliente(e.target.value)} required />
        </div>
        <div>
          <label>Vehículo: </label>
          <input value={vehiculo} onChange={(e) => setVehiculo(e.target.value)} required />
        </div>
        <div>
          <label>Servicio: </label>
          <input value={servicio} onChange={(e) => setServicio(e.target.value)} required />
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default Registro;
