/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  corePlugins: {
    preflight: false,
  },
    theme: {
        extend: {
            colors: {
                green_color: "#3D5300",
            },
            screens: {
                xs: "500px", // Adds a custom 'xs' breakpoint
            },
        },
    },
    plugins: [],
}
