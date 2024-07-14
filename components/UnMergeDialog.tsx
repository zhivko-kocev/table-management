import { StyleSheet, View, TextInput, Modal, Button } from "react-native";
import React, { useState } from "react";

interface UnMergeDialogProps {
  sendVisible: (visible: boolean) => void;
  visible: boolean;
  onUnMerge: (id: number) => void;
}

export default function UnMergeDialog({
  sendVisible,
  visible,
  onUnMerge,
}: UnMergeDialogProps) {
  const [id, setId] = useState<string>("");

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
              <View style={{ display: "flex", flexDirection: "row" }}>
                <TextInput
                  style={styles.input}
                  value={id}
                  onChangeText={setId}
                  keyboardType="numeric"
                  placeholder="Table ID"
                />
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 12,
                  justifyContent: "center",
                }}
              >
                <Button
                  title={"Close"}
                  onPress={() => {
                    sendVisible(false);
                  }}
                />
                <Button
                  title={"UnMerge"}
                  onPress={() => {
                    onUnMerge(parseInt(id));
                    sendVisible(false);
                    setId("");
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
