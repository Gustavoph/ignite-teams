import AsyncStorage from '@react-native-async-storage/async-storage'

import { PLAYER_COLLECTION } from '@storage/storageConfig'
import { playersGetByGroup } from './playersGetByGroup'

type Props = {
  playerName: string
  group: string
}

export async function playerRemoveByGroup({ group, playerName }: Props) {
  const storage = await playersGetByGroup(group)
  const filteredPlayers = storage.filter((player) => player.name !== playerName)
  const players = JSON.stringify(filteredPlayers)

  await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, players)
}
