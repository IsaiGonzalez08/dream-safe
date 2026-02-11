/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
	'./node_modules/@svelte-kit/**/*.{html,js,svelte,ts}'
  ],
  theme: {
		extend: {
			colors: {
				primary: "#4E75FF",
				secondary: "#E1E6F8",
				softBlue: "#A1B5F9",
			},
			fontFamily: {
				'dm-serif-display': ['"DM Serif Display"', 'serif'],
				'dm-sans': ['"DM Sans"', 'sans-serif']
			}
		},
	},
  plugins: [],
}