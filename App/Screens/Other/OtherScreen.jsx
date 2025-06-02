import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../Utils/Colors';

const hotelImages = [
    {
        id: '1',
        image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/17173834.jpg?k=12f1ddb10a63b407ad34a677c3b9e816b193bcf569c3c2467e777f3800398287&o=&hp=1',
        title: 'Hotel Exterior'
    },
    {
        id: '2',
        image: 'https://media.istockphoto.com/id/838103468/photo/interior-view-of-gorgeous-hotel.jpg?s=612x612&w=0&k=20&c=peSg1FxZfAonlNQlB_4Pu-d-4T60imo_YkvmVWMTbYI=',
        title: 'Luxury Lobby'
    },
    {
        id: '3',
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
        title: 'Swimming Pool'
    },
    
    {
        id: '4',
        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800',
        title: 'Luxury Rooms'
    },
    {
        id: '5',
        image: 'https://www.itchotels.com/content/dam/itchotels/in/umbrella/global-offers/all-in-getaways.jpg',
        title: 'Garden View'
    },
    {
        id: '6',
        image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800',
        title: 'rooftop swimming pools'
    },
];

export default function AboutHotelScreen() {
    const insets = useSafeAreaInsets();

    const handleCall = () => {
        Linking.openURL('tel:+91 9876543210');
    };

    const handleEmail = () => {
        Linking.openURL('mailto:info@hotelroyal.com');
    };

    const handleDirections = () => {
        Linking.openURL('https://maps.google.com/?q=Hotel+Royal');
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent={true}
            />
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {/* Main Hotel Image */}
                <Image
                    source={{ uri: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/21/20/c9/facadenight.jpg?w=1200&h=-1&s=1' }}
                    style={styles.mainImage}
                />
                
                {/* Hotel Name and Rating */}
                <View style={styles.headerContainer}>
                    <Text style={styles.hotelName}>Hotel Royal</Text>
                    <View style={styles.ratingContainer}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Ionicons 
                                key={star} 
                                name="star" 
                                size={20} 
                                color="#FFD700"
                                style={styles.starIcon}
                            />
                        ))}
                        <Text style={styles.ratingText}>(5.0)</Text>
                    </View>
                </View>

                {/* Hotel Description */}
                <Text style={styles.description}>
                    Welcome to Hotel Royal, where luxury meets comfort. Nestled in the heart of the city, 
                    our 5-star establishment offers an unparalleled hospitality experience. With our world-class 
                    amenities, exquisite dining options, and impeccable service, we ensure your stay is nothing 
                    short of extraordinary.
                </Text>

                {/* Hotel Features */}
                <View style={styles.featuresContainer}>
                    <Text style={styles.sectionTitle}>Our Amenities</Text>
                    <View style={styles.featuresList}>
                        <View style={styles.featureItem}>
                            <Ionicons name="wifi" size={24} color={Colors.PRIMARY} />
                            <Text style={styles.featureText}>Free WiFi</Text>
                        </View>
                        <View style={styles.featureItem}>
                            <Ionicons name="car" size={24} color={Colors.PRIMARY} />
                            <Text style={styles.featureText}>Free Parking</Text>
                        </View>
                        <View style={styles.featureItem}>
                            <Ionicons name="fitness" size={24} color={Colors.PRIMARY} />
                            <Text style={styles.featureText}>Fitness Center</Text>
                        </View>
                        <View style={styles.featureItem}>
                            <Ionicons name="restaurant" size={24} color={Colors.PRIMARY} />
                            <Text style={styles.featureText}>Restaurant</Text>
                        </View>
                    </View>
                </View>

                {/* Hotel Images Gallery */}
                <Text style={styles.sectionTitle}>Gallery</Text>
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    style={styles.galleryContainer}
                >
                    {hotelImages.map((item) => (
                        <View key={item.id} style={styles.galleryItem}>
                            <Image
                                source={{ uri: item.image }}
                                style={styles.galleryImage}
                            />
                            <Text style={styles.galleryTitle}>{item.title}</Text>
                        </View>
                    ))}
                </ScrollView>

                {/* Contact Information */}
                <View style={styles.contactContainer}>
                    <Text style={styles.sectionTitle}>Contact Us</Text>
                    
                    <TouchableOpacity style={styles.contactItem} onPress={handleCall}>
                        <Ionicons name="call" size={24} color={Colors.PRIMARY} />
                        <Text style={styles.contactText}>+91 9876543210</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.contactItem} onPress={handleEmail}>
                        <Ionicons name="mail" size={24} color={Colors.PRIMARY} />
                        <Text style={styles.contactText}>info@hotelroyal.com</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.contactItem} onPress={handleDirections}>
                        <Ionicons name="location" size={24} color={Colors.PRIMARY} />
                        <Text style={styles.contactText}>
                            123 Royal Street, City Center,{'\n'}
                            State - 123456
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    mainImage: {
        width: '100%',
        height: 250,
        resizeMode: 'cover',
    },
    headerContainer: {
        padding: 16,
        backgroundColor: Colors.WHITE,
        borderBottomWidth: 1,
        borderBottomColor: Colors.LIGHT_GREY,
    },
    hotelName: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.BLACK,
        marginBottom: 8,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    starIcon: {
        marginRight: 2,
    },
    ratingText: {
        fontSize: 16,
        color: Colors.GREY,
        marginLeft: 4,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: Colors.GREY,
        padding: 16,
        textAlign: 'justify',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.BLACK,
        padding: 16,
        paddingBottom: 8,
    },
    featuresContainer: {
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.LIGHT_GREY,
    },
    featuresList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 8,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%',
        padding: 8,
    },
    featureText: {
        marginLeft: 8,
        fontSize: 16,
        color: Colors.GREY,
    },
    galleryContainer: {
        paddingLeft: 16,
        marginBottom: 16,
    },
    galleryItem: {
        marginRight: 16,
        width: 200,
    },
    galleryImage: {
        width: 200,
        height: 150,
        borderRadius: 10,
    },
    galleryTitle: {
        fontSize: 14,
        color: Colors.GREY,
        marginTop: 8,
    },
    contactContainer: {
        paddingBottom: 24,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    contactText: {
        fontSize: 16,
        color: Colors.GREY,
        marginLeft: 12,
    },
}); 