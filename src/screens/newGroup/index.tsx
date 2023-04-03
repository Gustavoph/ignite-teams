import { Header } from '@components/Header'
import { Container, Content, Icon } from './styles'
import { Highlight } from '@components/Highlight'
import { Button } from '@components/Button'
import { Input } from '@components/Input'

export function NewGroup() {
  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />
        <Highlight
          title="Nova Turma"
          subtitle="Crie a turma para adicionar as pessoas"
        />

        <Input placeholder="Nome da Turma" style={{ marginBottom: 20 }} />
        <Button title="Criar" />
      </Content>
    </Container>
  )
}
