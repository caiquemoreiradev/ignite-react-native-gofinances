import React from "react";
import { Amount, Container, Title } from "./styles";

interface CardProps {
    title: string;
    amount: string;
    color: string
}

export function HistoryCard({ title, amount, color }: CardProps) {
    return (
        <Container color={color}>
            <Title>{title}</Title>

            <Amount>{amount}</Amount>
        </Container>
    )
}