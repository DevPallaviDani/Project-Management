/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        /* 🎨 Layout */
        bg: "var(--color-bg)",
        card: "var(--color-card)",
        "muted-bg": "var(--color-muted-bg)",
        sidebar: "var(--color-sidebar)",
        header: "var(--color-header)",

        /* ✍️ Text */
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          muted: "var(--color-text-muted)",
          heading: "var(--color-heading)",
          subheading: "var(--color-subheading)",
        },

        /* 🔲 Borders */
        border: "var(--color-border)",
        divider: "var(--color-divider)",

        /* 🎯 Primary */
        primary: "var(--btn-primary-bg)",
        "primary-hover": "var(--btn-primary-hover)",

        /* 🚨 States */
        danger: "var(--btn-danger-bg)",
        "danger-hover": "var(--btn-danger-hover)",
      },

      /* 🔘 Button Tokens */
      backgroundColor: {
        "btn-primary": "var(--btn-primary-bg)",
        "btn-primary-hover": "var(--btn-primary-hover)",

        "btn-secondary": "var(--btn-secondary-bg)",
        "btn-secondary-hover": "var(--btn-secondary-hover)",

        "btn-ghost-hover": "var(--btn-ghost-hover)",

        "btn-danger": "var(--btn-danger-bg)",
        "btn-danger-hover": "var(--btn-danger-hover)",
      },

      textColor: {
        "btn-primary": "var(--btn-primary-text)",
        "btn-secondary": "var(--btn-secondary-text)",
        "btn-ghost": "var(--btn-ghost-text)",
        "btn-danger": "var(--btn-danger-text)",
      },

      borderColor: {
        "btn-secondary": "var(--btn-secondary-border)",
      },
    },
  },
  plugins: [],
};
