import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ActivityIndicator, Dimensions, StatusBar, View, Alert} from 'react-native';
import styled from 'styled-components/native';
import {createCar} from '../actions/CarActions';
import {ButtonText, CustomButton} from '../components/CustomButton';
import Toast from 'react-native-simple-toast';

export const AddScreen = ({navigation}) => {

    const dispatch = useDispatch();

    const loading = useSelector(state => state.cars.loading);

    const [name, setName] = useState(null);
    const [color, setColor] = useState(null);
    const [price, setPrice] = useState(null);
    const [brand, setBrand] = useState(null);

    const saveHandler = async () => {
        try {
            const response = await dispatch(createCar({
                name, color, price, brand_id: brand,
            }));
            console.log(response);
            if (!response.success) {
                throw response;
            }
            Toast.show('Машина успешно добавлена', Toast.LONG);
            navigation.navigate('ListScreen');
        } catch (error) {
            if (typeof error === 'string') {
                // тут ловится ошибка об отсутсвии инета или о том что бек упал
                Toast.show(error, Toast.LONG);
            } else {
                const errors = [];
                error.forEach(item => {
                    errors.push(`${item.field}: ${item.message[0]}`);
                });
                Alert.alert(
                    'Ошибка валидации',
                    errors.join(`, \n`),
                    [],
                    {cancelable: true},
                );
            }
        }
    };

    return (
        <Container>
            <StatusBar barStyle="light-content"/>

            <Lolader active={loading}>
                <ActivityIndicator color={'blue'} size={'large'}/>
            </Lolader>

            <Title style={{marginBottom: 20}}>Добавление новой машины</Title>

            <Input placeholder={'Введите имя'}
                   onChangeText={text => setName(text)}/>
            <Input placeholder={'Введите название цвета'}
                   onChangeText={text => setColor(text)}/>
            <Input placeholder={'Введите цену'} keyboardType={'numeric'}
                   onChangeText={text => setPrice(text)}/>

            <Input placeholder={'Введите ID бренда'} keyboardType={'numeric'}
                   onChangeText={text => setBrand(text)}/>

            <View style={{flexDirection: 'row', marginTop: 25}}>
                <CustomButton style={{flex: 1}} onPress={() => saveHandler()}>
                    <ButtonText>Сохранить</ButtonText>
                </CustomButton>
            </View>
        </Container>
    );
};

const Lolader = styled.View`
  position:  ${props => props.active ? 'absolute' : 'relative'};
 
  display: ${props => props.active ? 'flex' : 'none'};
  left: ${Dimensions.get('window').width / 2 - 16}px;
  top: ${Dimensions.get('window').height / 2 - 16}px;
`;

const Input = styled.TextInput`
  border: 1px;
  margin-bottom: 10px;
`;

const Container = styled.View`
  padding: 25px;
`;

const Title = styled.Text`
            margin-bottom: 5px;
            font-weight: 800;
            font-size: 28px;
            line-height: 30px;
            `;

const AddButton = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    width: 64px;
    height: 64px;
    background: #2a86ff;
    position: absolute;
    bottom: 15px;
    right: 15px;
`;
