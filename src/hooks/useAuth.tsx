import React, {
    createContext,
    useContext,
    useState,
    useEffect
} from "react";
import auth,{ FirebaseAuthTypes as FBTypes } from '@react-native-firebase/auth';

interface ContextData {
    initializing: boolean;
    user: FBTypes.User;
}

interface ProviderProps {
    children: React.ReactNode
}

const AuthContext = createContext<ContextData>({} as ContextData);

export function AuthProvider({ children }: ProviderProps) {
    const [initializing, setInitializing] = useState<boolean>(true);
    const [user, setUser] = useState<FBTypes.User>({} as FBTypes.User);

    function onAuthStateChanged(user: FBTypes.User | null) {
        console.log("Listened changes", user);

        if (!user) return;

        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    return (
        <AuthContext.Provider value={{ initializing, user }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}