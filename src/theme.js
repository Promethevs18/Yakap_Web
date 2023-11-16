import  { createContext, useState, useMemo } from "react"
import { createTheme } from "@mui/material/styles"

export const tokens = (mode) => ({
    ...(mode === "dark"
    ? {
      royal: {
          100: "#e5ddec",
          200: "#ccbbd9",
          300: "#b298c7",
          400: "#9976b4",
          500: "#7f54a1",
          600: "#664381",
          700: "#4c3261",
          800: "#332240",
          900: "#191120"
},
      pale: {
          100: "#fbf6ff",
          200: "#f7edff",
          300: "#f3e4ff",
          400: "#efdbff",
          500: "#ebd2ff",
          600: "#bca8cc",
          700: "#8d7e99",
          800: "#5e5466",
          900: "#2f2a33"
},
      paleVio: {
          100: "#f4e7ff",
          200: "#e9ceff",
          300: "#dfb6ff",
          400: "#d49dff",
          500: "#c985ff",
          600: "#a16acc",
          700: "#795099",
          800: "#503566",
          900: "#281b33"
},
      grey: {
          100: "#e3e1e5",
          200: "#c8c3cc",
          300: "#aca5b2",
          400: "#918799",
          500: "#75697f",
          600: "#5e5466",
          700: "#463f4c",
          800: "#2f2a33",
          900: "#171519"
},
      rich: {
          100: "#ece1f5",
          200: "#d9c3eb",
          300: "#c7a6e0",
          400: "#b488d6",
          500: "#a16acc",
          600: "#8155a3",
          700: "#61407a",
          800: "#402a52",
          900: "#201529"
},
    } 
    : {
      royal: {
        100: "#191120",
        200: "#332240",
        300: "#4c3261",
        400: "#664381",
        500: "#7f54a1",
        600: "#9976b4",
        700: "#b298c7",
        800: "#ccbbd9",
        900: "#e5ddec",
},
    pale: {
        100: "#2f2a33",
        200: "#5e5466",
        300: "#8d7e99",
        400: "#bca8cc",
        500: "#ebd2ff",
        600: "#efdbff",
        700: "#f3e4ff",
        800: "#f7edff",
        900: "#fbf6ff",
},
    paleVio: {
        100: "#281b33",
        200: "#503566",
        300: "#795099",
        400: "#a16acc",
        500: "#c985ff",
        600: "#d49dff",
        700: "#dfb6ff",
        800: "#e9ceff",
        900: "#f4e7ff",
},
    grey: {
        100: "#171519",
        200: "#2f2a33",
        300: "#463f4c",
        400: "#5e5466",
        500: "#75697f",
        600: "#918799",
        700: "#aca5b2",
        800: "#c8c3cc",
        900: "#e3e1e5",
},
    rich: {
        100: "#201529",
        200: "#402a52",
        300: "#61407a",
        400: "#8155a3",
        500: "#a16acc",
        600: "#b488d6",
        700: "#c7a6e0",
        800: "#d9c3eb",
        900: "#ece1f5",
},

    })
})

//MUI Theme settings
export const themeSettings = (mode) => {
    const colors = tokens(mode);
  
    return {
      palette: {
        mode: mode,
        ...(mode === "dark"
          ? {
              primary: {
                main: colors.royal[500],
              },
              secondary: {
                main: colors.paleVio[300],
              },
              neutral: {
                dark: colors.pale[700],
                main: colors.pale[500],
                light: colors.pale[100],
              },
              background: {
                default: colors.grey[500],
              },
              reddish: {
                main: colors.grey[500],
              },
            }
          : {
              primary: {
                main: colors.royal[100],
              },
              secondary: {
                main: colors.paleVio[500],
              },
              neutral: {
                dark: colors.pale[700],
                main: colors.pale[500],
                light: colors.pale[100],
              },
              background: {
                default: "#fcfcfc",
              },
            }),
      },
      typography: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 12,
        h1: {
          fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
          fontSize: 40,
        },
        h2: {
          fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
          fontSize: 32,
        },
        h3: {
          fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
          fontSize: 24,
        },
        h4: {
          fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
          fontSize: 20,
        },
        h5: {
          fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
          fontSize: 16,
        },
        h6: {
          fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
          fontSize: 14,
        },
      },
    };
  };
  
  // context for color mode
  export const ColorModeContext = createContext({
    toggleColorMode: () => {},
  });
  
  export const useMode = () => {
    const [mode, setMode] = useState("dark");
  
    const colorMode = useMemo(
      () => ({
        toggleColorMode: () =>
          setMode((prev) => (prev === "light" ? "dark" : "light")),
      }),
      []
    );
  
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  
    return [theme, colorMode];
  };