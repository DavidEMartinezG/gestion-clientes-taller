import { useState, useEffect } from "react";

function Lista() {
  const [clientes, setClientes] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [clienteActivo, setClienteActivo] = useState(null); // para expandir/collapse

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:3001/clientes").then((res) => res.json()),
      fetch("http://localhost:3001/vehiculos").then((res) => res.json()),
      fetch("http://localhost:3001/servicios").then((res) => res.json()),
    ]).then(([clientesData, vehiculosData, serviciosData]) => {
      setClientes(clientesData);
      setVehiculos(vehiculosData);
      setServicios(serviciosData);
    });
  }, []);

  const toggleCliente = (id) => {
    setClienteActivo((prev) => (prev === id ? null : id));
  };

  return (
    <div className="lista-clientes-container">
      <h2>Gestión de Clientes</h2>
      <ul className="lista-clientes">
        {clientes.map((c) => (
          <li key={c.id} className="item-cliente">
            <button
              onClick={() => toggleCliente(c.id)}
              className="cliente-btn"
            >
              {clienteActivo === c.id ? "▼" : "▶"} {c.nombre}
            </button>

            {clienteActivo === c.id && (
              <ul className="lista-vehiculos">
                {vehiculos
                  .filter((v) => v.clienteId === c.id)
                  .map((v) => (
                    <li key={v.id} className="item-vehiculo">
                      🚗 <strong>{v.nombre}</strong>
                      <ul className="lista-servicios">
                        {servicios
                          .filter((s) => s.vehiculoId === v.id)
                          .map((s) => (
                            <li key={s.id}>🔧 {s.tipo}</li>
                          ))}
                      </ul>
                    </li>
                  ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Lista;
