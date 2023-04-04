import { useNavigation, useRoute } from '@react-navigation/native'
import { useEffect, useState, useRef } from 'react'
import { Alert, FlatList, TextInput } from 'react-native'

import { Input } from '@components/Input'
import { AppError } from '@utils/AppError'
import { Header } from '@components/Header'
import { Filter } from '@components/Filter'
import { Button } from '@components/Button'
import { Loading } from '@components/Loading'
import { Highlight } from '@components/Highlight'
import { ListEmpty } from '@components/ListEmpty'
import { ButtonIcon } from '@components/ButtonIcon'
import { PlayerCard } from '@components/PlayerCard'
import { playerAddByGroup } from '@storage/player/playerAddByGroup'
import { Container, Form, HeaderList, NumberOfPlayers } from './styles'
import { playerGetByGroupAndTeam } from '@storage/player/playerGetByGroupAndTeam'
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO'
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup'
import { groupRemoveByName } from '@storage/group/groupRemoveByName'

type RouteParams = {
  group: string
}

export function Players() {
  const [isLoading, setIsLoading] = useState(true)
  const [team, setTeam] = useState('Time A')
  const [newPlayerName, setNewPlayerName] = useState('')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

  const navigation = useNavigation()
  const route = useRoute()

  const newPlayerNameInputRef = useRef<TextInput>(null)

  const { group } = route.params as RouteParams

  function handleChangeTeam(team: string) {
    setTeam(team)
  }

  async function handleAddPlayers() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert(
        'Novo Player',
        'Informe o nome do player para adicionar.',
      )
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    }

    try {
      await playerAddByGroup({ newPlayer, group })
      newPlayerNameInputRef.current?.blur()
      setNewPlayerName('')
      fetchPlayersByTeam()
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo Player', error.message)
      } else {
        Alert.alert('Novo Player', 'Erro ao criar novo player')
        console.error(error)
      }
    }
  }

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true)
      const players = await playerGetByGroupAndTeam({ group, team })
      setPlayers(players)
    } catch (error) {
      Alert.alert(
        'Players',
        `Não foi possivel carregar os players do time ${team}`,
      )
    } finally {
      setIsLoading(false)
    }
  }

  async function handleRemovePlayer(playerName: string) {
    try {
      await playerRemoveByGroup({ group, playerName })
      fetchPlayersByTeam()
    } catch (error) {
      Alert.alert('Remover player', 'Não foi possivel remover esse player.')
    }
  }

  async function onRemoveGroup() {
    try {
      await groupRemoveByName(group)
      navigation.navigate('groups')
    } catch (error) {
      console.log(error)
      Alert.alert('Remover grupo', 'Não foi possivel remover grupo.')
    }
  }

  async function handleRemoveGroup() {
    Alert.alert('Remover', 'Deseja remover o grupo?', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: () => onRemoveGroup() },
    ])
  }

  useEffect(() => {
    fetchPlayersByTeam()
  }, [team])

  return (
    <Container>
      <Header showBackButton />
      <Highlight title={group} subtitle="Adicione a galera e separe os times" />

      <Form>
        <Input
          autoCorrect={false}
          value={newPlayerName}
          placeholder="Nome da pessoa"
          inputRef={newPlayerNameInputRef}
          onChangeText={(text) => setNewPlayerName(text)}
          onSubmitEditing={handleAddPlayers}
          returnKeyType="done"
        />
        <ButtonIcon name="add" onPress={handleAddPlayers} />
      </Form>

      <HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => handleChangeTeam(item)}
            />
          )}
          horizontal
        />

        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>

      {isLoading && <Loading />}

      {!isLoading && (
        <FlatList
          data={players}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PlayerCard
              name={item.name}
              onRemove={() => handleRemovePlayer(item.name)}
            />
          )}
          ListEmptyComponent={() => (
            <ListEmpty message="Não há pessoas nesse time" />
          )}
          contentContainerStyle={[
            { paddingBottom: 100 },
            players.length === 0 && { flex: 1 },
          ]}
        />
      )}

      <Button
        title="Remover Turma"
        variant="SECONDARY"
        onPress={handleRemoveGroup}
      />
    </Container>
  )
}
