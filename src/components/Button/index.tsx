import { ButtonVariantProps, Container, Title } from './styles'
import { TouchableOpacityProps } from 'react-native'

type Props = TouchableOpacityProps & {
  title: string
  variant?: ButtonVariantProps
}

export function Button({ title, variant = 'PRIMARY', ...rest }: Props) {
  return (
    <Container {...rest} variant={variant}>
      <Title>{title}</Title>
    </Container>
  )
}
