import React, { createContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, Modal } from "react-native";
import NetInfo from "@react-native-community/netinfo";

export const NetworkContext = createContext();

const NetworkProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(true);
  const [connectionMessage, setConnectionMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const connected = state.isConnected ?? false;
      setIsConnected(connected);

      // Show the popup with the connection status only when it changes
      setConnectionMessage(
        connected ? "Connected to the Internet" : "No Internet Connection"
      );
      setShowPopup(true); // Show popup on status change

      // Hide popup automatically after 2 seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 4000);
    });

    return () => unsubscribe();
  }, []);

  return (
    <NetworkContext.Provider value={{ isConnected }}>
      <View style={{ flex: 1 }}>
        {/* Modal-like Popup */}
        {showPopup && (
          <View style={styles.popupContainer}>
            <View
              style={[
                styles.popup,
                { backgroundColor: isConnected ? "#4CAF50" : "#F44336" },
              ]}
            >
              <Text style={styles.popupText}>{connectionMessage}</Text>
            </View>
          </View>
        )}
        {children}
      </View>
    </NetworkContext.Provider>
  );
};

const styles = StyleSheet.create({
  popupContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  popup: {
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  popupText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default NetworkProvider;
