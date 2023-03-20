import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
    flex: 1;
    
    padding: 10px 0;
`;

export const ItemContainer = styled.TouchableOpacity.attrs({
    activeOpacity: 0.7
})`
    width: 100%;
    height: 36px;

    flex-direction: row;
    align-items: center;

    padding: 0 20px;
`;


export const ItemLabel = styled.Text`
    color: ${({ theme }) => theme.colors.secondary_light};
    font-size: ${RFValue(14)}px;
    font-family: ${({ theme }) => theme.fonts.primary_600};

    margin-left: 8px;
`;