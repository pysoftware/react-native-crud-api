import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    ActivityIndicator,
    StatusBar,
    View,
    Dimensions, Alert,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import styled from 'styled-components/native';
import {Description} from '../components/Description';
import {ButtonText, CircleButton, CustomButton} from '../components/CustomButton';
import {HttpHelper} from '../httpHelper';
import CustomPicker from 'react-native-picker-select';
import {deleteCar, fetchAllCars, fetchCar, updateCarData} from '../actions/CarActions';

export const ProfileScreen = ({route, navigation}) => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.cars.loading);
    const {id, name, color, price, brands_count, brand_id} = route.params;

    const [brandsCount, setBrandsCount] = useState(brands_count);
    const [carName, setName] = useState(name);
    const [carColor, setColor] = useState(color);
    const [carPrice, setPrice] = useState(price);
    const [carBrandID, setBrandID] = useState(brand_id);

    const updateCar = async car => {
        try {
            const response = await dispatch(updateCarData(car));
            if (!response.success) {
                throw response;
            }
            navigation.reset({
                index: 0,
                routes: [
                    {name: 'HomeScreen'},
                    {name: 'ListScreen'},
                ],
            });
            Toast.show('Машина успешно обновлена', Toast.LONG);
        } catch (error) {
            console.log(error);
            if (typeof error === 'string') {
                // тут ловится ошибка об отсутсвии инета или о том что бек упал
                Alert.alert(
                    'Ошибка',
                    error,
                    [
                        {
                            text: 'Понятно', onPress: () => navigation.pop(),
                        },
                    ],
                    {cancelable: true},
                );
                // Toast.show(error, Toast.LONG);
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

    const delCar = async id => {
        try {
            const response = await dispatch(deleteCar(id));
            console.log(response);
            if (!response.success) {
                throw response;
            }
            navigation.reset({
                index: 0,
                routes: [
                    {name: 'HomeScreen'},
                    {name: 'ListScreen'},
                ],
            });
            Toast.show('Машина успешно удалена', Toast.SHORT);
        } catch (error) {
            Alert.alert(
                'Ошибка',
                error,
                [
                    {
                        text: 'Понятно', onPress: () => navigation.pop(),
                    },
                ],
                {cancelable: true},
            );
        }
    };

    const values = [];
    for (let i = 1; i <= brandsCount; i++) {
        values.push({
            label: i.toString(),
            value: i.toString(),
        });
    }

    return (
        <Container>
            <StatusBar barStyle="light-content"/>

            <Lolader active={loading}>
                <ActivityIndicator color={'blue'} size={'large'}/>
            </Lolader>

            <Title>{name}</Title>
            <Description>Данные машины: </Description>

            <Input placeholder={'Введите имя'}
                   defaultValue={name} onChangeText={text => setName(text)}/>
            <Input placeholder={'Введите название цвета'} defaultValue={color}
                   onChangeText={text => setColor(text)}/>
            <Input placeholder={'Введите цену'} defaultValue={`${price}`} keyboardType={'numeric'}
                   onChangeText={text => setPrice(text)}/>

            <CustomPicker
                placeholder={{
                    label: 'Выберите ID бренда',
                    value: null,
                    color: '#9EA0A4',
                    brand_id: carBrandID,
                }}
                onValueChange={(value) => setBrandID(parseInt(value))}
                items={values}
            />
            <View style={{flexDirection: 'row', marginTop: 25}}>
                <CustomButton style={{flex: 1}} onPress={() => {
                    updateCar({
                        id,
                        name: carName,
                        color: carColor,
                        price: carPrice,
                        brand_id: carBrandID,
                    });
                }}>
                    <ButtonText>Сохранить</ButtonText>
                </CustomButton>
                <CustomButton
                    style={{flex: 1, marginLeft: 10, backgroundColor: 'red'}}
                    onPress={() => {
                        delCar(id);
                    }}>
                    <ButtonText>Удалить</ButtonText>
                </CustomButton>
            </View>
        </Container>
    );
};

const Lolader = styled.View`
  z-index: 1;
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
