import { View, StyleSheet, Button, Modal, TextInput } from "react-native";
import { useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";
import Tables from "@/components/Tables";
import Actions from "@/components/Actions";
import MergeDialog from "@/components/MergeDialog";
import BookDialog from "@/components/BookDialog";
import UnMergeDialog from "@/components/UnMergeDialog";
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

const initialData: Table[] = [
  {
    id: 1,
    x: 0,
    y: 0,
    people: 4,
    isBooked: false,
    isDisabled: false,
    isMerged: false,
    tables: [],
  },
  {
    id: 2,
    x: 90,
    y: 0,
    people: 6,
    isBooked: false,
    isDisabled: false,
    isMerged: false,
    tables: [],
  },
  {
    id: 3,
    x: 260,
    y: 0,
    people: 4,
    isBooked: false,
    isDisabled: false,
    isMerged: false,
    tables: [],
  },
  {
    id: 4,
    x: 340,
    y: 0,
    people: 4,
    isBooked: false,
    isDisabled: false,
    isMerged: false,
    tables: [],
  },
  {
    id: 5,
    x: 420,
    y: 0,
    people: 6,
    isBooked: false,
    isDisabled: false,
    isMerged: false,
    tables: [],
  },
  {
    id: 6,
    x: 550,
    y: 0,
    people: 4,
    isBooked: false,
    isDisabled: false,
    isMerged: false,
    tables: [],
  },
  {
    id: 7,
    x: 630,
    y: 0,
    people: 4,
    isBooked: false,
    isDisabled: false,
    isMerged: false,
    tables: [],
  },
  {
    id: 8,
    x: 710,
    y: 0,
    people: 6,
    isBooked: false,
    isDisabled: false,
    isMerged: false,
    tables: [],
  },
  {
    id: 9,
    x: 840,
    y: 0,
    people: 4,
    isBooked: false,
    isDisabled: false,
    isMerged: false,
    tables: [],
  },
];
export default function Index() {
  const [visibleMerge, setVisibleMerge] = useState(false);
  const [visibleBook, setVisibleBook] = useState(false);
  const [visibleUnMerge, setVisibleUnMerge] = useState(false);

  const [data, setData] = useState(initialData);
  const [locked, setLocked] = useState(false);
  const [momID, setMomID] = useState("");

  // useEffect(() => {
  //   // const loadData = async () => {
  //   //   const filePath = `${FileSystem.documentDirectory}tableData.txt`;

  //   //   try {
  //   //     const fileContent = await FileSystem.readAsStringAsync(filePath);
  //   //     const loadedData = JSON.parse(fileContent);
  //   //     setData(loadedData);
  //   //   } catch (error) {
  //   //     console.log("Error loading data or file not found:", error);
  //   //   }
  //   // };

  //   // loadData();
  // }, []);

  const handleLocked = (childLocked: boolean) => {
    setLocked(childLocked);
  };
  const handleVisible = (childVisible: boolean) => {
    setVisibleMerge(childVisible);
  };
  const handleBook = (childVisible: boolean) => {
    setVisibleBook(childVisible);
  };
  const handleUnMerge = (childVisible: boolean) => {
    setVisibleUnMerge(childVisible);
  };
  const handleData = (data: any) => {
    // console.log(data);
    setData(data);
  };
  const handleMerge = (id1: number, id2: number) => {
    const table1 = data.find((table) => table.id === id1);
    const table2 = data.find((table) => table.id === id2);
    if (!table1 || !table2) {
      return;
    }

    table1.people += table2.people;
    table1.isBooked = table1.isBooked || table2.isBooked;
    table1.isDisabled = table1.isDisabled || table2.isDisabled;
    table1.isMerged = true;
    table1.tables.push(table2);

    const newData = data.filter((table) => table.id != id2);
    setData(newData);
  };
  const handleSave = async () => {
    // const filePath = `${FileSystem.documentDirectory}tableData.txt`;
    // try {
    //   await FileSystem.writeAsStringAsync(filePath, JSON.stringify(data));
    //   console.log("Data saved successfully");
    // } catch (error) {
    //   console.log("Error saving data:", error);
    // }
  };
  const handleMomID = (id: any) => {
    setMomID(id);
  };
  const handleOnBook = (hour: string) => {
    const newData = data.map((item) =>
      item.id == parseInt(momID) ? { ...item, isBooked: true } : item
    );
    setData(newData);
  };
  const handleOnUnMerge = (id: number) => {
    const table = data.find((item) => item.id == id);
    if (!table || !table.isMerged) {
      return;
    }
    const tables = table.tables;
    table.isMerged = false;
    table.tables = [];
    data.push(...tables);
  };
  const handleAdd = (people: number) => {
    data.push({
      id: Math.max(...data.map((item) => item.id)) + 1,
      x: 2, //todo
      y: 3, //todo
      people: people,
      isBooked: false,
      isDisabled: locked,
      isMerged: false,
      tables: [],
    });
  };
  const handleDelete = (id: number) => {
    const newData = data.filter((item) => item.id != id);
    setData(newData);
  };
  return (
    <View style={styles.container}>
      <Tables
        data={data}
        locked={locked}
        sendData={handleData}
        sendBookID={handleMomID}
        sendBook={handleBook}
      />
      <Actions
        sendLocked={handleLocked}
        sendVisible={handleVisible}
        sendUnMerge={handleUnMerge}
        locked={locked}
        onSave={handleSave}
        addTable={handleAdd}
        deleteTable={handleDelete}
      />
      <MergeDialog
        sendVisible={handleVisible}
        visible={visibleMerge}
        onMerge={handleMerge}
      />
      <BookDialog
        sendVisible={handleBook}
        visible={visibleBook}
        onBook={handleOnBook}
      />
      <UnMergeDialog
        sendVisible={handleUnMerge}
        visible={visibleUnMerge}
        onUnMerge={handleOnUnMerge}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
