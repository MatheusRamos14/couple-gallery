import React, {
    createContext,
    useContext,
    useState,
    useEffect
} from "react";
import { Alert } from "react-native";
import * as Yup from 'yup';
import database from '@react-native-firebase/database';
import { v4 as uuidv4 } from "uuid";

import { useAuth } from "./useAuth";

export type ICouple = {
    users: {
        confirmed: any,
    },
    couple_id: string
}

interface ContextData {
    couples: ICouple[];
    handleCreateCouple(userID: string): Promise<void>;
    handleDeny(couple_id: string): Promise<void>;
    handleAccept(couple_id: string): Promise<void>;
    waiting: boolean;
}

interface ProviderProps {
    children: React.ReactNode
}

const CoupleContext = createContext<ContextData>({} as ContextData);

export function CoupleProvider({ children }: ProviderProps) {    
    const [couples, setCouples] = useState<ICouple[]>([]);
    const [waiting, setWaiting] = useState<boolean>(false);

    const { user, hasCouple } = useAuth();

    async function validate(userID: string) {
        try {
            const data = { userID };

            const createCoupleSchema = Yup.object({
                userID: Yup.string()
                    .required("O campo é obrigatório")
                    .not([user.user_id], "Não é permitido usar o seu próprio ID")
            })

            await createCoupleSchema.validate(data);

            const usersCollection = database().ref("users").child(userID);
            const userExists = (await usersCollection.once("value")).exists()
            if (!userExists) {
                Alert.alert("Ops", "Usuário não encontrado")
                return false;
            }

            const alreadyExists = couples.find(couple => {
                const IDS = Object.keys(couple.users.confirmed);

                console.log("IDS", IDS)
                return IDS.includes(userID)
            })
            if (alreadyExists) {
                Alert.alert("Ops", "Já existe uma solicitação para esse usuário")
                return false;
            }

            // await handleUserRegister(data);
            return true;
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                console.log(error.message);
            } else {
                const err = error as any;
                console.log(err)
            }
            return false
        }
    }

    async function handleCreateCouple(userID: string) {
        try {
            const valid = await validate(userID);
            if (!valid) return;

            const coupleID = uuidv4();
            const coupleCollection = database().ref('couples');

            await coupleCollection.update({
                [coupleID]: {
                    users: {
                        [user.user_id]: true,
                        [userID]: true,
                        confirmed: {
                            [user.user_id]: true,
                            [userID]: ""
                        }
                    }
                }
            })

            console.log("CRIADO")
        } catch (error) {
            const err = error as any;
            console.log(err)
        }
    }

    async function handleDeny(couple_id: string) {
        try {
            const coupleCollection = database().ref('couples').child(`${couple_id}/users/confirmed`);

            await coupleCollection.update({
                [user.user_id]: false
            })
        } catch (error) {
            const err = error as any;
            console.log(err)
        }
    }

    async function handleAccept(couple_id: string) {
        try {
            const usersCollection = database().ref('users');
            const coupleCollection = database().ref('couples').child(`${couple_id}/users/confirmed`);

            const coupleIDS = Object.keys((await coupleCollection.once('value')).val());
            const coupleUserID = coupleIDS.find(id => id !== user.user_id);

            await coupleCollection.update({
                [user.user_id]: true
            })

            await usersCollection.child(coupleUserID!)
                .update({ couple_id });

            await usersCollection.child(user.user_id!)
                .update({ couple_id });
        } catch (error) {
            const err = error as any;
            console.log(err)
        }
    }

    useEffect(() => {
        const coupleCollection = database().ref('couples')
        const couplesQuery = coupleCollection.orderByChild("users/" + user.user_id).equalTo(true);

        const onValue = couplesQuery.on('value', snapshot => {
            if (!(snapshot.exists())) return;
            console.log("LESGO")

            const usersCouples = Object.entries(snapshot.val()).map(([key, value]) => {
                const couple = value as ICouple;
                couple.couple_id = key;
                return couple;
            });

            const hasConfirmed = usersCouples.find(couple => couple.users.confirmed[user.user_id] === true);
            if (hasConfirmed) setWaiting(true);
            else setWaiting(false);

            setCouples(usersCouples);
        })

        if (hasCouple) {
            console.log("No more!")
            couplesQuery.off("value", onValue);
        }

        return () => {
            couplesQuery.off("value", onValue)
        };
    }, [])

    return (
        <CoupleContext.Provider value={{
            couples,
            handleCreateCouple,
            handleAccept,
            handleDeny,
            waiting
        }}>
            {children}
        </CoupleContext.Provider>
    );
}

export function useCouple() {
    return useContext(CoupleContext);
}