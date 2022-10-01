import { StyleSheet } from 'react-native'
import React, { useEffect, useRef } from 'react'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import tw from 'twrnc';
import { selectDestination, selectOrigin } from '../slices/navSlice';
import { useSelector } from 'react-redux';
import MapViewDirections from 'react-native-maps-directions';

const Map = () => {

  const GOOGLE_MAPS_APIKEY = "AIzaSyA3T1EsFDM4ef7ftxoYm_yTUx4L7lEf3KM"
  const origin = useSelector(selectOrigin)
  const destination = useSelector(selectDestination)

  const mapRef = useRef(null);
  const inputEl = useRef();

  useEffect(() => {
    if (origin && destination) {
      mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 }
      })
    }
  }, [destination])

  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1`}
      provider={PROVIDER_GOOGLE}
      region={{
        latitude: origin.latitude,
        longitude: origin.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      zoomEnabled={true}
      showsUserLocation={true}
    >
      {origin && destination && (
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="black"
        />)}
      {origin && <Marker
        coordinate={{
          latitude: origin.latitude,
          longitude: origin.longitude,
        }}
        title="Origin"
        description={origin.description}
        identifier="origin"
      />
      }
      {destination && <Marker
        coordinate={{
          latitude: destination.latitude,
          longitude: destination.longitude,
        }}
        title="Destination"
        description={destination.description}
        identifier="destination"
      />}
    </MapView>
  )
}

export default Map

const styles = StyleSheet.create({})