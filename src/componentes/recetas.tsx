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

function RecetaComponent() {
    const [datos, setDatos] = useState<Datos | null>(null);
    const [busqueda, setBusqueda] = useState<string>(""); // Estado para la consulta de búsqueda

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

    // Función para manejar cambios en el campo de búsqueda
    const handleBusquedaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBusqueda(e.target.value);
    };

    // Filtrar las recetas según la consulta de búsqueda
    const recetasFiltradas = datos?.recetas.filter((receta) =>
        receta.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div>
            <div className="container">
            <input
                className="search-input"
                type="text"
                placeholder="Buscar recetas..."
                value={busqueda}
                onChange={handleBusquedaChange}
            />
            </div>
            

            <div className="grid-container">
                {recetasFiltradas?.map((receta) => (
                    <div key={receta.id} className="grid-item">
                        <h1 className="titulo">{receta.nombre}</h1>
                        <p className="descripcion">{receta.instrucciones}</p>
                        {/* Renderiza los ingredientes aquí */}
                        <h2 className="subtitulo">Ingredientes:</h2>
                        <ul className="listaIngredientes">
                            {obtenerIngredientesPorIds(receta.ingredientes).map(
                                (ingrediente, ingredienteIndex) => (
                                    <li key={ingrediente.id}>{`${ingrediente.nombre}`}</li>
                                )
                            )}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default RecetaComponent;
