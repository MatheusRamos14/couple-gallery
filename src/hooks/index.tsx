import React from "react";

import { PhotoProvider } from "./usePhotos";

interface ProviderProps {
    children: React.ReactNode
}

export function AppProviders({ children }: ProviderProps) {
    return (
        <PhotoProvider>
            {children}
        </PhotoProvider>
    )
}