import { PropTypes } from "@material-ui/core";
import { createContext, ReactNode, useState } from "react";

interface ThemeContextProps {
    children : ReactNode
}

interface ThemeContextData {
    theme : PropTypes.Color;
    toggleTheme: (theme: PropTypes.Color) => void;
}

const themeContextDefaultData: ThemeContextData = {
    theme: 'primary',
    toggleTheme: () => {}
}

export const ThemeContext = createContext<ThemeContextData>(themeContextDefaultData);

const ThemeContextProvider = ({children} : ThemeContextProps) => {
    const [theme, setTheme] = useState<PropTypes.Color>(themeContextDefaultData.theme);

    const toggleTheme = (theme: PropTypes.Color) => setTheme(theme);

    const themeContextDynamicData = {theme, toggleTheme}

    return <ThemeContext.Provider value={themeContextDynamicData}>
        {children}
    </ThemeContext.Provider>
}

export default ThemeContextProvider