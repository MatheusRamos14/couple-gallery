import React from 'react';

import { useAuth } from '../hooks/useAuth';
import { AuthRoute } from './auth.route';
import { MainRoute } from './main.route';

export function AppRoutes() {
    const { initializing } = useAuth();

    return !initializing ? <AuthRoute /> : <MainRoute />
}