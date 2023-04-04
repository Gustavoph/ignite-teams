import AsyncStorage from '@react-native-async-storage/async-storage'
import { groupGetAll } from './groupGetAll'
import { GROUP_COLLECTION, PLAYER_COLLECTION } from '@storage/storageConfig'

export async function groupRemoveByName(groupDeleted: string) {
  const storedGroups = await groupGetAll()
  const groupsFiltered = storedGroups.filter((group) => group !== groupDeleted)
  const groups = JSON.stringify(groupsFiltered)

  await AsyncStorage.setItem(GROUP_COLLECTION, groups)
  await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupDeleted}`)
}
