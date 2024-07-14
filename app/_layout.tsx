import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#5D0E41",
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 42,
        },
        title: "Brioni",
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
