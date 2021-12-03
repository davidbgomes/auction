import {House} from '@prisma/client'

export const fetcher = async(url: string) => {
  const res = await fetch(url)

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    // Attach extra info to the error object.
    throw error
  }
  return res.json()
}

export const getHouse = async(houseId : string) : Promise<House> =>{
  const endpoint = process.env.NEXT_PUBLIC_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://auction-steel.vercel.app'
  const house = await fetch(`${endpoint}/api/houses?id=${houseId}`)
    .then(res => res.json())
    .catch(err => console.log("Error:", err))
  return house
}

export const prefetchHouses = async() : Promise<House> =>{
  const endpoint = process.env.NEXT_PUBLIC_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://auction-steel.vercel.app'
  const houses = await fetch(`${endpoint}/api/houses`)
    .then(res => res.json())
    .catch(err => console.log("Error:", err))
  return houses
}
