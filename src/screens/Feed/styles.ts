import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Dimensions } from 'react-native';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import Animated from 'react-native-reanimated';

export const Container = styled.View`
    flex: 1;
`;

export const Background = styled.ImageBackground`
    width: ${Dimensions.get('window').width + 100}px;
    height: ${Dimensions.get('window').height * 0.7}px;
    position: absolute;
    top: -40px;
    left: -30px;
`;

export const Header = styled(Animated.View)`
    flex: 1;
    background-color: ${({ theme }) => `${theme.colors.secondary_light}95`};

    flex-direction: row;
    justify-content: space-between;
    
    padding: 0 24px;
    padding-top: ${getStatusBarHeight() + 16}px;

    position: relative;
`;

export const Menu = styled.TouchableOpacity.attrs({
    activeOpacity: 0.7
})`
    margin-bottom: 8px;
`;

export const Titles = styled.View``;


export const Date = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-size: ${RFValue(16)}px;
    font-family: ${({ theme }) => theme.fonts.primary_600};
`;

export const Greetings = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-size: ${RFValue(14)}px;
    font-family: ${({ theme }) => theme.fonts.primary_400};

    margin-top: -8px;
`;

export const Avatar = styled.TouchableOpacity.attrs({
    activeOpacity: 1
})`
    width: 64px;
    height: 64px;
    background-color: ${({ theme }) => theme.colors.shape};

    border-width: 3px;
    border-color: ${({ theme }) => theme.colors.main};
    border-radius: 32px;

    align-items: center;
    justify-content: center;
`;

export const Content = styled(Animated.FlatList).attrs({
    contentContainerStyle: {
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',

        paddingTop: 60,
        paddingHorizontal: 30,
    }
})`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.shape};

    /* border-top-right-radius: 65px;
    border-top-left-radius: 65px; */

    margin-top: -${RFPercentage(10)}px;
    /* margin-top: -30px; */
`;

export const Box = styled.View`
    width: 45%;
    height: 120px;
    background-color: green;
`;