import React from "react";
import { TouchableOpacityProps } from "react-native";
import { Category, Container, Icon } from "./styles";

interface CategoryProps extends TouchableOpacityProps {
    title: string;
}

export function CategorySelectButton({ title, ...rest }: CategoryProps) {
    return (
        <Container { ...rest }>
            <Category>{title}</Category>

            <Icon name='chevron-down' />
        </Container>
    )
}