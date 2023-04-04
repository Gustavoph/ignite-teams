import { playersGetByGroup } from './playersGetByGroup'

type Props = {
  group: string
  team: string
}

export async function playerGetByGroupAndTeam({ group, team }: Props) {
  const storage = await playersGetByGroup(group)
  const players = storage.filter((player) => player.team === team)
  return players
}
