import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ActivityIndicator, View, VirtualizedList} from 'react-native';
import styled from 'styled-components/native';
import {Item} from '../components/GroupItem';
import {fetchAllCars} from '../actions/CarActions';
import {ButtonText, CustomButton} from '../components/CustomButton';

export const HomeScreen = ({navigation}) => {

    return (
        <Container>
            <CustomButton onPress={() => navigation.navigate('ListScreen', {
                subject: 'Car',
            })}>
                <ButtonText>
                    Машины
                </ButtonText>
            </CustomButton>
            <CustomButton>
                <ButtonText>
                    Бренды
                </ButtonText>
            </CustomButton>
            <CustomButton>
                <ButtonText>
                    Покупатели
                </ButtonText>
            </CustomButton>
            <CustomButton>
                <ButtonText>
                    Продавцы
                </ButtonText>
            </CustomButton>
            <CustomButton>
                <ButtonText>
                    Продажи
                </ButtonText>
            </CustomButton>
        </Container>
    );
};

const Container = styled.View`
    flex: 1;
    margin-top: 150px;
    padding: 25px;
`;
