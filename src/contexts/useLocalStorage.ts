import { useEffect, useState } from "react"


export const useLocalStorage = (key: string, initialValue: any) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            console.log("UseLocalStorage error read: ", error)
            return initialValue
        }
    })

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(storedValue))
        } catch (error) {
            console.log("UseLocalStorage error write: ", error)
        }

    }, [key, storedValue])

    return [storedValue, setStoredValue]
}