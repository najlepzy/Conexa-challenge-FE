import { getLocales } from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      logout: "Logout",
      tabs: {
        News: "News",
        Users: "Users",
        Favorites: "Favorites",
      },
      defaultTab: "News",
      detailTitle: "Detail",
      login: {
        title: "Conexa Login",
        emailPlaceholder: "Email",
        passwordPlaceholder: "Password",
        button: "Log in",
        errorTitle: "Login error",
        errorMessage: "Invalid credentials 😕",
      },
      detail: {
        notFound: "News not found.",
      },
      favorites: {
        empty: "No favorites yet.",
      },
      home: {
        searchPlaceholder: "Search news...",
        loadError: "Error loading news",
      },
      users: {
        loadError: "Error loading users.",
      },
      constants: {
        cardHeightMultiplier: "{{value}}",
        pageLimit: "{{value}}",
        errorLoadingMessage: "Error loading news",
      },
    },
  },
  es: {
    translation: {
      logout: "Salir",
      tabs: {
        News: "Noticias",
        Users: "Usuarios",
        Favorites: "Favoritos",
      },
      defaultTab: "Noticias",
      detailTitle: "Detalle",
      login: {
        title: "Conexa Login",
        emailPlaceholder: "Email",
        passwordPlaceholder: "Contraseña",
        button: "Ingresar",
        errorTitle: "Error de login",
        errorMessage: "Credenciales inválidas 😕",
      },
      detail: {
        notFound: "No se encontró la noticia.",
      },
      favorites: {
        empty: "No hay favoritos aún.",
      },
      home: {
        searchPlaceholder: "Buscar noticias...",
        loadError: "Error cargando noticias",
      },
      users: {
        loadError: "Error cargando usuarios.",
      },
      constants: {
        cardHeightMultiplier: "{{value}}",
        pageLimit: "{{value}}",
        errorLoadingMessage: "Error cargando noticias",
      },
    },
  },
};

const locales = getLocales();
const deviceLang = locales[0]?.languageCode || "en";

i18n.use(initReactI18next).init({
  resources,
  lng: deviceLang,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
