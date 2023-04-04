import React, {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";
import database from '@react-native-firebase/database';

import { useAuth } from "./useAuth";

interface ContextData {
    hasCouple: boolean;
    couple: ICouple;
}

type Foto = {
    foto_author: string;
    foto_descricao: string;
    foto_url: string;
    quantidade_curtidas: number;
}

interface ICouple {
    fotos: Foto[];
    usuarios: {
        couple_id_1: string;
        couple_id_2: string;
    };
}

interface ProviderProps {
    children: React.ReactNode
}

const PhotoContext = createContext<ContextData>({} as ContextData);

export function PhotoProvider({ children }: ProviderProps) {
    const { user } = useAuth();

    const [hasCouple, setHasCouple] = useState<boolean>(false);
    const [couple, setCouple] = useState<ICouple>({} as ICouple);

    async function verifyCoupleExists() {
        if (user.casal_id) {
            const casaisCollection = database().ref('casais');

            const data = await casaisCollection.child(user.casal_id).once('value');

            console.log(data.val());
            setCouple(data.val() as ICouple);
            setHasCouple(true);
        };
    }

    useEffect(() => {
        verifyCoupleExists();
    }, [])

    return (
        <PhotoContext.Provider value={{ hasCouple, couple }}>
            {children}
        </PhotoContext.Provider>
    );
}

export function usePhoto() {
    return useContext(PhotoContext);
}