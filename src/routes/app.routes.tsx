import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Groups } from '@screens/groups'
import { Players } from '@screens/players'
import { NewGroup } from '@screens/newGroup'

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
  return (
    <Navigator initialRouteName="groups" screenOptions={{ headerShown: false }}>
      <Screen name="groups" component={Groups} />
      <Screen name="players" component={Players} />
      <Screen name="new" component={NewGroup} />
    </Navigator>
  )
}