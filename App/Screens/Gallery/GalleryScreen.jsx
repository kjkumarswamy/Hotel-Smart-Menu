import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import Colors from '../../Utils/Colors';
import { Ionicons } from '@expo/vector-icons';

const amenities = [
    {
        id: '1',
        title: 'Hotel Rooms',
        description: 'Luxurious rooms with modern amenities, comfortable beds, and stunning views. Perfect for both business and leisure travelers.',
        image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=500&auto=format',
        icon: 'bed-outline'
    },
    {
        id: '2',
        title: 'Function Hall',
        description: 'Elegant banquet halls for weddings, conferences, and special events. Fully equipped with modern audio-visual facilities.',
        image: 'https://www.hamaraevent.com/uploads/blog/0025794001498626738.jpg',
        icon: 'business-outline'
    },
    {
        id: '3',
        title: 'Swimming Pool',
        description: 'Temperature-controlled infinity pool with panoramic views. Separate kids pool and lounging area available.',
        image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=500&auto=format',
        icon: 'water-outline'
    },
    {
        id: '4',
        title: 'Gym',
        description: 'State-of-the-art fitness center with modern equipment. Personal trainers available on request.',
        image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=500&auto=format',
        icon: 'barbell-outline'
    },
    {
        id: '5',
        title: 'Bar',
        description: 'Sophisticated bar offering premium spirits, signature cocktails, and an extensive wine collection.',
        image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=500&auto=format',
        icon: 'wine-outline'
    },
    {
        id: '6',
        title: 'Hotel Garden',
        description: 'Beautifully landscaped gardens perfect for outdoor events and peaceful morning walks.',
        image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=500&auto=format',
        icon: 'flower-outline'
    },
    {
        id: '7',
        title: 'Spa',
        description: 'Rejuvenating spa treatments and massages by expert therapists. Experience ultimate relaxation.',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500&auto=format',
        icon: 'leaf-outline'
    },
    {
        id: '8',
        title: 'Restaurant',
        description: 'Multi-cuisine restaurant serving delectable dishes from around the world. 24/7 dining available.',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format',
        icon: 'restaurant-outline'
    },
    {
        id: '9',
        title: 'Kids Play Area',
        description: 'Safe and entertaining play area for children with supervision and various activities.',
        image: 'https://media-cdn.tripadvisor.com/media/photo-s/06/e3/70/f4/kids-play-zone.jpg',
        icon: 'game-controller-outline'
    }
];

const { width } = Dimensions.get('window');
const cardWidth = width - 32; // Full width - padding

export default function GalleryScreen({ navigation }) {
    const renderAmenityCard = ({ item }) => (
        <TouchableOpacity 
            style={styles.card}
            onPress={() => {
                if (item.title === 'Hotel Rooms') {
                    navigation.navigate('HotelRooms');
                } else if (item.title === 'Swimming Pool') {
                    navigation.navigate('SwimmingPool');
                } else if (item.title === 'Gym') {
                    navigation.navigate('Gym');
                } else if (item.title === 'Function Hall') {
                    navigation.navigate('FunctionHall');
                }
            }}
        >
            <Image
                source={{ uri: item.image }}
                style={styles.cardImage}
                resizeMode="cover"
            />
            <View style={styles.cardContent}>
                <View style={styles.titleContainer}>
                    <Ionicons name={item.icon} size={24} color={Colors.PRIMARY} />
                    <Text style={styles.cardTitle}>{item.title}</Text>
                </View>
                <Text style={styles.cardDescription}>{item.description}</Text>
                <TouchableOpacity 
                    style={styles.learnMoreButton}
                    onPress={() => {
                        if (item.title === 'Hotel Rooms') {
                            navigation.navigate('HotelRooms');
                        } else if (item.title === 'Swimming Pool') {
                            navigation.navigate('SwimmingPool');
                        } else if (item.title === 'Gym') {
                            navigation.navigate('Gym');
                        } else if (item.title === 'Function Hall') {
                            navigation.navigate('FunctionHall');
                        }
                    }}
                >
                    <Text style={styles.learnMoreText}>Learn More</Text>
                    <Ionicons name="arrow-forward" size={16} color={Colors.PRIMARY} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Hotel Amenities</Text>
            <Text style={styles.headerSubtitle}>Discover our world-class facilities</Text>
            <FlatList
                data={amenities}
                renderItem={renderAmenityCard}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
        padding: 16,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.BLACK,
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 16,
        color: Colors.GREY,
        marginBottom: 20,
    },
    listContainer: {
        paddingBottom: 20,
    },
    card: {
        width: cardWidth,
        backgroundColor: Colors.WHITE,
        borderRadius: 15,
        marginBottom: 20,
        elevation: 3,
        shadowColor: Colors.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        overflow: 'hidden',
    },
    cardImage: {
        width: '100%',
        height: 200,
    },
    cardContent: {
        padding: 16,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.BLACK,
        marginLeft: 8,
    },
    cardDescription: {
        fontSize: 14,
        color: Colors.GREY,
        lineHeight: 20,
        marginBottom: 12,
    },
    learnMoreButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    learnMoreText: {
        color: Colors.PRIMARY,
        fontSize: 14,
        fontWeight: 'bold',
        marginRight: 4,
    },
}); 