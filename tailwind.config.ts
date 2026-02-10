/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
	'./node_modules/@svelte-kit/**/*.{html,js,svelte,ts}'
  ],
  theme: {
		extend: {
			fontFamily: {
				'dm-serif-display': ['"DM Serif Display"', 'serif'],
				'dm-sans': ['"DM Sans"', 'sans-serif']
			}
		},
	},
  plugins: [],
}