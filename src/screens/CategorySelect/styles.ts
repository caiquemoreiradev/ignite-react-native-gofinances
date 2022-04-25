import styled from "styled-components/native";

import { RFValue } from "react-native-responsive-fontsize";

import { Feather } from '@expo/vector-icons';

interface CategoryProps {
    isActive: boolean;
}

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
    width: 100%;
    height: ${RFValue(72)}px;

    background-color: ${({ theme }) => theme.colors.primary};

    align-items: center;
    justify-content: flex-end;
    padding: 24px;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;

    color: ${({ theme }) => theme.colors.shape};
`;

// Categories list

export const Category = styled.TouchableOpacity<CategoryProps>`
    width: 100%;
    padding: ${RFValue(15)}px;

    flex-direction: row;
    align-items: center;

    background-color: ${({ isActive, theme }) =>
        isActive ? theme.colors.secondary : theme.colors.background
    };
`;

export const Icon = styled(Feather)<CategoryProps>`
    font-size: ${RFValue(20)}px;
    margin-right: 16px;

    color: ${({ isActive, theme }) =>
        isActive ? theme.colors.shape : theme.colors.text_dark
    };
`;

export const Name = styled.Text<CategoryProps>`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;

    color: ${({ isActive, theme }) =>
        isActive ? theme.colors.shape : theme.colors.text_dark
    };
`;

export const Separator = styled.View`
    height: 1px;
    width: 100%;

    background-color: ${({ theme }) => theme.colors.text};
`;

// Footer

export const Footer = styled.View`
    width: 100%;
    padding: 24px;
`;
