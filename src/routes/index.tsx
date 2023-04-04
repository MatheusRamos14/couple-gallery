import React from 'react';

import { useAuth } from '../hooks/useAuth';
import { AuthRoute } from './auth.route';
import { MainStack } from './main.stack';
import { AppProviders } from '../hooks';

export function AppRoutes() {
    const { initializing } = useAuth();

    return initializing ? <AuthRoute /> : (
        <AppProviders>
            <MainStack />
        </AppProviders>
    )
}