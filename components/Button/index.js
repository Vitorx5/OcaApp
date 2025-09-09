import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "./styles";

export default function Button({ text, onPress, disabled = false }){
    return (
        <TouchableOpacity
        style={[styles.button, disabled && styles.disabledB]} 
        onPress={onPress}   
        disabled={disabled}
        >
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
}
