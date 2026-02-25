/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "var(--color-bg-primary)",
          surface: "var(--color-bg-surface)",
          elevated: "var(--color-bg-elevated)",
        },
        accent: {
          primary: "var(--color-accent-primary)",
          hover: "var(--color-accent-hover)",
          active: "var(--color-accent-active)",
          disabled: "var(--color-accent-disabled)",
        },
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          onLight: "var(--color-text-onLight)",
          placeholder: "var(--color-text-placeholder)",
        },
        border: {
          default: "var(--color-border-default)",
          divider: "var(--color-border-divider)",
          focus: "var(--color-border-focus)",
        },
        overlay: "var(--color-overlay)",
        status: {
          success: "var(--color-status-success)",
          warning: "var(--color-status-warning)",
          error: "var(--color-status-error)",
        },
        habits: {
          meditation: "var(--color-habit-meditation)",
          work: "var(--color-habit-work)",
          workout: "var(--color-habit-workout)",
          journal: "var(--color-habit-journal)",
          noFap: "var(--color-habit-noFap)",
          sleep: "var(--color-habit-sleep)",
          reading: "var(--color-habit-reading)",
          hydration: "var(--color-habit-hydration)",
        },
      },
      fontFamily: {
        heading: "var(--font-heading)",
        body: "var(--font-body)",
      },
      fontSize: {
        h1: "var(--font-size-h1)",
        h2: "var(--font-size-h2)",
        h3: "var(--font-size-h3)",
        body: "var(--font-size-body)",
        bodySmall: "var(--font-size-body-small)",
        caption: "var(--font-size-caption)",
      },
      spacing: {
        xs: "var(--spacing-xs)",
        sm: "var(--spacing-sm)",
        md: "var(--spacing-md)",
        lg: "var(--spacing-lg)",
        xl: "var(--spacing-xl)",
        "2xl": "var(--spacing-2xl)",
        "3xl": "var(--spacing-3xl)",
      },
      borderRadius: {
        card: "var(--radius-card)",
        buttonLg: "var(--radius-button-lg)",
        buttonSm: "var(--radius-button-sm)",
        input: "var(--radius-input)",
        pill: "var(--radius-pill)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        button: "var(--shadow-button)",
        fab: "var(--shadow-fab)",
        modal: "var(--shadow-modal)",
      },
    },
  },
  plugins: [],
}
