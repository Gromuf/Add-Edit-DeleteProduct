import { createContext } from "react";

const ProductContext = createContext()

export const Provider = ({ children }) => {
    const URL = 'http://localhost:2000'

    const valueToShare = {
        URL,
    }

    return (
        <ProductContext.Provider value={valueToShare}>
            {children}
        </ProductContext.Provider>
    )
}
export default ProductContext