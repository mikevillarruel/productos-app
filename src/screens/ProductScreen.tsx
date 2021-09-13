import { Picker } from '@react-native-picker/picker'
import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext, useEffect } from 'react'
import { ActivityIndicator, Button, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { ProductsContext } from '../context/ProductsContext'
import { useCategories } from '../hooks/useCategories'
import { useForm } from '../hooks/useForm'
import { Producto } from '../interfaces/appInterfaces'
import { ProductsStackParams } from '../navigator/ProductsNavigator'

interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'> { };

export const ProductScreen = ({ route, navigation }: Props) => {

    const { id = '', name = '' } = route.params;
    const { categories, isLoading } = useCategories();
    const { loadProductById, addProduct, updateProduct } = useContext(ProductsContext);

    const { _id, categoriaId, nombre, img, form, onChange, setFormValue } = useForm({
        _id: id,
        categoriaId: '',
        nombre: name,
        img: '',
    });

    const loadProduct = async () => {
        if (_id.length == 0) return;
        const product: Producto = await loadProductById(_id);
        setFormValue({
            ...form,
            categoriaId: product.categoria._id,
            img: product.img || '',
        });
    }

    const saveOrUpdate = async () => {
        if (_id.length > 0) {
            updateProduct(categoriaId, nombre, _id);
        } else {
            const tempCategoriaId = categoriaId || categories[0]._id;
            const newProduct = await addProduct(tempCategoriaId, nombre);
            onChange(newProduct._id, '_id');
        }
    }

    useEffect(() => {
        navigation.setOptions({
            title: (nombre !== '') ? nombre : 'Product Name',
        })
    }, [nombre])

    useEffect(() => {
        loadProduct();
    }, [])

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.label}>Product Name:</Text>
                <TextInput
                    placeholder='Product'
                    style={styles.textInput}
                    value={nombre}
                    onChangeText={(value) => onChange(value, 'nombre')}
                />

                {/* Picker / Selector */}
                <Text style={styles.label}>Category:</Text>

                {
                    isLoading
                        ? (
                            <ActivityIndicator />
                        )
                        : (
                            <Picker
                                selectedValue={categoriaId}
                                onValueChange={(value) => onChange(value, 'categoriaId')}
                            >

                                {categories.map((categorie) => (
                                    <Picker.Item
                                        key={categorie._id}
                                        label={categorie.nombre}
                                        value={categorie._id}
                                    />
                                ))}

                            </Picker>
                        )
                }

                <Button
                    title='Save'
                    onPress={saveOrUpdate}
                    color='#5856D6'
                />

                {
                    (_id.length > 0) && (

                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>

                            <Button
                                title='Camera'
                                onPress={() => { }}
                                color='#5856D6'
                            />
                            <View style={{ width: 10 }} />
                            <Button
                                title='Galery'
                                onPress={() => { }}
                                color='#5856D6'
                            />

                        </View>

                    )
                }

                {
                    (img.length > 0) && (
                        <Image
                            source={{ uri: img }}
                            style={{
                                height: 300,
                                width: '100%',
                                resizeMode: 'center',
                            }}
                        />
                    )
                }

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        marginHorizontal: 20,
    },
    label: {
        fontSize: 18,
    },
    textInput: {
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        borderColor: 'rgba(0,0,0,0.2)',
        height: 45,
        marginTop: 5,
        marginBottom: 15,
    },
});