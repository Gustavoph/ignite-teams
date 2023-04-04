import { Header } from '@components/Header'
import { Container, Content, Icon } from './styles'
import { Highlight } from '@components/Highlight'
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'

export function NewGroup() {
  const [group, setGroup] = useState('')
  const navigation = useNavigation()

  function handleNewGroup() {
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
