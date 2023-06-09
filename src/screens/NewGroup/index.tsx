import { useState } from 'react'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { Container, Content, Icon } from './styles'
import { groupCreate } from '@storage/group/groupCreate'
import { AppError } from '@utils/AppError'

export function NewGroup() {
  const [group, setGroup] = useState('')
  const navigation = useNavigation()

  async function handleNewGroup() {
    try {
      if (group.trim().length === 0) {
        return Alert.alert('Novo Grupo', 'Informe o nome da turma.')
      }
      setGroup('')
      await groupCreate(group)
      navigation.navigate('players', { group })
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo Grupo', error.message)
      } else {
        Alert.alert('Novo Grupo', 'Não foi possível criar um novo grupo.')
        console.log(error)
      }
    }
  }

  function handleChangeGroup(group: string) {
    setGroup(group)
  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />
        <Highlight
          title="Nova Turma"
          subtitle="Crie a turma para adicionar as pessoas"
        />

        <Input
          placeholder="Nome da Turma"
          style={{ marginBottom: 20 }}
          onChangeText={handleChangeGroup}
          onSubmitEditing={handleNewGroup}
          returnKeyType="done"
        />

        <Button title="Criar" onPress={handleNewGroup} />
      </Content>
    </Container>
  )
}
