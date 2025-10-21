import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { medList } from "../../assets/nomes"; // your array of medication names

const MedicationDropdown = ({
  placeholder,
  firstMedName,
  setMedicationName,
  isLoading,
}: {
  placeholder: string;
  firstMedName: string;
  setMedicationName: (_: string) => void;
  isLoading: boolean;
}) => {
  const [query, setQuery] = useState(firstMedName || "");
  const [filteredList, setFilteredList] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleChange = (text: string) => {
    setQuery(text);
    setMedicationName(text);
    if (text.length > 0) {
      const filtered = medList.filter((item) =>
        item.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredList(filtered);
      setShowDropdown(true);
    } else {
      setFilteredList([]);
      setShowDropdown(false);
    }
  };

  const handleSelect = (item: string) => {
    setQuery(item);
    setMedicationName(item);
    setShowDropdown(false);
  };

  return (
    <View style={{ position: "relative" }}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={query}
        onChangeText={handleChange}
        editable={!isLoading}
      />

      {showDropdown && (
        <View
          style={{
            position: "absolute",
            top: 48,
            left: 0,
            right: 0,
            backgroundColor: "white",
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#d1d5db",
            maxHeight: 150,
            zIndex: 10,
          }}
        >
          <FlatList
            keyboardShouldPersistTaps="handled"
            data={filteredList}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleSelect(item)}
                style={{ padding: 10 }}
              >
                <Text style={{ color: "#111827" }}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default MedicationDropdown;

const styles = StyleSheet.create({
  input: {
    width: "100%",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    fontSize: 16,
    color: "#0b1215",
    backgroundColor: "#FFFFFF",
  },
});
