import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
`;

export const Header = styled.View`
    width: 100%;
    height: 70%;

    background-color: ${({ theme }) => theme.colors.primary};

    justify-content: center;
    align-items: center;
`;

export const TitleWrapper = styled.View`
    align-items: center;

    padding-top: 56px;

`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${RFValue(30)}px;
    color: ${({ theme }) => theme.colors.shape};

    text-align: center;

    margin-top: 45px;
`;

export const SignInTitle = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(16)}px;
    color: ${({ theme }) => theme.colors.shape};

    text-align: center;

    margin-top: 48px;
    margin-bottom: 67px;
`;

export const Footer = styled.View`
    width: 100%;
    height: 30%;

    background-color: ${({ theme }) => theme.colors.secondary};
`;

export const FooterWrapper = styled.View`
    margin-top: ${RFValue(-32)}px;
    padding: 0 32px;

    justify-content: space-between;
`;