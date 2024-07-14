import { StyleSheet, View, TextInput, Modal, Button } from "react-native";
import React, { useState } from "react";

interface MergeDialogProps {
  sendVisible: (visible: boolean) => void;
  visible: boolean;
  onMerge: (id1: number, id2: number) => void;
}

export default function MergeDialog({
  sendVisible,
  visible,
  onMerge,
}: MergeDialogProps) {
  const [id1, setId1] = useState<string>("");
  const [id2, setId2] = useState<string>("");

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
                  value={id1}
                  onChangeText={setId1}
                  keyboardType="numeric"
                  placeholder="First Table ID"
                />
                <TextInput
                  style={styles.input}
                  value={id2}
                  onChangeText={setId2}
                  keyboardType="numeric"
                  placeholder="Second Table ID"
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
                  title={"Merge"}
                  onPress={() => {
                    onMerge(parseInt(id1), parseInt(id2));
                    sendVisible(false);
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
