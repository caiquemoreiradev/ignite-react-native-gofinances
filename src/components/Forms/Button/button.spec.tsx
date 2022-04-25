import React from "react";
import { render, shallow } from '@testing-library/react-native';

import { Button } from '.';

import 'jest-styled-components';
import { ThemeProvider } from 'styled-components/native';
import theme from '../../../global/styles/theme';

const Providers: React.FC = ({ children }) => (
    <ThemeProvider theme={theme}>
        { children }
    </ThemeProvider>
)

describe('Button component render', () => {

    it('should render correctly', () => {
        const { getByTestId } = render(
            <Button
                title="Entrar com Google"
                testID="login-button"
            />,
            {
                wrapper: Providers
            }
        )

        const buttonTitle = getByTestId('login-button');

        expect(buttonTitle).toBeTruthy();
    })

    it('should render title correctly', () => {
        const { getByText } = render(
            <Button
                title="Entrar com Google"
                testID="login-button"
            />,
            {
                wrapper: Providers
            }
        )

        const buttonTitle = getByText('Entrar com Google');

        expect(buttonTitle).toBeTruthy();
    })
})