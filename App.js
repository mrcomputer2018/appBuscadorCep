import React, { useEffect, useRef, useState } from "react";
import 
{ View, StyleSheet, Text, TextInput, 
TouchableOpacity, Keyboard, SafeAreaView } 
from "react-native";

import api from "./src/services/api";

export default function App(){
    const [loading, setLoading ] = useState(true);
    const [ input, setInput ] = useState('');
    const[ result, setResult ] = useState(null);
    const inputRef = useRef(null);

    async function buscar(){ 
        if(input === '' || input.length < 7) {
            alert('Digite um cep válido');
            setInput('');
            return;
        }
        try {
            const response = await api.get(`/${input}/json/ `);
            setResult(response.data);
            // fechando o teclado
            Keyboard.dismiss();
        } catch (error) {
            alert("falha de requisição HTTP: " + error);
        }
    }
    
    function limpar() {
        setInput('');
        inputRef.current.focus();
        setResult(null);
    }

    return(
        <SafeAreaView style={ styles.container }>
           {/* titulo */}
            <Text style={ styles.title }>
                Buscador de CEP
            </Text>

            {/* input */}
            <View style={ styles.viewInput }>
                <TextInput
                style={ styles.input } 
                placeholder="Digite o seu CEP..."
                keyboardType="numeric"
                value={ input }
                ref={ inputRef }
                onChangeText={ (text) => setInput(text) }
                />
            </View>

            {/* botao */}
            <View style={ styles.viewBtn }>
                {/* btn buscar */}
                <TouchableOpacity 
                style={ [styles.btn, { backgroundColor: '#1d75cd' }] }
                onPress={ buscar }
                >
                    <Text style={ styles.txtBtn }>
                        Buscar
                    </Text>
                </TouchableOpacity>

                {/* btn limpar */}
                <TouchableOpacity 
                style={ [styles.btn, { backgroundColor: '#cd3e1d' }] }
                onPress={ limpar }
                >
                    <Text style={ styles.txtBtn }>
                        Limpar
                    </Text>
                </TouchableOpacity>
            </View>
            
            {/* resultado */}
            { result &&
                <View style={ styles.viewTxt }>
                    <Text style={ [styles.txt, { fontWeight: 'bold' }] }>
                        Resultado:
                    </Text>
                    <Text style={ styles.txt }>
                        CEP: {result.cep}
                    </Text>
                    <Text style={ styles.txt }>
                        Logradouro: {result.logradouro}
                    </Text>
                    <Text style={ styles.txt }>
                        Bairro: {result.bairro}
                    </Text>
                    <Text style={ styles.txt }>
                        Cidade: {result.localidade}
                    </Text>
                    <Text style={ styles.txt }>
                        Estado: {result.uf}
                    </Text>
                </View>
            }

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'whitesmoke',
    },
    title: {
        fontSize: 28,
        color: '#000',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    viewInput: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 50,
        width: 350,
        marginTop: 15,
        borderColor: '#bb9',
        borderWidth: 1,
        padding: 10,
        fontSize: 22,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    viewBtn: { 
        width: 350,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    }, 
    btn: {
        height: 50,
        width: 120,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
     },
    txtBtn: { 
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    viewTxt: {
        width: 350,
        marginTop: 30,
        padding: 15,
        backgroundColor: '#ccc',
        borderRadius: 5,
    },
    txt: {
        fontSize: 22,
    },
});