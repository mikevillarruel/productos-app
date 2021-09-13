import React, { createContext, useEffect, useState } from "react";
import { Asset } from "react-native-image-picker";
import cafeApi from "../api/cafeApi";
import { Producto, ProductsResponse } from '../interfaces/appInterfaces';

type ProductsContextProps = {
    products: Producto[];
    loadProducts: () => Promise<void>;
    addProduct: (categoryId: string, productName: string) => Promise<Producto>;
    updateProduct: (categoryId: string, productName: string, productId: string) => Promise<void>;
    deleteProduct: (productId: string) => Promise<void>;
    loadProductById: (id: string) => Promise<Producto>;
    uploadImage: (data: Asset, id: string) => Promise<void>;
}

export const ProductsContext = createContext({} as ProductsContextProps);

export const ProductsProvider = ({ children }: any) => {

    const [products, setProducts] = useState<Producto[]>([]);

    useEffect(() => {
        loadProducts();
    }, [])

    const loadProducts = async () => {
        const response = await cafeApi.get<ProductsResponse>('/productos?limite=50');
        setProducts([...response.data.productos]);
    }

    const addProduct = async (categoryId: string, productName: string): Promise<Producto> => {
        const response = await cafeApi.post<Producto>('/productos', {
            nombre: productName,
            categoria: categoryId,
        });
        setProducts([...products, response.data]);
        return response.data;
    }

    const updateProduct = async (categoryId: string, productName: string, productId: string) => {
        const response = await cafeApi.put<Producto>(`/productos/${productId}`, {
            nombre: productName,
            categoria: categoryId,
        });
        setProducts(products.map((product) => {
            return (product._id === productId) ? response.data : product;
        }));
    }

    const deleteProduct = async (productId: string) => {

    }

    const loadProductById = async (id: string): Promise<Producto> => {
        const response = await cafeApi.get<Producto>(`/productos/${id}`);
        return response.data;
    }

    const uploadImage = async (data: Asset, id: string) => {

        const fileToUpload = {
            uri: data.uri,
            type: data.type,
            name: data.fileName,
        }

        const formData = new FormData();
        formData.append('archivo', fileToUpload);

        try {
            const response = await cafeApi.put<Producto>(`/uploads/productos/${id}`, formData);
            console.log(response);
        } catch (error) {
            console.log({ error });
        }
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