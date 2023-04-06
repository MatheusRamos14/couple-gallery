import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import { Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

export const Container = styled(FastImage)`
    width: 48%;
    height: ${RFPercentage(30)}px;

    background-color: red;
`;