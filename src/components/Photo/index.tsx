import React, { useState, useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import { FastImageProps } from 'react-native-fast-image';

import {
    Container,
} from './styles';

interface Props extends FastImageProps {}

export function Photo({ ...rest }: Props) {
    const { width } = useWindowDimensions();
    const [itemWidth, setItemWidth] = useState(0);

    useEffect(() => {
        const numColumns = 2;
        const itemMargin = 5;
        const calculatedWidth = (width - itemMargin * (numColumns - 1)) / numColumns;
        setItemWidth(calculatedWidth);
      }, []);

    return (
        <Container
            style={{
                width: itemWidth, // Dynamically calculated item width
                height: itemWidth,
                margin: 2.5,
                backgroundColor: '#eee'
              }}
            resizeMode='contain'
            {...rest}
        />
    )
}