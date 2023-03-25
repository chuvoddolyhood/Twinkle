import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useState } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_API_KEY } from '../../assets/GoogleKey'
import colors from '../../assets/colors'
import Geolocation from '@react-native-community/geolocation'

const Map = ({ route, navigation }) => {
    const [latitude, setLatitude] = useState(10.758208)
    const [longitude, setLongitude] = useState(106.700581)
    const { city } = route.params

    const { height, width } = Dimensions.get("window")

    const ratio = width / height
    const latitudeDelta = 0.02
    const longitudeDelta = latitudeDelta * ratio


    Geolocation.getCurrentPosition(data => {
        setLatitude(data.coords.latitude);
        setLongitude(data.coords.longitude);
    })

    return (
        <View style={styles.container}>
            <MapView style={[styles.mapContainer, { height: height - 50, width: width }]}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: latitudeDelta,
                    longitudeDelta: longitudeDelta,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: latitude, longitude: longitude
                    }}
                    title="Nhà vợ tui"
                >

                </Marker>
            </MapView>
            <View style={styles.searchContainer}>
                <GooglePlacesAutocomplete
                    placeholder='Search'
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        console.log(data, details);
                    }}
                    query={{
                        key: GOOGLE_API_KEY,
                        language: 'en',
                    }}
                // currentLocation={true}
                // currentLocationLabel='Current location'
                />
            </View>
        </View>
    )
}

export default Map

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    mapContainer: {
        // height: '90%',
        // width: '100%'
    },
    searchContainer: {
        position: 'absolute',
        width: '90%',
        backgroundColor: colors.whiteColor,
        shadowColor: colors.blackColor,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 4,
        padding: 4,
        borderRadius: 8,
        top: 40
    },
})