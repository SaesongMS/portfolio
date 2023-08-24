import i18n from "i18next";
import I18NextHttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

const getCurrentHost = () => {
    const url = window.location.hostname === "localhost" ? "http://localhost:5173" : window.location.origin;
    return url;
}

i18n.use(initReactI18next)
    .use(I18NextHttpBackend)
    .use(initReactI18next)
    .init({
        lng: "en",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
        backend: {
            loadPath: `${getCurrentHost()}/i18n/{{lng}}.json`,
        },
    });

export default i18n;