import React, { useCallback, useEffect, useState } from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import { ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import AsyncStorage from '@react-native-async-storage/async-storage';

import { addMonths, format, subMonths } from 'date-fns';

import { HistoryCard } from "../../components/HistoryCard";

import { categories } from "../../utils/categories";
import { VictoryPie } from "victory-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { ptBR } from "date-fns/locale";

import {
    ChartContainer,
    Container,
    Content,
    Header,
    LoadContainer,
    Month,
    MonthSelect,
    MonthSelectButton,
    MonthSelectIcon,
    Title,
} from "./styles";
import { useAuth } from "../../hooks/auth";


interface TransactionData {
    id: string;
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category: string;
    date: string;
}

interface CategoryData {
    key: string;
    name: string;
    total: number;
    totalFormatted: string;
    color: string;
    percent: string;
}

export function Resume() {

    const { user } = useAuth();

    const [isLoading, setIsLoading] = useState(false);

    const [selectedDate, setSelectedDate] = useState(new Date());

    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

    const theme = useTheme();

    useFocusEffect(useCallback(() => {

        loadData();
    }, [selectedDate]));

    function handleChangeDate(action: 'next' | 'prev') {

        if (action === 'next') {
            setSelectedDate(addMonths(selectedDate, 1));
        } else {
            setSelectedDate(subMonths(selectedDate, 1));
        }

    }

    async function loadData() {
        
        setIsLoading(true);

        const dataKey = `@gofinances:transactions_user:${user.id}`;
        const response = await AsyncStorage.getItem(dataKey);
        const responseFormatted = response ? JSON.parse(response) : [];

        const expenses = responseFormatted
            .filter((expense: TransactionData) => expense.type === 'negative' &&
                new Date(expense.date).getMonth() === selectedDate.getMonth() &&
                new Date(expense.date).getFullYear() === selectedDate.getFullYear());

        const expensesTotal = expenses.reduce((accumulator: number, expense: TransactionData) => {

            return accumulator + Number(expense.amount);
        }, 0)

        const totalByCategory: CategoryData[] = [];

        categories.forEach(category => {

            let categorySum = 0;

            expenses.forEach((expense: TransactionData) => {
                if (expense.category === category.key) {
                    categorySum += Number(expense.amount);
                }
            })

            if (categorySum > 0) {

                const totalFormatted = categorySum
                    .toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    })

                const percent = `${(categorySum / expensesTotal * 100).toFixed(0)}%`;

                totalByCategory.push({
                    key: category.key,
                    name: category.name,
                    color: category.color,
                    total: categorySum,
                    totalFormatted,
                    percent
                })
            }
        })

        setTotalByCategories(totalByCategory);

        setIsLoading(false);
    }

    return (
        <Container>

            <Header>
                <Title>Resumo por categoria</Title>
            </Header>

            {isLoading ?
                <LoadContainer>
                    <ActivityIndicator
                        color={theme.colors.primary}
                        size='large'
                    />
                </LoadContainer>

                :

                <Content
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        padding: 24,
                        paddingBottom: useBottomTabBarHeight()
                    }}
                >

                    <MonthSelect>

                        <MonthSelectButton onPress={() => handleChangeDate('prev')}>
                            <MonthSelectIcon name='chevron-left' />
                        </MonthSelectButton>

                        <Month>
                            {format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}
                        </Month>

                        <MonthSelectButton onPress={() => handleChangeDate('next')}>
                            <MonthSelectIcon name='chevron-right' />
                        </MonthSelectButton>

                    </MonthSelect>

                    <ChartContainer>
                        <VictoryPie
                            data={totalByCategories}
                            colorScale={totalByCategories.map(category => category.color)}
                            style={{
                                labels: {
                                    fontSize: RFValue(18),
                                    fontWeight: 'bold',
                                    fill: theme.colors.shape
                                }
                            }}
                            labelRadius={50}
                            x='percent'
                            y='total'
                        />
                    </ChartContainer>


                    {totalByCategories.map(item => (
                        <HistoryCard
                            key={item.key}
                            title={item.name}
                            amount={item.totalFormatted}
                            color={item.color}
                        />
                    ))}
                </Content>

            }
        </Container>
    )
}