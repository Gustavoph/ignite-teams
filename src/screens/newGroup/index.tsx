import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { Container, Content, Icon } from './styles'
import { groupCreate } from '@storage/group/groupCreate'

export function NewGroup() {
  const [group, setGroup] = useState('')
  const navigation = useNavigation()

  async function handleNewGroup() {
    await groupCreate(group)
    navigation.navigate('players', { group })
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
        />

        <Button title="Criar" onPress={handleNewGroup} />
      </Content>
    </Container>
  )
}
