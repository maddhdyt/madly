/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.vue",
  ],
  theme: {
    extend: {
      boxShadow: {
        // Enforce anti-slop rules: disable shadows
        sm: 'none',
        DEFAULT: 'none',
        md: 'none',
        lg: 'none',
        xl: 'none',
        '2xl': 'none',
        inner: 'none',
      },
      borderRadius: {
        // Enforce anti-slop rules: no large border radii
        lg: '0.25rem', // force rounded-lg to just rounded
        xl: '0.25rem',
        '2xl': '0.25rem',
        '3xl': '0.25rem',
      }
    },
  },
  plugins: [],
}
