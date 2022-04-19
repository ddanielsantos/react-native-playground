import { Session } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function storeSessionInStorage(session: Session) {

  try {
    if (session) await AsyncStorage.setItem("session", JSON.stringify(session));

    return { error: null }
  } catch {
    return { error: "Error storing session" }
  }
}

export async function getSessionFromStorage() {

  try {
    const stringfiedSession = await AsyncStorage.getItem("session")

    if (!stringfiedSession) return { error: null, session: null }

    const session = JSON.parse(stringfiedSession)

    return { error: null, session }

  } catch {
    return { error: "Error getting session", session: null }
  }
}

export async function removeSessionFromStorage() {

  try {
    await AsyncStorage.removeItem("session")

    return { error: null }
  } catch {
    return { error: "Error removing session" }
  }
}