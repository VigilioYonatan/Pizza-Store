const color = require("tailwindcss/colors");
/** @type {import('tailwindcss').Config} */
export default {
    content: ["./resources/views/**/*.pug", "./resources/ts/**/*.vue"],
    theme: {
        extend: {
            colors: {
                primary: "#CA0808",
                secondary: "#262626",
                background: {
                    dark: "#0F0F0F",
                    light: "#FFFFFF",
                },
                paper: {
                    light: "#F2F2F2",
                    dark: "#272727",
                },
                success: color.green["600"],
                danger: color.red["600"],
            },
            textColor: {
                secondary: {
                    dark: "#0F0F0F",
                    light: "#FFFFFF",
                },
                gray: color.gray["400"],
            },
        },
    },
    plugins: [],
    darkMode: ["class"],
};
