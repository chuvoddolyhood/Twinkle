import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import React, { useState, useEffect } from 'react'
import colors from '../../assets/colors'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

const SearchInput = ({ title, icon, onChangeText, onPress, value }) => {

  const onHandle = () => {
    onPress();
    Keyboard.dismiss();
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={title}
        style={styles.textInput}
        onChangeText={text => onChangeText(text)}
        value={value}
      />
      <TouchableOpacity onPress={onHandle}>
        <View style={styles.containerIcon}>
          <FontAwesomeIcon icon={icon} size={22} color={colors.iconColor} />
        </View>
      </TouchableOpacity>
    </View >
  )
}

export default SearchInput

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderColor: colors.iconColor,
    borderWidth: 0.3,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.whiteColor
  },
  containerIcon: {
    // backgroundColor: colors.iconColor,
    padding: 12,
    borderRadius: 8,
  },
  textInput: {
    width: '80%',
    fontSize: 16
  }
})