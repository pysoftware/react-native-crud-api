import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ActivityIndicator, View, VirtualizedList, Text, Alert, Dimensions} from 'react-native';
import styled from 'styled-components/native';
import {Item} from '../components/GroupItem';
import {fetchAllCars, fetchCar} from '../actions/CarActions';
import {fetchAllEmployees} from '../actions/EmployeeActions';
import {ButtonText, CustomButton} from '../components/CustomButton';

export const ListScreen = ({navigation}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllCars());
    }, [dispatch]);

    const data = useSelector(state => state.cars.allCars);
    const error = useSelector(state => state.cars.error);
    const loading = useSelector(state => state.cars.loading);

    if (error) {
        console.log('ERROR', error);
        return (
            <View style={{
                flex: 1,
                paddingLeft: 20,
                paddingRight: 20,
                backgroundColor: '#fe2023',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Lolader active={loading}>
                    <ActivityIndicator color={'white'} size={'large'}/>
                </Lolader>
                <Text style={{color: 'white', fontSize: 18}}>{error}</Text>
                <CustomButton
                    style={{marginTop: 20, width: '100%'}}
                    onPress={() => dispatch(fetchAllCars())}>
                    <ButtonText>Обновить</ButtonText>
                </CustomButton>
            </View>
        );
    }

    /** Retrieve car from API */
    const getCar = async id => {
        try {
            const response = await dispatch(fetchCar(id));
            if (!response.success) {
                throw response;
            }
            navigation.navigate('ProfileScreen', response.data);
        } catch (error) {
            Alert.alert(
                'Ошибка',
                `${error}`,
                [
                    {text: 'Понятно', onPress: () => dispatch(fetchAllCars())},
                ],
                {cancelable: false},
            );
        }
    };

    const renderItem = ({item}) => (
        <Item subject={item} navigation={navigation} fetchCar={getCar}/>
    );
    const keyExtractor = item => item.id.toString();
    const getItemCount = data => data.length;
    const getItem = (listArr, index) => {
        return listArr[index];
    };

    return (
        <Container>
            <Lolader active={loading}>
                <ActivityIndicator color={'blue'} size={'large'}/>
            </Lolader>
            <VirtualizedList
                data={data}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                getItemCount={getItemCount}
                getItem={getItem}
            />
            <CustomButton
                style={{marginLeft: 20, marginRight: 20}}
                onPress={() => navigation.navigate('AddScreen')}>
                <ButtonText>Добавить новую машину</ButtonText>
            </CustomButton>
        </Container>
    );
};

const Container = styled.View`
    flex: 1;
    margin-top: 25px;
`;

const Lolader = styled.View`
  z-index: 1;
  position:  ${props => props.active ? 'absolute' : 'relative'};
  display: ${props => props.active ? 'flex' : 'none'};
  left: ${Dimensions.get('window').width / 2 - 20}px;
  top: ${Dimensions.get('window').height / 2 - 20}px;
`;

const Plus = styled.Text`
    font-size: 34px;
    color: #fff;
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
