import React, { useEffect, useState } from "react";

type Ingrediente = {
  id: number;
  nombre: string;
  foto: string;
  cantidad_disponible: number;
};

type Receta = {
  id: number;
  nombre: string;
  ingredientes: number[];
  instrucciones: string;
  foto: string;
};

type Plato = {
  receta_id: number;
  porciones: number;
  ingredientes?: number[]; // Hacer 'ingredientes' opcional
};

type Menu = {
  id?: number;
  nombre: string;
  descripcion?: string;
  platos?: Plato[];
};

interface Datos {
  recetas: Receta[];
  menus: Menu[];
  ingredientes: Ingrediente[];
}

// Tipo para representar un nuevo menú que se creará
type NuevoMenu = {
  id?: number;
  nombre: string;
  descripcion?: string;
  platos?: Plato[];
};

function MenuComponent() {
  const [datos, setDatos] = useState<Datos | null>(null);
  const [nuevoMenu, setNuevoMenu] = useState<NuevoMenu>({
    id: undefined,
    nombre: "",
    descripcion: "",
    platos: [],
  });

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const response = await import("../json/datos.json");
        setDatos(response.default);
        console.log(response.default);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchDatos();
  }, []);

  const handleNuevoMenuSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (datos && nuevoMenu) {
      try {
        // Realiza una solicitud POST a la API backend
        const response = await fetch("/json/datos.json", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(nuevoMenu),
        });

        if (response.status === 201) {
          // Éxito: Menú agregado correctamente
          alert("Menú agregado con éxito");
          // Limpiar el formulario después de agregar el menú
          setNuevoMenu({ nombre: "", descripcion: "", platos: [] });
        } else {
          // Error en la solicitud POST
          alert("Error al agregar el menú");
        }
      } catch (error) {
        console.error("Error en la solicitud POST:", error);
      }
    }
  };

  return (
    <div className="grid-container">
      <form method="POST" onSubmit={handleNuevoMenuSubmit}>
        <h2>Crear Nuevo Menú</h2>
        <input
          type="text"
          placeholder="Nombre del Menú"
          value={nuevoMenu.nombre}
          onChange={(e) =>
            setNuevoMenu({ ...nuevoMenu, nombre: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Descripción"
          value={nuevoMenu.descripcion}
          onChange={(e) =>
            setNuevoMenu({ ...nuevoMenu, descripcion: e.target.value })
          }
        />
        {/* Agregar campos para platos y otros detalles del menú */}
        <button className="button" type="submit">Guardar Menú</button>
      </form>
    </div>
  );
}

export default MenuComponent;
