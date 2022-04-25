import React from "react";
import { fireEvent, render } from '@testing-library/react-native';

import { Register } from '.';

import 'jest-styled-components';
import { ThemeProvider } from 'styled-components/native';
import theme from '../../global/styles/theme';

const Providers: React.FC = ({ children }) => (
    <ThemeProvider theme={theme}>
        { children }
    </ThemeProvider>
)

jest.mock('@react-navigation/native', () => {
    return {
      useNavigation: jest.fn()
    }
  })

describe('Register screen', () => {

    it('should be open category modal when user click on button', () => {
        const { getByTestId } = render(
            <Register />,
            {
                wrapper: Providers
            }
        )

        const categoryModal = getByTestId('modal-category');
        const buttonCategory = getByTestId('button-category');

        fireEvent.press(buttonCategory);

        expect(categoryModal.props.visible).toBeTruthy();
    })
})