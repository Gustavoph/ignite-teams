import { TouchableOpacityProps } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { Container, Icon, VariantProps } from './styles'

type Props = TouchableOpacityProps & {
  name: keyof typeof MaterialIcons.glyphMap
  variant?: VariantProps
}

export function ButtonIcon({ name, variant = 'PRIMARY', ...rest }: Props) {
  return (
    <Container {...rest}>
      <Icon name={name} variant={variant} />
    </Container>
  )
}
