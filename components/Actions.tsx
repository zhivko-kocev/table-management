import { StyleSheet, Text, View, Button } from "react-native";
import React, { useState } from "react";
export interface Table {
  id: number;
  left: number;
  top: number;
  bot: number;
  right: number;
  people: number;
  isBooked: boolean;
  isDisabled: boolean;
  isMerged: boolean;
  tables: Table[];
}

interface ActionsProps {
  sendLocked: (locked: boolean) => void;
  sendVisible: (visible: boolean) => void;
  locked: boolean;
  onSave: () => void;
  sendUnMerge: (unMerged: boolean) => void;
  deleteTable: (id: number) => void;
  addTable: (people: number) => void;
}

export default function Actions({
  sendLocked,
  sendVisible,
  locked,
  onSave,
  sendUnMerge,
  addTable,
  deleteTable,
}: ActionsProps) {
  return (
    <View style={styles.buttonContainer}>
      <Button
        title={locked ? "Unlock" : "Lock"}
        onPress={() => {
          sendLocked(!locked);
        }}
        color={"#00224D"}
      />
      <Button
        title={"Merge"}
        onPress={() => {
          sendVisible(true);
        }}
        color={"#00224D"}
      />
      <Button
        title="UnMerge"
        onPress={() => {
          sendUnMerge(true);
        }}
        color={"#00224D"}
      />
      <Button
        title="Add"
        onPress={() => {
          addTable(4);
        }}
        color={"#00224D"}
      />
      <Button
        title="Delete"
        onPress={() => {
          deleteTable(5);
        }}
        color={"#00224D"}
      />

      <Button title="Save" onPress={onSave} color={"#00224D"} />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexShrink: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    // backgroundColor: "#FFE8C5",
    // borderColor: "black",
    // borderStyle: "solid",
    // borderTopWidth: 2,
  },
});
