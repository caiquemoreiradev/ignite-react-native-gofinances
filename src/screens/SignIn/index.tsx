import React, { useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";

import { ActivityIndicator, Alert } from "react-native";

import LogoSvg from '../../assets/logo.svg';
import GoogleIcon from '../../assets/google.svg';
import AppleIcon from '../../assets/apple.svg';

import { Container, Footer, FooterWrapper, Header, SignInTitle, Title, TitleWrapper } from "./styles";
import { SignInSocialButton } from "../../components/SignInSocialButton";
import { useAuth } from "../../hooks/auth";
import theme from "../../global/styles/theme";

export function SignIn() {

    const { signInWithGoogle } = useAuth();

    const [isLoading, setIsLoading] = useState(false);

    async function handleSignInWithGoogle() {

        try {

            setIsLoading(true);

            return await signInWithGoogle();
        } catch (error) {

            console.log(error);
            Alert.alert('Não foi possível conectar a conta Google');

            setIsLoading(false);
        }
    }

    return (
        <Container>

            <Header>
                <TitleWrapper>
                    <LogoSvg
                        width={RFValue(120)}
                        height={RFValue(68)}
                    />

                    <Title>Controle suas {'\n'} finanças de forma simples</Title>
                </TitleWrapper>

                <SignInTitle>Faça seu login usando {'\n'} um dos métodos abaixo</SignInTitle>
            </Header>

            <Footer>
                <FooterWrapper>
                    <SignInSocialButton
                        title="Entrar com Google"
                        svg={GoogleIcon}
                        onPress={handleSignInWithGoogle}
                    />

                    <SignInSocialButton
                        title="Entrar com Apple"
                        svg={AppleIcon}
                    />
                </FooterWrapper>

                {isLoading && <ActivityIndicator color={theme.colors.shape} size={24} style={{ marginTop: 18 }} />}
            </Footer>
        </Container>
    )
}