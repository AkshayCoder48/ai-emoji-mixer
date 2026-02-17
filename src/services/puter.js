import { Puter } from 'puter-js'

const puter = new Puter()

export const callServerlessFunction = async (functionId, args) => {
  try {
    const result = await puter.functions.invoke(functionId, args)
    return result
  } catch (error) {
    throw error
  }
}