import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, FlatList } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const AMENITIES = [
  { icon: 'wifi', label: 'Free WiFi' },
  { icon: 'car', label: 'Free Parking' },
  { icon: 'dumbbell', label: 'Fitness Center', fa: true },
  { icon: 'restaurant', label: 'Restaurant' },
];

const GALLERY = [
  { image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=500&auto=format', caption: 'Hotel Rooms' },
  { image: 'https://www.hamaraevent.com/uploads/blog/0025794001498626738.jpg', caption: 'Function Hall' },
  { image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=500&auto=format', caption: 'Swimming Pool' },
  { image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=500&auto=format', caption: 'Garden View' },
  { image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format', caption: 'Restaurant' },  
];

export default function AboutHotelScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      <Image
        source={{ uri: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/21/20/c9/facadenight.jpg?w=1200&h=-1&s=1' }}
        style={styles.banner}
        resizeMode="cover"
      />
      <View style={styles.section}>
        <Text style={styles.hotelName}>Hotel Royal</Text>
        <View style={styles.ratingRow}>
          {[...Array(5)].map((_, i) => (
            <Ionicons key={i} name="star" size={20} color="#FFD700" />
          ))}
          <Text style={styles.ratingText}>(5.0)</Text>
        </View>
        <Text style={styles.description}>
          Welcome to Hotel Royal, where luxury meets comfort. Nestled in the heart of the city, our 5-star establishment offers an unparalleled hospitality experience. With our world-class amenities, exquisite dining options, and impeccable service, we ensure your stay is nothing short of extraordinary.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Amenities</Text>
        <View style={styles.amenitiesRow}>
          {AMENITIES.map((item, idx) => (
            <View key={idx} style={styles.amenityItem}>
              {item.fa ? (
                <FontAwesome5 name={item.icon} size={22} color="#8E3FFF" />
              ) : (
                <Ionicons name={item.icon} size={22} color="#8E3FFF" />
              )}
              <Text style={styles.amenityLabel}>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Gallery</Text>
        <FlatList
          data={GALLERY}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.caption}
          renderItem={({ item }) => (
            <View style={styles.galleryItem}>
              <Image source={{ uri: item.image }} style={styles.galleryImage} />
              <Text style={styles.galleryCaption}>{item.caption}</Text>
            </View>
          )}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Us</Text>
        <View style={styles.contactRow}>
          <Ionicons name="call-outline" size={20} color="#8E3FFF" style={styles.contactIcon} />
          <Text style={styles.contactText}>+91 9876543210</Text>
        </View>
        <View style={styles.contactRow}>
          <MaterialIcons name="email" size={20} color="#8E3FFF" style={styles.contactIcon} />
          <Text style={styles.contactText}>info@hotelroyal.com</Text>
        </View>
        <View style={styles.contactRow}>
          <Ionicons name="location-outline" size={20} color="#8E3FFF" style={styles.contactIcon} />
          <Text style={styles.contactText}>123 Royal Street, City Center, State - 123456</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  banner: {
    width: '100%',
    height: 180,
  },
  section: {
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  hotelName: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#111',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    marginLeft: 6,
    color: '#888',
    fontSize: 15,
  },
  description: {
    color: '#555',
    fontSize: 15,
    marginBottom: 10,
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#111',
  },
  amenitiesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 18,
    marginBottom: 10,
  },
  amenityLabel: {
    marginLeft: 6,
    color: '#555',
    fontSize: 15,
  },
  galleryItem: {
    marginRight: 16,
    alignItems: 'center',
    width: 130,
  },
  galleryImage: {
    width: 120,
    height: 80,
    borderRadius: 10,
    marginBottom: 4,
  },
  galleryCaption: {
    fontSize: 13,
    color: '#444',
    textAlign: 'center',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactIcon: {
    marginRight: 10,
  },
  contactText: {
    fontSize: 15,
    color: '#333',
  },
}); 