# Conexa FE Challenge

App demo **Android‑only** construida con React Native (Expo 53, managed). Muestra posts, usuarios y favoritos consumiendo el JSON Placeholder.

---

## Stack

| Tool         | Versión |
| ------------ | ------- |
| Node         | 22.17.0 |
| pnpm         | 10.12.4 |
| Expo         | 53      |
| React Native | 0.79.5  |
| Jest         | 29.7    |

> Compila y corre únicamente en **Android**..

---

## Requisitos de entrega en el siguiente link:

- **https://conexatech.notion.site/React-Native-Challenge-136c9971a66680cd83dff29b2775fe8e**

---

## Requisitos para el emulador

- **Windows 10/11 de 64 bits** con **Hyper-V** (o virtualización VT‑x / AMD‑V) habilitada desde la BIOS para poder arrancar el emulador.
- **Android Studio 2024.3.2.15** → archivo `android-studio-2024.3.2.15-windows.exe` (≈1.3 GB) que incluye el AVD Manager.
  - Descarga oficial: <https://developer.android.com/studio>

---

## Arquitectura y patrón de diseño

**Feature-Sliced Architecture (FSA)** para la organización de carpetas + **Flux** (implementado con **Redux Toolkit & RTK Query**) para el flujo de datos.

### ¿Qué implica?

1. **Feature-Sliced** → cada funcionalidad vive en su propia carpeta (`posts`, `auth`, …) con UI, lógica y tests juntos.  
2. **Flux/Redux** → flujo unidireccional de datos: `action → slice → state → UI`  
   RTK Toolkit reduce el boilerplate y RTK Query añade *caching* + *data-fetching* tipado.

### ¿Por qué es óptimo para este proyecto?

| Ventaja | Explicación breve |
| ------- | ----------------- |
| **Aislamiento de features** | Modificar `posts` no afecta `auth`; menos riesgo de regressions. |
| **Escalabilidad lineal** | Agregar nueva funcionalidad = copiar carpeta; no crece complejidad global. |
| **Pruebas localizadas** | Jest sólo mockea dentro del feature; suites pequeñas y rápidas. |
| **Onboarding rápido** | Cualquier dev encuentra TODO lo de una feature en un único lugar. |
| **Depuración sencilla** | Flux + DevTools muestran la historia de estados sin *props drilling*. |
| **Menos dependencias** | RTK Query evita Axios/React Query extras, manteniendo peso ligero. |

---

## Decisiones clave

| Área                                         | Elección                                                                                                      | Porqué                                                                                                                                              |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Gestión de datos**                         | **Redux Toolkit + RTK Query**                                                                                 | API concisa y tipada; evita el boilerplate de Redux “a mano”. RTKQ trae caching, invalidación y estados `isLoading/isFetching` ya listos.           |
| **HTTP client**                              | `fetchBaseQuery` (nativo en RTKQ)                                                                             | El proyecto solo consume unos pocos endpoints; la flexibilidad extra de Axios no era necesaria. Menos dependencias = menos peso.                    |
| **Persistencia**                             | **AsyncStorage** comprimido con _pako_                                                                        | Guardar favoritos por usuario y reducir 70 % el tamaño frente a JSON plano.                                                                         |
| **Multi-idioma**                             | **i18next** + `expo-localization`                                                                             | Cambiar idioma (EN/ES) con un tap; evita duplicar componentes o strings.                                                                            |
| **Imágenes**                                 | **expo-image**                                                                                                | Carga optimizada, caché integrada y transiciones `contentFit` sin dependencias nativas adicionales.                                                 |
| **Alertas**                                  | **react-native-toast-message**                                                                                | Notificaciones de error/no‑intrusivas, configurables en un solo lugar.                                                                              |
| **Alcance**                                  | **Android**                                                                                                   | El reto pedía enfoque mobile; evitar carpetas iOS/web simplifica build y peso final.                                                                |
| **Gestión de paquetes**                      | **pnpm**                                                                                                      | Instalación determinista y ultrarrápida con uso mínimo de disco gracias a su store global; ideal para mantener baja la carga y alta la performance. |
| **Sin EAS Build / Deep Linking / Dark Mode** | No se implementan por ser un **challenge** pequeño; priorizamos funcionalidad principal y cobertura de tests. |                                                                                                                                                     |

> Credenciales Login: **admin@test.com / 123456A**

---

## Carpetas principales

```
src/
  api/        # endpoints RTK Query
  components/ # UI reutilizable (Auth, Header, Main)
  hooks/      # lógica reusada (usePosts, useFavorites…)
  navigation/ # Stack + Tabs
  screens/    # Auth, Home, Details, Users, Favorites
  store/      # slices + middleware
  storage/    # helpers AsyncStorage
  theme/      # colores, tamaños, etc
  utils/      # helpers generales
```

Cada feature incluye: `index.tsx`, `styles.ts`, `index.test.tsx`, `types.ts`, `interfaces.ts`.

---

## Flujo de la app

1. **Login** – email + pass, idioma con icono 🌐.
2. **Noticias** – FlatList con paginado 10 → 50, buscador-filtro, fav ⭐.
3. **Favoritos** – lista local por usuario logueado actualmente.
4. **Usuarios** – datos `/users`.
5. **Detalle** – post completo con su respectiva imagen.

---

## Variables de entorno

```env
API_BASE_URL=https://jsonplaceholder.typicode.com (datos mock lorem ipsum)
IMAGE_BASE_URL=https://picsum.photos (imagenes mock para darle un visual más estetico)
```

---

## Preparar el entorno

1. **Instalar Node.js**  
   • Ir a <https://nodejs.org/es/download>.  
   • Descargar el _Windows Installer_ (versión LTS recomendada).  
   • Ejecutar → _Siguiente_ → _Terminar_. Al terminar reiniciá la terminal y ejecutá:

   ```bash
   node -v   # debería mostrar 22.x
   npm -v    # debería mostrar 10.x
   Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned (para habilitar la ejecución de scripts y que npm -v funcione)
   ```

2. **Instalar pnpm (global)**  
   En la misma terminal:

   ```bash
   npm install -g pnpm
   pnpm -v   # debería mostrar 10.x
   ```

---

## Instalación del proyecto

```bash
pnpm install          # dependencias
```

---

## Scripts

| Script       | Acción                                                                                                                                              |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm start` | Inicia el servidor de desarrollo de Expo; asegurate de tener un emulador o dispositivo Android conectado/abierto y luego presioná "a" para lanzarlo |
| `pnpm test`  | Jest + Coverage stats                                                                                                                               |

---
