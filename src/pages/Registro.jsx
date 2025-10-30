import { useState, useEffect } from "react";


function Formulario() {
  const [clientes, setClientes] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState("");
  const [nuevoCliente, setNuevoCliente] = useState("");
  const [vehiculo, setVehiculo] = useState("");
  const [servicio, setServicio] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/clientes")
      .then((res) => res.json())
      .then((data) => setClientes(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let clienteId = clienteSeleccionado ? parseInt(clienteSeleccionado) : null;

    // 🔹 Si se escribió un nuevo cliente, crear ID consecutivo
    if (!clienteId && nuevoCliente) {
      const nuevoId =
        clientes.length > 0
          ? Math.max(...clientes.map((c) => parseInt(c.id))) + 1
          : 1;

      const nuevoClienteObj = { id: nuevoId, nombre: nuevoCliente };

      await fetch("http://localhost:3001/clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoClienteObj),
      });

      clienteId = nuevoId;
      setClientes([...clientes, nuevoClienteObj]);
    }

    // 🔹 Crear vehículo con ID consecutivo
    const vehiculosRes = await fetch("http://localhost:3001/vehiculos");
    const vehiculosData = await vehiculosRes.json();
    const nuevoVehiculoId =
      vehiculosData.length > 0
        ? Math.max(...vehiculosData.map((v) => parseInt(v.id))) + 1
        : 1;

    const nuevoVehiculo = {
      id: nuevoVehiculoId,
      clienteId: clienteId,
      nombre: vehiculo,
    };

    await fetch("http://localhost:3001/vehiculos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoVehiculo),
    });

    // 🔹 Crear servicio también con ID consecutivo
    const serviciosRes = await fetch("http://localhost:3001/servicios");
    const serviciosData = await serviciosRes.json();
    const nuevoServicioId =
      serviciosData.length > 0
        ? Math.max(...serviciosData.map((s) => parseInt(s.id))) + 1
        : 1;

    await fetch("http://localhost:3001/servicios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: nuevoServicioId,
        vehiculoId: nuevoVehiculoId,
        tipo: servicio,
      }),
    });

    // Limpiar campos
    setNuevoCliente("");
    setVehiculo("");
    setServicio("");
    setClienteSeleccionado("");
    alert("Registro guardado correctamente ✅");
  };

  return (
    <form onSubmit={handleSubmit} className="formulario-registro">
      <h2>Registrar nuevo servicio</h2>

      <label>Seleccionar cliente existente:</label>
      <select
        value={clienteSeleccionado}
        onChange={(e) => setClienteSeleccionado(e.target.value)}
      >
        <option value="">-- Selecciona cliente --</option>
        {clientes.map((c) => (
          <option key={c.id} value={c.id}>
            {c.nombre}
          </option>
        ))}
      </select>

      <label>O registrar nuevo cliente:</label>
      <input
        type="text"
        placeholder="Nombre del cliente"
        value={nuevoCliente}
        onChange={(e) => setNuevoCliente(e.target.value)}
      />

      <label>Vehículo:</label>
      <input
        type="text"
        placeholder="Ej. Tsuru 2008"
        value={vehiculo}
        onChange={(e) => setVehiculo(e.target.value)}
        required
      />

      <label>Servicio realizado:</label>
      <input
        type="text"
        placeholder="Ej. Cambio de aceite"
        value={servicio}
        onChange={(e) => setServicio(e.target.value)}
        required
      />

      <button type="submit">Guardar registro</button>
    </form>
  );
}

export default Formulario;
