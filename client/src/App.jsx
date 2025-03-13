// Importamos los componentes necesarios de react-router-dom para manejar la navegación.
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// Importamos la página que muestra las tareas.
import { TaskPage } from "./pages/TaskPage";
// Importamos la página para crear o editar una tarea.
import { TaskFormPage } from "./pages/TaskFormPage";
// Importamos el componente de navegación (por ejemplo, una barra de menú).
import { Navigation } from "./components/Navigation";
import {Toaster} from "react-hot-toast";

function App() {
  return (
    // BrowserRouter envuelve toda la aplicación para habilitar el enrutamiento.
    <BrowserRouter>
      <div className="container mx-auto">
          {/* Componente de navegación que se muestra en todas las rutas */}
      <Navigation />

      {/* Definimos las rutas de la aplicación */}
      <Routes>
        {/*
          Ruta raíz:
          Al acceder a "/", se redirige automáticamente a "/tasks"
          utilizando el componente Navigate.
        */}
        <Route path="/" element={<Navigate to="/tasks" />} />

        {/* Ruta para mostrar la lista de tareas */}
        <Route path="/tasks" element={<TaskPage />} />

        {/* Ruta para crear (o editar) una tarea */}
        <Route path="/tasks-create" element={<TaskFormPage />} />

        <Route path="/tasks/:id" element={<TaskFormPage />} />
      </Routes>
        <Toaster/>
      </div>
    </BrowserRouter>
  );
}

// Exportamos el componente App para poder utilizarlo en otros módulos.
export default App;
