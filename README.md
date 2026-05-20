# Tarea: Juego de Snake con React + Vite

## Objetivos

- Practicar la construcción de interfaces usando React.
- Aplicar el uso de componentes, props y estado.
- Entender cómo estructurar una aplicación en partes reutilizables.
- Configurar y trabajar con un proyecto React usando Vite como herramienta de build.

---

## Descripción

Deben desarrollar una implementación del juego clásico **Snake** utilizando React con Vite.

> **Importante:** El objetivo principal NO es solo que el juego funcione, sino que esté bien estructurado usando React (componentes, props, estado).

---

## Requerimientos Técnicos

Deben utilizar:

- **React** (con JSX)
- **Vite** como herramienta de build y servidor de desarrollo

Para crear el proyecto deben ejecutar:

```bash
npm create vite@latest snake-game -- --template react
cd snake-game
npm install
npm run dev
```

---

## Estructura Mínima (Obligatoria)

Su aplicación debe estar separada al menos en los siguientes componentes, cada uno en su propio archivo `.jsx`:

| Componente | Descripción |
|------------|-------------|
| `App` / `Game` | Contenedor principal |
| `Board` | Tablero del juego |
| `Snake` | Representación de la serpiente |
| `Food` | Comida |
| `Score` | Puntaje |

Pueden agregar más componentes si lo consideran necesario.

---

## Funcionalidad Mínima

El juego debe:

- Permitir mover la serpiente (teclado)
- Crecer al comer comida
- Detectar colisiones (pared o sí misma)
- Terminar el juego (game over)
- Mostrar el puntaje

---

## Restricciones Importantes

| | Regla |
|--|-------|
| ❌ | No se permite implementar todo en un solo componente |
| ❌ | No usar variables globales para manejar el estado del juego |
| ❌ | No manipular el DOM manualmente (`document.getElementById`, etc.) |
| ✅ | Deben usar `useState` para manejar el estado |
| ✅ | Deben usar `useEffect` para el loop del juego |
| ✅ | Deben pasar datos entre componentes usando props |

---

## Criterios de Evaluación (100 puntos)

### Uso de React — 40 pts
- **20 pts** — Correcta separación en componentes
- **10 pts** — Uso adecuado de props
- **10 pts** — Manejo correcto del estado (`useState`, `useEffect`)

### Lógica del Juego — 30 pts
- **10 pts** — Movimiento funcional de la serpiente
- **10 pts** — Detección de colisiones
- **10 pts** — Crecimiento y puntaje

### Estructura del Código — 20 pts
- **10 pts** — Código claro y organizado
- **10 pts** — Separación lógica entre responsabilidades (no mezclar todo)

### Interfaz — 10 pts
- **10 pts** — Presentación visual clara y usable

### Extras (Puntos adicionales)
- **+5 pts** — Animaciones suaves
- **+5 pts** — Pantalla de inicio o reinicio
- **+5 pts** — Niveles o aumento de dificultad

---

## Entrega

Repositorio en GitHub que incluya el proyecto completo (con `.gitignore` para excluir `node_modules`). El juego debe funcionar ejecutando:

```bash
npm install
npm run dev
```

El repositorio debe incluir un `README.md` con:

- Descripción breve
- Instrucciones para instalar y correr el proyecto
- Instrucciones para jugar

---

## Sugerencias

Sigan este orden incremental:

1. Crear el proyecto con Vite y verificar que corre.
2. Agregar una serpiente que se mueve.
3. Agregar comida.
4. Implementar colisiones.
5. Agregar puntaje.

> No intenten hacer todo al mismo tiempo.
