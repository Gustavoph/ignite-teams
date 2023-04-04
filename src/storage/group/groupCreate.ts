import AsyncStorage from '@react-native-async-storage/async-storage'
import { GROUP_COLLECTION } from '@storage/storageConfig'
import { groupGetAll } from './groupGetAll'
import { AppError } from '@utils/AppError'

export async function groupCreate(newGroup: string) {
  const storedGroups = await groupGetAll()

  const groupAlreadyExists = storedGroups.includes(newGroup)
  if (groupAlreadyExists) {
    throw new AppError('Grupo com este nome já existe.')
  }

  const storage = JSON.stringify([...storedGroups, newGroup])
  await AsyncStorage.setItem(GROUP_COLLECTION, storage)
}
