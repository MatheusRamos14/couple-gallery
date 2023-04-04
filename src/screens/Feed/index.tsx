import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedScrollHandler,
    interpolate,
    runOnJS,
    Extrapolate
} from 'react-native-reanimated';

import { useAuth } from '../../hooks/useAuth';
import background from '../../assets/background.png'
import { MainDrawerProps } from '../../routes/main.drawer';
import {
    Container,
    Background,
    Header,
    Titles,
    Menu,
    Date,
    Greetings,
    Avatar,
    Content,
    Box,
} from './styles';
import { View } from 'react-native';
import { ProfileInfo } from '../../components/ProfileInfo';

type Props = MainDrawerProps<'Feed'>

export function Feed({ navigation }: Props) {
    const { user } = useAuth();
    const theme = useTheme();

    const scroll = useSharedValue(0);

    const onScroll = useAnimatedScrollHandler({
        onScroll(event, context) {
            scroll.value = event.contentOffset.y;
            console.log(scroll.value)
        }
    })

    const style = useAnimatedStyle(() => {
        return {
            height: `${interpolate(
                scroll.value,
                [0, 175],
                [50, 80],
                Extrapolate.CLAMP
            )}%`,
            borderTopRightRadius: interpolate(scroll.value, [0, 175], [65, 20], Extrapolate.CLAMP),
            borderTopLeftRadius: interpolate(scroll.value, [0, 175], [65, 20], Extrapolate.CLAMP)
        }
    })

    return (
        <Container>
            <Background source={background} resizeMode='stretch' />

            <Header>
                <Titles>
                    <Menu onPress={navigation.openDrawer}>
                        <Feather
                            name='menu'
                            size={32}
                            color={theme.colors.shape}
                        />
                    </Menu>

                    <Date>
                        11 MAR 2023
                    </Date>

                    <Greetings>
                        Welcome back, Matheus!
                    </Greetings>
                </Titles>

                <Avatar>
                    <ProfileInfo
                        greetings={false}
                        photoURL={user.usuario_avatar}
                        username={user.usuario_nome}
                    />
                </Avatar>
            </Header>

            <Content
                onScroll={onScroll}
                style={style}
                data={[1, 2, 3, 4, 5, 6, 7, 8]}
                keyExtractor={item => String(item)}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-evenly' }}
                renderItem={({ item }) => (
                    <Box />
                )}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            />

        </Container>
    )
}