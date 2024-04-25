// import { useState } from "react"
import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import ProductContext from '../contexts/products'
import axios from 'axios'

const Form = () => {

    const { register, handleSubmit } = useForm()
    const { URL } = useContext(ProductContext)
    const addToServer = async data => {
        // const URL = 'http://localhost:2000'
        const {
            data: { data: product },
        } = await axios.post(URL + '/products', data)
        console.log(product)
    }
    return (
        <form onSubmit={handleSubmit(addToServer)}>
            <ul>
                <li>

                    <label>nom du produit : </label>
                    <input type="text" {...register('title')}></input>
                </li>
                <li>
                    <label>prix : </label>
                    <input type="number" {...register('price')}></input>
                </li>
                <li>
                    <label>description : </label>
                    <input type="text" {...register('descr')}></input>
                </li>
                <button>ajouter</button>
            </ul>
        </form>
    )
}
export default Form