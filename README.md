# Snake — Josue Hernandez

Implementación del juego clásico **Snake** desarrollada con React y Vite como proyecto universitario. El objetivo principal fue practicar la arquitectura de componentes, el manejo de estado con hooks y la comunicación entre componentes mediante props, todo con un diseño visual de estética neon-noir.

---

## Demo en vivo

El proyecto está desplegado y disponible en:

**[snake.jhgo.online](https://snake.jhgo.online)**

---

## Cómo correr el proyecto

### Requisitos
- Node.js v20 o superior
- npm

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/her24770/web-snake.git

# 2. Entrar al directorio
cd web-snake

# 3. Copiar el archivo de variables de entorno
cp .env.example .env

# 4. Instalar dependencias
npm install

# 5. Levantar el servidor de desarrollo
npm run dev
```

El proyecto estará disponible en `http://localhost:5173`.

---

## Variables de entorno

El ranking se conecta a una API externa. Para configurarlo, copia el archivo de ejemplo y completa la variable:

```bash
cp .env.example .env
```

Contenido de `.env.example`:

```
VITE_API_URL=/api
VITE_API_TARGET=https://snake.jhgo.online
```

| Variable | Descripción |
|---|---|
| `VITE_API_URL` | Ruta que usa el cliente para hacer fetch (relativa, evita CORS) |
| `VITE_API_TARGET` | Dominio al que el proxy de Vite redirige en desarrollo |

> `.env` está en `.gitignore` y **no se sube al repositorio**.
> `.env.example` sí se incluye como referencia para otros colaboradores.

Si alguna variable no está definida o la API no responde, el ranking simplemente aparecerá vacío sin mostrar ningún mensaje de error.
Este es un agregado extra, la funcionalidad sigue funcionando aunque no 

La version con api se encuentra en la rama version/deploy-server

---

## Cómo jugar

| Acción | Teclas |
|---|---|
| Mover la serpiente | `W A S D` o `↑ ↓ ← →` |
| Jugador 2 (modo 2J) | `↑ ↓ ← →` |
| Iniciar / Reiniciar | Botón en pantalla |

- Come la comida (punto blanco) para crecer y sumar **+10 puntos**
- Evita chocar con las paredes o con tu propio cuerpo
- Si rompes el top 10, se te pedirá tus iniciales para el ranking
- En modo 2 jugadores, el que choque primero pierde

---

## Tecnologías

- **React 19** — biblioteca de UI
- **Vite 8** — herramienta de build y servidor de desarrollo
- **React Router DOM v7** — navegación entre vistas
- **CSS puro** — estilos en archivos `.css` por componente, sin frameworks

---

## Estructura del proyecto

```
src/
├── App.jsx                        # Enrutador principal (BrowserRouter + rutas)
│
├── components/
│   ├── Layout.jsx                 # Wrapper compartido con Nav y Footer
│   ├── Nav.jsx / Nav.css          # Barra de navegación global
│   ├── Footer.jsx / Footer.css    # Pie de página global
│   │
│   ├── home/                      # Componentes exclusivos de la página Home
│   │   ├── Hero.jsx               # Sección principal con título y botón de inicio
│   │   ├── RankingPreview.jsx     # Vista previa del top 3 del ranking
│   │   └── Instructions.jsx       # Sección de instrucciones del juego
│   │
│   └── game/                      # Componentes del juego
│       ├── Board.jsx              # Tablero (grilla CSS)
│       ├── Cell.jsx               # Celda individual del tablero (con React.memo)
│       ├── Snake.jsx              # Segmento de serpiente
│       ├── Food.jsx               # Comida
│       ├── Score.jsx              # Barra de puntaje
│       ├── ModalStart.jsx         # Modal de inicio
│       ├── ModalGameOver.jsx      # Modal de fin de juego
│       ├── ModalConfig.jsx        # Modal de configuración (tamaño, velocidad, jugadores)
│       ├── ModalNuevoRecord.jsx   # Modal para guardar iniciales al romper top 10
│       ├── InstruccionesUnJugador.jsx
│       └── InstruccionesDosJugadores.jsx
│
├── game/
│   ├── Game.jsx                   # Componente principal del juego (estado y loop)
│   ├── gameLogic.js               # Lógica pura: initState, gameTick, randomFood
│   └── game.css                   # Estilos del juego
│
├── pages/
│   ├── home/
│   │   ├── Home.jsx               # Página de inicio
│   │   └── Home.css
│   ├── Play.jsx                   # Página del juego
│   └── Ranking.jsx / Ranking.css  # Página del ranking completo
│
└── utils/
    └── ranking.js                 # Lectura y escritura del ranking en localStorage
```

---

## Rúbrica y cumplimiento

A continuación se detalla cómo este proyecto cumple cada criterio de evaluación establecido por el instructor.

---

### Uso de React — 40 pts

#### Correcta separación en componentes — 20 pts ✅

El proyecto está dividido en más de 15 componentes, cada uno con una responsabilidad única y bien definida. El juego en sí está separado en piezas independientes: `Board` renderiza el tablero, `Snake` representa un segmento, `Food` la comida, `Score` el puntaje, y `Cell` cada celda individual. Los modales son componentes separados (`ModalStart`, `ModalGameOver`, `ModalConfig`, `ModalNuevoRecord`). Los componentes de navegación (`Nav`, `Footer`, `Layout`) son reutilizados en todas las páginas mediante el sistema de rutas de React Router, evitando repetición de código.

#### Uso adecuado de props — 10 pts ✅

Todos los datos fluyen de componentes padre a hijo mediante props. `Board` recibe `cols`, `rows`, `snake`, `snake2` y `food` para renderizar el estado actual del tablero. `Cell` recibe `isSnake`, `isHead`, `isSnake2`, `isHead2` e `isFood` como booleans para decidir qué renderizar. `Snake` recibe `isHead` y `player` para aplicar el estilo correcto. `Score` recibe `score`, `score2`, `highScore` y `players` para adaptarse al modo de juego. Los modales reciben callbacks (`onStart`, `onRestart`, `onConfig`, `onSave`) para comunicar eventos de vuelta al padre sin acoplar los componentes.

#### Manejo correcto del estado — 10 pts ✅

El estado del juego se maneja con `useState` en `Game.jsx`: el estado completo de la partida (`snake`, `food`, `score`, `status`, `dir`), la configuración elegida (`size`, `speed`, `players`) y el puntaje máximo (`highScore`). El loop del juego corre dentro de un `useEffect` que inicia y limpia un `setInterval` cada vez que el status cambia a `'playing'`. Un segundo `useEffect` registra y limpia el listener de teclado. Un tercero detecta el game over y verifica si el puntaje entra al top 10. Se usa `useRef` para la dirección siguiente (`nextDir`) evitando problemas de closures dentro del intervalo.

---

### Lógica del Juego — 30 pts

#### Movimiento funcional de la serpiente — 10 pts ✅

La serpiente se mueve mediante un intervalo (`setInterval`) cuya velocidad es configurable (Lento: 220ms, Normal: 140ms, Rápido: 75ms). En cada tick, se calcula la nueva posición de la cabeza sumando el delta de dirección correspondiente. La dirección se actualiza desde el teclado de forma asíncrona con `useRef`, lo que garantiza que el intervalo siempre lea la dirección más reciente sin necesidad de reiniciarse. Se implementa la restricción de no poder girar en 180° (usando un mapa de direcciones opuestas `OPPOSITE`).

#### Detección de colisiones — 10 pts ✅

Se detectan dos tipos de colisión: con los bordes del tablero (verificando que la nueva cabeza no salga de los límites `cols` y `rows`) y consigo misma (verificando que la nueva cabeza no coincida con ningún segmento del cuerpo actual). En modo 2 jugadores se añade colisión cruzada: cada serpiente puede chocar con el cuerpo de la otra, y si ambas cabezas llegan a la misma celda en el mismo tick se considera empate.

#### Crecimiento y puntaje — 10 pts ✅

Al detectar que la cabeza nueva coincide con la posición de la comida, la serpiente crece: en lugar de eliminar el último segmento, el nuevo segmento se añade al frente sin quitar la cola. El puntaje aumenta en 10 por cada alimento consumido. Inmediatamente se genera una nueva posición de comida de forma aleatoria, garantizando que no aparezca sobre ningún segmento de ninguna serpiente. El puntaje más alto de la sesión se persiste en `highScore` y el top 10 general en `localStorage`.

---

### Estructura del Código — 20 pts

#### Código claro y organizado — 10 pts ✅

Los archivos están organizados por responsabilidad en carpetas claras (`components/game/`, `components/home/`, `pages/`, `game/`, `utils/`). Los nombres de componentes, funciones y variables son descriptivos. Los estilos están en archivos `.css` separados por componente o página, sin mezclar lógica con presentación.

#### Separación lógica entre responsabilidades — 10 pts ✅

La lógica pura del juego (`initState`, `gameTick`, `randomFood`, constantes de dirección y configuración) vive en `gameLogic.js`, completamente separada de cualquier componente React. `Game.jsx` se limita a orquestar el estado, los efectos y los eventos, delegando el renderizado a sus componentes hijos. El acceso al ranking (lectura y escritura en `localStorage`) está encapsulado en `utils/ranking.js`, de modo que si en el futuro se conecta a una API solo ese archivo cambia.

---

### Interfaz — 10 pts ✅

La interfaz sigue una estética neon-noir consistente en todas las vistas. El tablero se adapta al tamaño elegido mediante CSS Grid con `aspect-ratio` dinámico. La paleta de colores diferencia claramente la cabeza de la serpiente del cuerpo, la comida tiene una animación de pulso, y el jugador 2 tiene un color completamente distinto (teal) para distinguirlos visualmente. Los tres modales del juego (inicio, configuración, game over) se superponen al tablero de forma clara sin interrumpir la estructura de la página.

---

### Extras — 15 pts adicionales

#### Animaciones suaves — +5 pts ✅

La comida tiene una animación CSS (`food-pulse`) de escala y opacidad en loop continuo. Los segmentos de la serpiente tienen `box-shadow` con efecto de brillo (glow) que diferencia visualmente la cabeza del cuerpo. Los botones tienen transiciones suaves de opacidad y escala al hacer hover y click.

#### Pantalla de inicio y reinicio — +5 pts ✅

Al entrar al juego aparece un modal de inicio sobre el tablero. Al terminar la partida aparece un modal de game over con el puntaje final y opciones para reintentar o cambiar la configuración. Si el puntaje entra al top 10, aparece un modal adicional pidiendo las iniciales del jugador antes de mostrar el game over.

#### Niveles o aumento de dificultad — +5 pts ✅

El jugador puede configurar el juego antes de empezar: tres tamaños de tablero (Pequeño, Mediano, Grande) y tres velocidades (Lento, Normal, Rápido). Esta configuración es accesible tanto desde el modal de inicio como desde el modal de game over, permitiendo cambiarla entre partidas.
