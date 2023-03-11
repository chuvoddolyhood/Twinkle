import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import colors from '../../assets/colors'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

const SearchInput = ({ title, icon, onChangeText }) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={title}
        style={styles.textInput}
        onChangeText={text => onChangeText(text)}
      />
      <View style={styles.containerIcon}>
        <FontAwesomeIcon icon={icon} size={22} color={colors.iconColor} />
      </View>
    </View>
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