import React from "react";
import { TouchableOpacityProps } from "react-native";
import { Container, Icon, Title } from "./styles";

const icons = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle'
}

interface TransactionTypeProps extends TouchableOpacityProps {
    type: 'up' | 'down';
    title: string;
    isActive: boolean;
}

export function TransactionTypeButton({
    type,
    title,
    isActive,
    ...rest
}: TransactionTypeProps) {
    return (
        <Container
            type={type}
            isActive={isActive}
            {...rest}>
            <Icon
                name={icons[type]}
                type={type}
            />

            <Title type={type}>
                {title}
            </Title>
        </Container>
    )
}