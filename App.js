import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Signin } from './Signin';
import { Signup } from './Signup';
import { Home } from './home';
import { ViewNote } from './viewnote';
import { NewNote } from './newnote';

const Stack = createNativeStackNavigator();


function App() {

  const ui=(
    <NavigationContainer>
      <Stack.Navigator>
   
        <Stack.Screen name="SignIn" component={Signin}   />
        <Stack.Screen name="SignUp" component={Signup}   />
        <Stack.Screen name="Home" component={Home}   />
        <Stack.Screen name="ViewNote" component={ViewNote}   />
        <Stack.Screen name="NewNote" component={NewNote}   />
        

      </Stack.Navigator>
    </NavigationContainer>
  );
  return ui;
}


export default App;

