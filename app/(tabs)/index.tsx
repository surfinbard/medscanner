import MedicationDropdown from "@/components/ui/medication-dropdown";
import { Medicamento } from "@/interfaces/Medicamento";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Note: Install lucide-react-native for icons:
// npm install lucide-react-native
// Or use react-native-vector-icons as an alternative

// For this example, I'll create simple icon components
const AlertCircle = ({ color, size }: { color: string; size: number }) => (
  <View style={{ width: size, height: size, backgroundColor: "transparent" }}>
    <Text style={{ fontSize: size * 0.8, color }}>ℹ️</Text>
  </View>
);

const X = ({ color, size }: { color: string; size: number }) => (
  <View style={{ width: size, height: size, backgroundColor: "transparent" }}>
    <Text style={{ fontSize: size, color }}>✕</Text>
  </View>
);

export default function MedScanner() {
  const [firstMedName, setFirstMedName] = useState<string>("");
  const [secondMedName, setSecondMedName] = useState<string>("");
  const [medicationName, setMedicationName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [resultData, setResultData] = useState<Medicamento>();
  const disabled = firstMedName.length == 0 || secondMedName.length == 0;

  const handleSubmit = () => {
    if (!medicationName.trim()) return;

    setIsLoading(true);

    // Simulate API call with mock data
    setTimeout(() => {
      const mockData = {
        name: medicationName,
        description:
          "Este é um medicamento usado para tratar diversas condições médicas. É importante seguir as instruções do médico e ler a bula completa.",
        composition: `Princípio ativo: ${medicationName} (500mg)`,
        indications:
          "Indicado para tratamento de infecções bacterianas, inflamações e outras condições conforme prescrição médica.",
        contraindications:
          "Não deve ser utilizado por pacientes com hipersensibilidade ao componente, gestantes sem orientação médica e crianças abaixo de 12 anos.",
        dosage:
          "Tomar 1 comprimido a cada 8 horas, preferencialmente após as refeições.",
        sideEffects:
          "Pode causar náuseas, dor de cabeça ou reações alérgicas em alguns pacientes.",
      };

      setResultData(mockData);
      setModalVisible(true);
      setIsLoading(false);
    }, 1500);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
      <View style={styles.container}>
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>MedScanner</Text>
            <Text style={styles.subtitle}>
              Consulte interações entre medicamentos
            </Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            {/* <TextInput
              style={styles.input}
              placeholder="Medicamento 1"
              placeholderTextColor="#9CA3AF"
              value={firstMedName}
              onChangeText={setMedicationName}
              editable={!isLoading}
            /> */}
            <MedicationDropdown
              placeholder="Medicamento 1"
              firstMedName={firstMedName}
              setMedicationName={setMedicationName}
              isLoading={isLoading}
            />
            {/* 

            <TextInput
              style={styles.input}
              placeholder="Medicamento 2"
              placeholderTextColor="#9CA3AF"
              value={secondMedName}
              onChangeText={setMedicationName}
              editable={!isLoading}
            /> */}

            <MedicationDropdown
              placeholder="Medicamento 2"
              firstMedName={firstMedName}
              setMedicationName={setMedicationName}
              isLoading={isLoading}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, disabled && styles.buttonDisabled]}
                onPress={handleSubmit}
                disabled={disabled}
                activeOpacity={0.8}
              >
                {isLoading ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator color="#FAFAFA" size="small" />
                    <Text style={styles.buttonText}>Consultando...</Text>
                  </View>
                ) : (
                  <Text style={styles.buttonText}>Consultar</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Info Section */}
          <View style={styles.infoBox}>
            <View style={styles.infoIconContainer}>
              <AlertCircle color="#FAFAFA" size={20} />
            </View>
            <Text style={styles.infoText}>
              Digite o nome do medicamento para obter informações detalhadas
              sobre sua composição, indicações e contraindicações.
            </Text>
          </View>
        </View>

        {/* Result Modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Resultado da Consulta</Text>
                <TouchableOpacity onPress={closeModal} activeOpacity={0.7}>
                  <X color="#dbdbdb" size={24} />
                </TouchableOpacity>
              </View>

              <ScrollView
                style={styles.modalBody}
                showsVerticalScrollIndicator={false}
              >
                {resultData && (
                  <View style={styles.resultContainer}>
                    <View style={styles.resultSection}>
                      <Text style={styles.resultName}>{resultData.name}</Text>
                      <Text style={styles.resultDescription}>
                        {resultData.description}
                      </Text>
                    </View>

                    <View style={styles.compositionBox}>
                      <Text style={styles.sectionTitle}>Composição</Text>
                      <Text style={styles.sectionText}>
                        {resultData.composition}
                      </Text>
                    </View>

                    <View style={styles.resultSection}>
                      <Text style={styles.sectionTitle}>Indicações</Text>
                      <Text style={styles.sectionText}>
                        {resultData.indications}
                      </Text>
                    </View>

                    <View style={styles.resultSection}>
                      <Text style={styles.sectionTitle}>Contraindicações</Text>
                      <Text style={styles.sectionText}>
                        {resultData.contraindications}
                      </Text>
                    </View>

                    <View style={styles.resultSection}>
                      <Text style={styles.sectionTitle}>Posologia</Text>
                      <Text style={styles.sectionText}>
                        {resultData.dosage}
                      </Text>
                    </View>

                    <View style={styles.resultSection}>
                      <Text style={styles.sectionTitle}>
                        Efeitos Colaterais
                      </Text>
                      <Text style={styles.sectionText}>
                        {resultData.sideEffects}
                      </Text>
                    </View>
                  </View>
                )}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0b1215",
  },
  subtitle: {
    fontSize: 14,
    color: "#dbdbdb",
    marginTop: 8,
  },
  formContainer: {
    marginBottom: 32,
    rowGap: 8,
  },
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
  buttonContainer: {
    alignItems: "flex-end",
    marginTop: 24,
  },
  button: {
    backgroundColor: "#0b1215",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonDisabled: {
    opacity: 0.3,
  },
  buttonText: {
    color: "#FAFAFA",
    fontSize: 16,
    fontWeight: "500",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  infoBox: {
    flexDirection: "row",
    backgroundColor: "rgba(219, 219, 219, 0.2)",
    borderRadius: 12,
    padding: 16,
    alignItems: "flex-start",
  },
  infoIconContainer: {
    backgroundColor: "#0b1215",
    borderRadius: 20,
    padding: 8,
    marginRight: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: "#0b1215",
    lineHeight: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    width: "100%",
    maxHeight: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0b1215",
  },
  modalBody: {
    padding: 24,
  },
  resultContainer: {
    gap: 16,
  },
  resultSection: {
    marginBottom: 16,
  },
  resultName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0b1215",
    marginBottom: 8,
  },
  resultDescription: {
    fontSize: 14,
    color: "#dbdbdb",
    lineHeight: 20,
  },
  compositionBox: {
    backgroundColor: "rgba(219, 219, 219, 0.2)",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0b1215",
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 14,
    color: "#0b1215",
    lineHeight: 20,
  },
});
