import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"; // Asegúrate de tener react-router-dom instalado
import Swal from "sweetalert2"; // Asegúrate de tener sweetalert2 instalado
import Bar from '../includes/Bar'; // Ajusta las rutas según tu estructura de carpetas
import Navbar from '../includes/Navbar'; // Ajusta las rutas según tu estructura de carpetas
import Footer from '../includes/Footer'; // Ajusta las rutas según tu estructura de carpetas

function Dashboard() {
  const history = useHistory();
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    // Simulamos la verificación de sesión
    const usuario = sessionStorage.getItem("usuario"); // O cualquier método que uses para verificar la sesión
    if (!usuario) {
      history.push("/index"); // Redirigir a la página de inicio de sesión
    }

    // Mostrar mensaje si existe
    const mensajeDesdeSesion = sessionStorage.getItem("mensaje");
    if (mensajeDesdeSesion) {
      setMensaje(mensajeDesdeSesion);
      sessionStorage.removeItem("mensaje"); // Limpiar el mensaje después de mostrarlo
    }
  }, [history]);

  useEffect(() => {
    if (mensaje) {
      Swal.fire({
        title: "Éxito",
        text: mensaje,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  }, [mensaje]);

  return (
    <div>
      <Bar />
      <Navbar />
      <div className="content">
        <main>
          <div className="title-descount">
            <h1>Descuentos</h1>
          </div>
          <div className="descount-TimeCSV">
            <h2>Descuento por archivo CSV temporal</h2>
            <form action="functions/Dest-csv-time.php" method="POST" id="myFormTIMECSV" encType="multipart/form-data">
              <label htmlFor="archivo">Selecciona un archivo (solo CSV):</label>
              <input type="file" id="archivo" name="archivo" accept=".csv" required />

              <label htmlFor="tiempoInicio">Fecha y hora de inicio:</label>
              <input type="datetime-local" id="tiempoInicio" name="tiempoInicio" required />

              <label htmlFor="tiempoFin">Fecha y hora de fin:</label>
              <input type="datetime-local" id="tiempoFin" name="tiempoFin" required />

              <button type="submit">Enviar</button>
            </form>
          </div>
          <div className="two-column-descount">
            <div className="descount-category">
              <form action="functions/Dest-category.php" method="POST" id="myFormCATEGORY">
                <h2>Descuento por categoría</h2>
                <label htmlFor="categoria">Selecciona una categoría:</label>
                <select id="categoria" name="categoria" required>
                  <option value="" disabled selected>-- Selecciona una categoría --</option>
                  <option value="categoria1">Categoría 1</option>
                  <option value="categoria2">Categoría 2</option>
                  <option value="categoria3">Categoría 3</option>
                  <option value="categoria4">Categoría 4</option>
                </select>
                <label htmlFor="porcentaje">Ingresa un porcentaje (0-100):</label>
                <input type="number" id="porcentaje" name="porcentaje" min="0" max="100" required />
                <button type="submit">Enviar</button>
              </form>
            </div>
            <div className="descount-CSV">
              <h2>Descuento por archivo CSV</h2>
              <form action="functions/Dest-sku-csv.php" method="POST" id="myFormCSV" encType="multipart/form-data">
                <label htmlFor="archivo">Selecciona un archivo (solo CSV):</label>
                <input type="file" id="archivo" name="archivo" accept=".csv" required />
                <                <button type="submit">Enviar</button>
              </form>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;