import { useEffect, useState } from "react"
import cafeApi from "../api/cafeApi";
import { Categoria, CategoriesResponse } from '../interfaces/appInterfaces';

export const useCategories = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState<Categoria[]>([]);

    const getCategories = async () => {
        setIsLoading(true);
        const response = await cafeApi.get<CategoriesResponse>('/categorias');
        setCategories(response.data.categorias);
        setIsLoading(false);
    }

    useEffect(() => {
        getCategories();
    }, [])

    return {
        isLoading,
        categories,
    }
}
