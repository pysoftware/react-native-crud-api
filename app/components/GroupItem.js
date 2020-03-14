import React, {useCallback} from 'react';
import {View, Alert} from 'react-native';
import styled from 'styled-components/native';
import {Description} from './Description';
import {fetchCar} from '../actions/CarActions';
import {useDispatch} from 'react-redux';

export class Item extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <Group>
                <GroupItem onPress={
                    () => this.props.fetchCar(this.props.subject.id)
                }
                 activeOpacity={0.5}>
                    <View style={{flex: 1}}>
                        <Name>{this.props.subject.id} {this.props.subject.name}</Name>
                        <Description>{this.props.subject.color}</Description>
                    </View>
                    <Time active>
                        brand_id: {this.props.subject.brand_id}
                    </Time>
                </GroupItem>
            </Group>
        );
    };
}

const Time = styled.Text`
    background: ${props => props.active ? '#2a86ff' : '#e9f5ff'}
    color: ${props => props.active ? 'white' : '#4294ff'}
    border-radius: 18px;
    font-weight: 600;
    font-size: 14px;
    width: 85px;
    height: 32px;
    text-align: center;
    line-height: 32px;
`;

const Name = styled.Text`
    font-weight: 600;
    font-size: 16px;
`;

const GroupItem = styled.TouchableOpacity`
    align-items: center;
    flex-direction: row;
    padding: 20px 0;
    border-bottom-width: 1px;
    border-bottom-color: #f3f3f3;
`;

const Group = styled.View`
    padding: 0 20px;
    margin-bottom: 20px;
`;

