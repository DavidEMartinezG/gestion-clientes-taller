import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Registro from "./pages/Registro";
import Lista from "./pages/Lista";

function App() {
  return (
    <Router>
      <div style={{ fontFamily: "Arial", padding: "30px 20px 400px" }}>
        {/* Menú de navegación */}
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/" style={{ marginRight: "15px" }}>Formulario</Link>
          <Link to="/lista">Ver Registros</Link>
        </nav>

        {/* Rutas */}
        <Routes>
          <Route path="/" element={<Registro />} />
          <Route path="/lista" element={<Lista />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
