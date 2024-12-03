import { Participants } from "@prisma/client"

const BASE_URL = 'http://localhost:3000/api'

const registerParticipant = async (data: Partial<Participants>) => {
    const response = await fetch(`${BASE_URL}/participants`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(data)
    })
    return await response.json()
}

const generatePrize = async (data: unknown) => {
    const response = await fetch(`${BASE_URL}/generate-prize`, {
        method: 'POST',
        body: JSON.stringify(data)
    })
    return await response.json()
}

const getParticipantPrize = async (id: string) => {
    const response = await fetch(`${BASE_URL}/participants/${id}`)
    return await response.json()
}

export {
    registerParticipant,
    generatePrize,
    getParticipantPrize
}