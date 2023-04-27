import client from "../HTTP/StarWarsApi"

export interface PeopleResp {
  count: number
  next: string | null
  previous: string | null
  results: Creature[]
}

export interface Creature {
  birth_year: string
  eye_color: string
  gender: "Male" | "Female"
  hair_color: string
  height: number
  mass: number
  name: string
  skin_color: string
}

export default {
  async getPeople(page = 1): Promise<PeopleResp> {
    try {
      const resp = await client.get("people?page=" + page)
      return resp.data
    } catch (err) {
      return {
        count: 0,
        next: null,
        previous: null,
        results: []
      }
    }
  }
}
