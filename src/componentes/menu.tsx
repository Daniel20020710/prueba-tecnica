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
  id: number;
  nombre: string;
  descripcion: string;
  platos: Plato[];
};

interface Datos {
  recetas: Receta[];
  menus: Menu[];
  ingredientes: Ingrediente[];
}


function MenuComponent() {


  const [datos, setDatos] = useState<Datos | null>(null);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const response = await import('../json/datos.json');
        setDatos(response.default);
        console.log(response.default)
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      }
    };
  
    fetchDatos();
  }, []);
 
  

  const obtenerRecetaPorId = (recetaId: number): Receta | undefined => {
    return datos?.recetas.find((receta) => receta.id === recetaId);
  };
  const obtenerIngredientesPorIds = (ingredientesIds: number[]): Ingrediente[] => {
    return ingredientesIds.map((ingredienteId) => {
      const ingrediente = datos?.ingredientes.find((i) => i.id === ingredienteId);
      if (ingrediente) {
        return ingrediente;
      } else {
        return {
          id: ingredienteId,
          nombre: `Ingrediente ${ingredienteId}`,
          foto: '',
          cantidad_disponible: 0,
        };
      }
    });
  };

  return (
    <div className="grid-container">
      {datos &&
        datos.menus.map((menu) => (
          <div key={menu.id} className="grid-item">
            <h1 className="titulo">{menu.nombre}</h1>
            <p className="descripcion">{menu.descripcion}</p>
            {/* Renderiza los platos y recetas aquí */}
            {menu.platos.map((plato, platoIndex) => {
              const receta = obtenerRecetaPorId(plato.receta_id);

              if (!receta) {
                return <p key={platoIndex}>Receta no encontrada</p>;
              }

              // Obtener ingredientes por IDs
              const ingredientesReceta = obtenerIngredientesPorIds(
                receta.ingredientes
              );

              return (
                <div key={receta.id}>
                  <h2 className="nombreReceta">Receta: {receta.nombre}</h2>
                  <h3 className="nombreIngredientes">Ingredientes:</h3>
                  <ul className="listaIngredientes">
                    {ingredientesReceta.map((ingrediente, ingredienteIndex) => (
                      <li key={ingrediente.id}>
                        {`${ingrediente.nombre}`}
                      </li>
                    ))}
                  </ul>
                  <p className="cantidadPorciones">Cantidad de porción: {plato.porciones}</p>
                </div>
              );
            })}
          </div>
        ))}
    </div>
  );
}

export default MenuComponent;
