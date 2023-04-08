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
    user_id: string;
    user_email: string;
    user_name: string;
    user_avatar: string;
    couple_id: string;
}

interface ContextData {
    initializing: boolean;
    user: UserData;
    handleUserRegister: (data: SignUpData) => Promise<void>;
    handleUserSignIn: (data: LoginData) => Promise<void>;
    handleChangeAvatar: (data: string) => Promise<void>;
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
            const usersCollection = database().ref('users');

            console.log("IMAGEM", data.image);

            const user = await auth()
                .createUserWithEmailAndPassword(data.email, data.password);

            const avatarsRef = storage().ref(`avatars/${user.user.uid}.png`);
            let userAvatarUrl = '';

            if (data.image) {
                await avatarsRef.putFile(data.image, { contentType: 'image' });
                userAvatarUrl = await avatarsRef.getDownloadURL();
            }

            const newUser = {
                user_id: user.user.uid,
                user_email: data.email,
                user_name: data.name,
                user_avatar: userAvatarUrl,
                couple_id: ""
            }

            await usersCollection.child(user.user.uid).set(newUser);

            setUser(newUser);
            setInitializing(false);
        } catch (error) {
            throw new Error(error as any);
        }
    }

    async function handleUserSignIn(data: LoginData) {
        try {
            const userAuth = await auth().signInWithEmailAndPassword(data.email, data.password);

            const usersCollection = database()
                .ref('users').child(userAuth.user.uid);
            const userInfo = (await usersCollection.once('value')).val() as UserData;

            setUser(userInfo);
            setInitializing(false)
        } catch (error) {
            throw new Error(error as any);
        }
    }

    async function handleChangeAvatar(picture_path: string) {
        try {
            const usersCollection = database()
                .ref('usuarios').child(user.user_id);

            const avatarsRef = storage().ref(`avatars/${user.user_id}.png`);
            await avatarsRef.putFile(picture_path, { contentType: 'image' });

            const pic_url = await avatarsRef.getDownloadURL();

            await usersCollection.update({
                user_avatar: pic_url
            })

            const userInfo = (await usersCollection.once('value')).val() as UserData;
            setUser(userInfo);
        } catch (error) {
            throw new Error(error as any);
        }
    }

    return (
        <AuthContext.Provider value={{
            initializing,
            user,
            handleUserRegister,
            handleUserSignIn,
            handleChangeAvatar
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}