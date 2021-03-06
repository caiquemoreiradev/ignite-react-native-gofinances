import 'jest-fetch-mock';
import { startAsync } from 'expo-auth-session';
import fetchMock from 'jest-fetch-mock';

import { mocked } from 'ts-jest/utils';

import { renderHook, act } from '@testing-library/react-hooks';
import { AuthProvider, useAuth } from './auth';

jest.mock('expo-auth-session');

//Coloque no inicio do arquivo para habilitar o mock do fetch.
fetchMock.enableMocks();

describe('Authentication hook', () => {

    it('should be able to sign in with Google account existing', async () => {

        //Primeiro, nós precisamos do Token. Então, vamos Mockar a função de startAsync.
        const googleMocked = mocked(startAsync as any);
        googleMocked.mockReturnValueOnce({
            type: 'success',
            params: {
                access_token: 'any_token',
            }
        });

        //Agora que temos o Token, vamos mockar a requisição ttp dos dados de profile do usuário.
        fetchMock.mockResponseOnce(JSON.stringify(
            {
                id: 'any_id',
                email: 'caiquemoreiradev@rocketseat.team',
                name: 'Caique',
                photo: 'any_photo.png'
            }
        ));

        const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
            wrapper: AuthProvider
        });

        act(async () => await result.current.signInWithGoogle());
        await waitForNextUpdate();

        expect(result.current.user.email)
            .toBe('caiquemoreiradev@rocketseat.team');
    })

    it('user should not connect if cancel authentication with Google', async () => {
        
        //Primeiro, nós precisamos do Token. Então, vamos Mockar a função de startAsync.
        const googleMocked = mocked(startAsync as any);
        googleMocked.mockReturnValueOnce({
            type: 'cancel',
        });

        const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
            wrapper: AuthProvider
        });

        act(async () => await result.current.signInWithGoogle());
        await waitForNextUpdate();

        expect(result.current.user)
            .not.toHaveProperty('id');
    })
})