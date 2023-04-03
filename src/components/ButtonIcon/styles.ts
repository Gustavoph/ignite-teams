import styled from 'styled-components/native'
import { TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

export type VariantProps = 'PRIMARY' | 'SECONDARY'

type Props = {
  variant: VariantProps
}

export const Container = styled(TouchableOpacity)`
  width: 56px;
  height: 56px;

  justify-content: center;
  align-items: center;

  margin-left: 12px;
`

export const Icon = styled(MaterialIcons).attrs<Props>(
  ({ theme, variant }) => ({
    size: 24,
    color: variant === 'PRIMARY' ? theme.COLORS.GREEN_700 : theme.COLORS.RED,
  }),
)``
