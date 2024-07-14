import { View, Text, StyleSheet, ImageBackground } from "react-native";
import React from "react";
import Draggable from "react-native-draggable";
import { useEffect } from "react";

const image = {
  uri: "assets/images/back.png",
};

interface Table {
  id: number;
  x: number;
  y: number;
  people: number;
  isBooked: boolean;
  isDisabled: boolean;
  isMerged: boolean;
  tables: Table[];
}

interface TablesProps {
  data: Table[];
  locked: boolean;
  sendData: (data: Table[]) => void;
  sendBookID: (id: any) => void;
  sendBook: (visible: boolean) => void;
}

export default function Tables({
  data,
  locked,
  sendData,
  sendBookID,
  sendBook,
}: TablesProps) {
  const handleShortPress = (id: any) => {
    sendBookID(id);
    sendBook(true);
  };

  const handleMove = (event: any, gestureState: any, bounds: any, id: any) => {
    console.log(gestureState);
    console.log(bounds);
  };

  useEffect(() => {
    const newData = data.map((item) => ({
      ...item,
      isDisabled: locked ? true : false,
    }));
    sendData(newData);
  }, [locked]);

  return (
    <ImageBackground
      source={image}
      resizeMode="stretch"
      style={{ flex: 1, justifyContent: "center" }}
    >
      <View style={styles.draggableContainer}>
        {data.map((item) =>
          item.people == 4 ? (
            <Draggable
              x={item.x}
              y={item.y}
              renderColor={item.isBooked ? "#FF204E" : "#57A6A1"}
              renderText={String(item.id)}
              key={item.id}
              onShortPressRelease={() => handleShortPress(item.id)}
              onDragRelease={(event, gestureState, bounds) =>
                handleMove(event, gestureState, bounds, item.id)
              }
              disabled={locked ? true : false}
            >
              <View
                style={{
                  width: item.people * 20,
                  height: 70,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderColor: "black",
                  borderStyle: "solid",
                  borderWidth: 2,
                }}
              >
                <Text style={styles.text}>
                  {item.isMerged
                    ? "Merged - ( " +
                      item.id +
                      item.tables.map((table) => table.id).join(" ") +
                      " )"
                    : item.id}
                </Text>
              </View>
            </Draggable>
          ) : (
            <Draggable
              x={item.x}
              y={item.y}
              renderColor={item.isBooked ? "#FF204E" : "#57A6A1"}
              key={item.id}
              onShortPressRelease={() => handleShortPress(item.id)}
              onDragRelease={(event, gestureState, bounds) =>
                handleMove(event, gestureState, bounds, item.id)
              }
              disabled={locked ? true : false}
            >
              <View
                style={{
                  width: item.people * 20,
                  height: 70,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderColor: "black",
                  borderStyle: "solid",
                  borderWidth: 2,
                }}
              >
                <Text style={styles.text}>
                  {item.isMerged
                    ? "Merged - ( " +
                      item.id +
                      ", " +
                      item.tables.map((table) => table.id).join(", ") +
                      " )"
                    : item.id}
                </Text>
              </View>
            </Draggable>
          )
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  draggableContainer: {
    display: "flex",
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // gap: 10,
  },
  text: {
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
