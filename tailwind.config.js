/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Scenture Design System ──────────────────────────────────
        ink:        '#0D0D0D',          // near-black — primary text, buttons
        canvas:     '#FAF9F7',          // warm off-white — page background
        gold:       '#C9A96E',          // aged gold — single accent
        'gold-dim': '#A8885A',          // deeper gold for hover states
        'ink-50':   'rgba(13,13,13,0.05)',
        'ink-muted':'rgba(13,13,13,0.45)',

        // ── Legacy tokens (kept for backward compat) ────────────────
        primary: {
          DEFAULT: '#C9A96E',
          dark:    '#A8885A',
          light:   '#E2CAA0',
        },
        secondary: {
          DEFAULT: '#0D0D0D',
          light:   '#2A2A2A',
        },
        accent: {
          DEFAULT: '#C9A96E',
          light:   '#E2CAA0',
        },
        cream:      '#FAF9F7',
        background: '#FAF9F7',
        muted: {
          DEFAULT:    'rgba(13,13,13,0.06)',
          foreground: 'rgba(13,13,13,0.40)',
        },
      },

      fontFamily: {
        heading:  ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display:  ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body:     ['"DM Sans"', 'system-ui', 'sans-serif'],
        sans:     ['"DM Sans"', 'system-ui', 'sans-serif'],
      },

      fontSize: {
        '2xs': ['10px', { letterSpacing: '0.12em' }],
      },

      letterSpacing: {
        widest:  '0.25em',
        wider:   '0.18em',
        label:   '0.20em',
      },

      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },

      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
};