module.exports = {
  theme: {
    extend: {
      padding: {
        "1/3": "33.3333%",
        "2/3": "66.6667%",
        "3/4": "75%",
        "9/16": "56.25%",
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#d6d9dc",
            strong: {
              color: "#d6d9dc",
              fontWeight: "500",
            },
            h1: {
              color: "#d6d9dc",
              fontWeight: "500",
            },
            h2: {
              color: "#d6d9dc",
              fontWeight: "500",
            },
            h3: {
              color: "#d6d9dc",
              fontWeight: "500",
            },
            h4: {
              color: "#d6d9dc",
              fontWeight: "500",
            },
            h5: {
              color: "#d6d9dc",
              fontWeight: "500",
            },
            h6: {
              color: "#d6d9dc",
              fontWeight: "500",
            },
            strong: {
              color: "white",
              fontWeight: "500",
            },
            blockquote: {
              color: "#d6d9dc",
            },
            code: {
              color: "#d6d9dc",
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
            pre: {
              backgroundColor: "#2d2d2d",
            },
            hr: {
              borderTop: "1px solid #2d2d2d",
            },
            a: {
              color: "#d6d9dc",
              "&:hover": {
                color: "#10b981",
              },
            },
            "ol > li::before": {
              color: "#56524e",
            },
            "ul > li::before": {
              color: "#56524e",
              backgroundColor: "#56524e",
            },
          },
        },
      },
    },
  },
  plugins: [
    require("windicss/plugin/forms"),
    require("windicss/plugin/aspect-ratio"),
    require("windicss/plugin/line-clamp"),
    require("windicss/plugin/typography"),
  ],
}
