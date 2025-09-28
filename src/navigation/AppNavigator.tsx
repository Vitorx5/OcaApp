// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import SplashScreen from "../screens/SplashScreen";
// import LoginScreen from "../screens/LoginScreen";
// import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
// import ResetPasswordScreen from "../screens/ResetPasswordScreen";
// import LogoutScreen from "../screens/LogoutScreen";

// const Stack = createNativeStackNavigator();

// export default function AppNavigator() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="Splash" component={SplashScreen} />
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
//         <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
//         <Stack.Screen name="Logout" component={LogoutScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// AppNavigator.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import LogoutScreen from "../screens/LogoutScreen";

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  ResetPassword: undefined;
  Logout: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Login" }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ title: "Recuperar Senha" }} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{ title: "Redefinir Senha" }} />
        <Stack.Screen name="Logout" component={LogoutScreen} options={{ title: "Logout" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
