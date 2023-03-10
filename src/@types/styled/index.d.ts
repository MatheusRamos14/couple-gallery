import 'styled-components';
import { theme } from '../../styles/global/styles';

declare module 'styled-components' {
    type ThemeType = typeof theme;

    interface DefaultTheme extends ThemeType {}
}