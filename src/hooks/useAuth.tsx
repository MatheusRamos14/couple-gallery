import React, {
    createContext,
    useContext,
    useState
} from "react";
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';

interface LoginData {
    email: string;
    password: string;
}

interface SignUpData extends LoginData {
    name: string;
    image?: string;
}

interface UserData {
    usuario_id: string;
    usuario_email: string;
    usuario_nome: string;
    usuario_avatar: string;
    casal_id?: string;
}

interface ContextData {
    initializing: boolean;
    user: UserData;
    handleUserRegister: (data: SignUpData) => Promise<void>;
    handleUserSignIn: (data: LoginData) => Promise<void>;
}

interface ProviderProps {
    children: React.ReactNode
}

const AuthContext = createContext<ContextData>({} as ContextData);

export function AuthProvider({ children }: ProviderProps) {
    const [initializing, setInitializing] = useState<boolean>(true);
    const [user, setUser] = useState<UserData>({} as UserData);

    async function handleUserRegister(data: SignUpData) {
        try {
            const usuariosCollection = database().ref('usuarios');
            const registers = (await usuariosCollection.once('value')).val() as Array<UserData>;
            const total = registers.length;

            console.log("IMAGEM", data.image);
            console.log(total, registers)

            const user = await auth()
                .createUserWithEmailAndPassword(data.email, data.password);

            const avatarsRef = storage().ref(`avatars/${user.user.uid}.png`);
            let userAvatarUrl = '';

            if (data.image) {
                await avatarsRef.putFile(data.image, { contentType: 'image' });
                userAvatarUrl = await avatarsRef.getDownloadURL();
            }

            const newUser = {
                usuario_id: user.user.uid,
                usuario_email: data.email,
                usuario_nome: data.name,
                usuario_avatar: userAvatarUrl
            }
          
            await usuariosCollection.child(String(total)).set(newUser);

            setUser(newUser);
            setInitializing(false);
        } catch (error) {
            throw new Error(error as any);
        }
    }

    async function handleUserSignIn(data: LoginData) {
        try {
            const userAuth = await auth().signInWithEmailAndPassword(data.email, data.password);

            const usuariosCollection = database().ref('usuarios');
            const registers = (await usuariosCollection.once('value')).val() as Array<UserData>;
            const usuarioInfo = registers.filter(register => register.usuario_id === userAuth.user.uid)[0];

            console.log(usuarioInfo);

            setUser(usuarioInfo)
            setInitializing(false)
        } catch (error) {
            throw new Error(error as any);
        }
    }

    return (
        <AuthContext.Provider value={{ initializing, user, handleUserRegister, handleUserSignIn }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}