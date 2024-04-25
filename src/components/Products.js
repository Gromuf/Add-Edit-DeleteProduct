import axios from "axios";
import { useState } from "react";
import { useContext } from 'react'
import ProductContext from '../contexts/products'

function Products() {
    const { URL } = useContext(ProductContext)

    const [productList, setProductList] = useState([])
    const [ProductId, setProductId] = useState(null)
    const [newProductTitle, setNewProductTitle] = useState('')
    const [newProductPrice, setNewProductPrice] = useState('')
    const [newProductDescription, setNewProductDescription] = useState('')

    const editProduct = (id) => {
        setProductId(id)
        const selectedProduct = productList.find(product => product.id === id);
        if (selectedProduct) {
            setNewProductTitle(selectedProduct.title);
            setNewProductPrice(selectedProduct.price.toString());
            setNewProductDescription(selectedProduct.descr);
        }
    }

    const titleChange = (event) => {
        setNewProductTitle(event.target.value);
    };

    const PriceChange = (event) => {
        setNewProductPrice(event.target.value);
    };

    const DescriptionChange = (event) => {
        setNewProductDescription(event.target.value);
    };

    const update = async () => {
        try {
            const updatedProduct = {
                title: newProductTitle,
                price: newProductPrice,
                descr: newProductDescription
            }
            await axios.put(URL + '/products/' + ProductId, updatedProduct)
            const updatedProducts = productList.map(product =>
                product.id === ProductId ? { ...product, ...updatedProduct } : product
            );
            setProductList(updatedProducts)
            setProductId(null)
        } catch (error) {
            console.error(error)
        }
    }

    const deleteProduct = async (id) => {
        console.log("delete cet id : " + id)
        try {
            await axios.delete(URL + '/products/' + id)
            const updatedProducts = productList.filter(product => product.id !== id)
            setProductList(updatedProducts)
        } catch (error) {
            console.error(error)
        }
    }

    const recupData = async () => {
        try {
            const { data: { data: products } } = await axios.get(URL + '/products')
            setProductList(products)

        } catch (error) {
            console.error(error)
        }
        //console.log('productlist' + productList)
    }
    return (
        <div>

            <button onClick={recupData}>recup data serveur</button >
            <ul>

                {productList.map((product, index) => {
                    return (
                        <li key={index} id={product.id}>Produit : {product.title} - prix : {product.price}€ - description : {product.descr} <button onClick={() => deleteProduct(product.id)}>delete product</button>
                            <button onClick={() => editProduct(product.id)}>Editer le produit</button>
                        </li>

                    )
                })}

            </ul>

            {ProductId !== null && (
                <div>
                    <h2>Modifier le produit</h2>
                    <input
                        type="text"
                        value={newProductTitle}
                        onChange={titleChange}
                        placeholder="Nouveau nom"
                    />
                    <input
                        type="number"
                        value={newProductPrice}
                        onChange={PriceChange}
                        placeholder="Nouveau prix"
                    />
                    <input
                        type="text"
                        value={newProductDescription}
                        onChange={DescriptionChange}
                        placeholder="Nouvelle description"
                    />
                    <button onClick={update}>Mettre à jour</button>
                </div>
            )}
        </div>
    )

}
export default Products