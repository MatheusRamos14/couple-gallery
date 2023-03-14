import React, {
    createContext,
    useContext,
    useState,
    useEffect
} from "react";
import auth, { FirebaseAuthTypes as FBTypes } from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';

interface LoginData {
    name: string;
    email: string;
    password: string;
    image?: string;
}

interface ContextData {
    initializing: boolean;
    user: FBTypes.User;
    handleUserRegister: (data: LoginData) => Promise<void>;
}

interface ProviderProps {
    children: React.ReactNode
}

const AuthContext = createContext<ContextData>({} as ContextData);

export function AuthProvider({ children }: ProviderProps) {
    const [initializing, setInitializing] = useState<boolean>(true);
    const [user, setUser] = useState<FBTypes.User>({} as FBTypes.User);

    async function handleUserRegister(loginData: LoginData) {
        try {
            const usuariosCollection = database().ref('usuarios');
            const registers = (await usuariosCollection.once('value')).val() as Array<any>;
            const total = registers.length;

            console.log("IMAGEM", loginData.image);
            console.log(total, registers)

            const user = await auth()
                .createUserWithEmailAndPassword(loginData.email, loginData.password);

            const avatarsRef = storage().ref(`avatars/${user.user.uid}.png`);
            let userAvatarUrl = '';

            if (loginData.image) {
                await avatarsRef.putFile(loginData.image, { contentType: 'image' });
                userAvatarUrl = await avatarsRef.getDownloadURL();
            }

            const newUser = {
                usuario_id: user.user.uid,
                usuario_email: loginData.email,
                usuario_nome: loginData.name,
                usuario_avatar: userAvatarUrl
            }
          
            usuariosCollection.child(String(total)).set(newUser);
        } catch (error) {
            throw new Error(error as any);
        }
    }

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
        <AuthContext.Provider value={{ initializing, user, handleUserRegister }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}