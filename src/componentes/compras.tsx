import React, { useEffect, useState } from "react";

type Ingrediente = {
  id: number;
  nombre: string;
  foto: string;
  cantidad_disponible: number;
};

type ListaDeCompra = {
  id: number;
  nombre: string;
  items: { ingrediente_id: number; cantidad: number }[];
};

interface Datos {
  listas_de_compra: ListaDeCompra[];
  ingredientes: Ingrediente[];
}

function ListaDeCompraComponent() {
  const [datos, setDatos] = useState<Datos | null>(null);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const response = await import('../json/datos.json');
        setDatos(response.default);
        console.log(response.default);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      }
    };

    fetchDatos();
  }, []);

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
        datos.listas_de_compra.map((lista) => (
          <div key={lista.id} className="grid-item">
            <h1 className="titulo">{lista.nombre}</h1>
            {/* Renderiza los ingredientes y cantidades aquí */}
            <h2 className="subtitulo">Ingredientes:</h2>
            <ul className="listaIngredientes">
              {lista.items.map((item, itemIndex) => {
                const ingrediente = obtenerIngredientesPorIds([item.ingrediente_id])[0];
                return (
                  <li key={itemIndex}>
                    {`${ingrediente.nombre} - Cantidad: ${item.cantidad}`}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
    </div>
  );
}

export default ListaDeCompraComponent;
