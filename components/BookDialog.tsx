import { StyleSheet, View, TextInput, Modal, Button } from "react-native";
import React, { useState } from "react";

interface BookDialogProps {
  sendVisible: (visible: boolean) => void;
  visible: boolean;
  onBook: (hour: string) => void;
}

export default function BookDialog({
  sendVisible,
  visible,
  onBook,
}: BookDialogProps) {
  const [hour, setHour] = useState<string>("");

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          sendVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ padding: 10 }}>
              <TextInput value={hour} onChangeText={setHour} />
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Button
                  title={"Close"}
                  onPress={() => {
                    sendVisible(false);
                  }}
                />
                <Button
                  title={"Book"}
                  onPress={() => {
                    onBook(hour);
                    sendVisible(false);
                    setHour("");
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: 40,
    width: 130,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    flex: 1,
  },
});
