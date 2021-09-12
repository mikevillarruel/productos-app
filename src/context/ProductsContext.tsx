import React, { createContext, useEffect, useState } from "react";
import cafeApi from "../api/cafeApi";
import { Producto, ProductsResponse } from '../interfaces/appInterfaces';

type ProductsContextProps = {
    products: Producto[];
    loadProducts: () => Promise<void>;
    addProduct: (categoryId: string, productName: string) => Promise<void>;
    updateProduct: (categoryId: string, productName: string, productId: string) => Promise<void>;
    deleteProduct: (productId: string) => Promise<void>;
    loadProductById: (id: string) => Promise<Producto>;
    uploadImage: (data: any, id: string) => Promise<void>; // TODO: change any
}

export const ProductsContext = createContext({} as ProductsContextProps);

export const ProductsProvider = ({ children }: any) => {

    const [products, setProducts] = useState<Producto[]>([]);

    useEffect(() => {
        loadProducts();
    }, [])

    const loadProducts = async () => {
        const response = await cafeApi.get<ProductsResponse>('/productos?limite=50');
        setProducts([...products, ...response.data.productos]);
    }

    const addProduct = async (categoryId: string, productName: string) => {

    }

    const updateProduct = async (categoryId: string, productName: string, productId: string) => {

    }

    const deleteProduct = async (productId: string) => {

    }

    const loadProductById = async (id: string): Promise<Producto> => {
        const response = await cafeApi.get<Producto>(`/productos/${id}`);
        return response.data;
    }

    // TODO: change any
    const uploadImage = async (data: any, id: string) => {

    }

    return (
        <ProductsContext.Provider
            value={{
                products,
                loadProducts,
                addProduct,
                updateProduct,
                deleteProduct,
                loadProductById,
                uploadImage,
            }}
        >
            {children}
        </ProductsContext.Provider>
    )
}