import React from 'react';
import styled from 'styled-components/native';

export const Title = ({title}) => {
    return (
        <GroupTitle>
            {title}
        </GroupTitle>
    );
};

const GroupTitle = styled.Text`
    font-weight: 800;
    font-size: 22px;
    color: black;
    margin-left: 20px;
`;
