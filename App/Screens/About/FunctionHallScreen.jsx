import React, { useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    Image, 
    TouchableOpacity, 
    FlatList,
    Modal,
    Alert,
    StatusBar,
    Dimensions
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../Utils/Colors';

const { width } = Dimensions.get('window');

// Sample function hall data
const functionHalls = [
    {
        id: '1',
        name: 'Grand Ballroom',
        description: 'Our largest function hall perfect for grand weddings, corporate events, and large gatherings. Features elegant chandeliers, modern sound system, and a spacious dance floor.',
        capacity: '500-1000 guests',
        area: '5000 sq ft',
        price: '₹50,000',
        images: [
            'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&auto=format',
            'https://images.unsplash.com/photo-1511795409834-432f7b1728d2?w=800&auto=format',
            'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&auto=format'
        ],
        facilities: [
            'Professional Sound System',
            'LED Lighting',
            'Air Conditioning',
            'VIP Lounge',
            'Catering Kitchen',
            'Stage Setup',
            'Dance Floor',
            'Parking Space'
        ]
    },
    {
        id: '2',
        name: 'Royal Banquet Hall',
        description: 'An elegant space designed for intimate weddings, birthday parties, and corporate meetings. Features modern amenities and sophisticated decor.',
        capacity: '200-300 guests',
        area: '2000 sq ft',
        price: '₹30,000',
        images: [
            'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&auto=format',
            'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&auto=format',
            'https://images.unsplash.com/photo-1511795409834-432f7b1728d2?w=800&auto=format'
        ],
        facilities: [
            'Basic Sound System',
            'Ambient Lighting',
            'Air Conditioning',
            'Bar Counter',
            'Buffet Setup Area',
            'Stage',
            'Dance Floor',
            'Valet Parking'
        ]
    },
    {
        id: '3',
        name: 'Executive Conference Hall',
        description: 'A professional space equipped with state-of-the-art technology for business meetings, conferences, and seminars.',
        capacity: '50-100 guests',
        area: '1000 sq ft',
        price: '₹20,000',
        images: [
            'https://images.unsplash.com/photo-1511795409834-432f7b1728d2?w=800&auto=format',
            'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&auto=format',
            'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&auto=format'
        ],
        facilities: [
            'Projector & Screen',
            'Video Conferencing',
            'Wi-Fi',
            'Air Conditioning',
            'Coffee Station',
            'Whiteboard',
            'Conference Tables',
            'Business Center Access'
        ]
    }
];

export default function FunctionHallScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const [selectedHall, setSelectedHall] = useState(null);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const handleHallSelect = (hall) => {
        setSelectedHall(hall);
        setActiveImageIndex(0);
    };

    const handleBooking = () => {
        Alert.alert(
            'Booking Request',
            'Your booking request has been sent. Our team will contact you shortly to confirm the details.',
            [
                {
                    text: 'OK',
                    onPress: () => setShowBookingModal(false)
                }
            ]
        );
    };

    const renderHallCard = ({ item }) => (
        <TouchableOpacity 
            style={styles.card}
            onPress={() => handleHallSelect(item)}
        >
            <Image
                source={{ uri: item.images[0] }}
                style={styles.cardImage}
                resizeMode="cover"
            />
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>
                <View style={styles.cardDetails}>
                    <View style={styles.detailItem}>
                        <Ionicons name="people-outline" size={16} color={Colors.PRIMARY} />
                        <Text style={styles.detailText}>{item.capacity}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Ionicons name="resize-outline" size={16} color={Colors.PRIMARY} />
                        <Text style={styles.detailText}>{item.area}</Text>
                    </View>
                </View>
                <Text style={styles.priceText}>{item.price}</Text>
                <TouchableOpacity 
                    style={styles.bookButton}
                    onPress={() => {
                        setSelectedHall(item);
                        setShowBookingModal(true);
                    }}
                >
                    <Text style={styles.bookButtonText}>Book Now</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    const renderBookingModal = () => (
        <Modal
            visible={showBookingModal}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setShowBookingModal(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Book {selectedHall?.name}</Text>
                        <TouchableOpacity onPress={() => setShowBookingModal(false)}>
                            <Ionicons name="close" size={24} color={Colors.BLACK} />
                        </TouchableOpacity>
                    </View>
                    
                    <ScrollView style={styles.modalBody}>
                        <Text style={styles.modalDescription}>
                            {selectedHall?.description}
                        </Text>
                        
                        <Text style={styles.sectionTitle}>Facilities</Text>
                        <View style={styles.facilitiesContainer}>
                            {selectedHall?.facilities.map((facility, index) => (
                                <View key={index} style={styles.facilityItem}>
                                    <Ionicons name="checkmark-circle" size={16} color={Colors.PRIMARY} />
                                    <Text style={styles.facilityText}>{facility}</Text>
                                </View>
                            ))}
                        </View>
                        
                        <Text style={styles.sectionTitle}>Gallery</Text>
                        <View style={styles.galleryContainer}>
                            {selectedHall?.images.map((image, index) => (
                                <TouchableOpacity 
                                    key={index}
                                    onPress={() => setActiveImageIndex(index)}
                                >
                                    <Image
                                        source={{ uri: image }}
                                        style={[
                                            styles.galleryImage,
                                            activeImageIndex === index && styles.activeGalleryImage
                                        ]}
                                        resizeMode="cover"
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                        
                        <Image
                            source={{ uri: selectedHall?.images[activeImageIndex] }}
                            style={styles.mainImage}
                            resizeMode="cover"
                        />
                    </ScrollView>
                    
                    <TouchableOpacity 
                        style={styles.confirmButton}
                        onPress={handleBooking}
                    >
                        <Text style={styles.confirmButtonText}>Confirm Booking</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent={true}
            />
            
            <FlatList
                data={functionHalls}
                renderItem={renderHallCard}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
            
            {renderBookingModal()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: Colors.PRIMARY,
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.WHITE,
    },
    headerSubtitle: {
        fontSize: 16,
        color: Colors.GREY,
        marginBottom: 20,
    },
    placeholder: {
        width: 40,
    },
    listContainer: {
        padding: 16,
    },
    card: {
        backgroundColor: Colors.WHITE,
        borderRadius: 12,
        marginBottom: 16,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    cardImage: {
        width: '100%',
        height: 200,
    },
    cardContent: {
        padding: 16,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: Colors.BLACK,
    },
    cardDescription: {
        fontSize: 14,
        color: Colors.GREY,
        marginBottom: 12,
        lineHeight: 20,
    },
    cardDetails: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    detailText: {
        fontSize: 14,
        color: Colors.BLACK,
        marginLeft: 4,
    },
    priceText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.PRIMARY,
        marginBottom: 12,
    },
    bookButton: {
        backgroundColor: Colors.PRIMARY,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    bookButtonText: {
        color: Colors.WHITE,
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        maxHeight: '80%',
        backgroundColor: Colors.WHITE,
        borderRadius: 12,
        overflow: 'hidden',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.LIGHT_GREY,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.BLACK,
    },
    modalBody: {
        padding: 16,
    },
    modalDescription: {
        fontSize: 14,
        color: Colors.BLACK,
        marginBottom: 16,
        lineHeight: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.BLACK,
        marginBottom: 12,
    },
    facilitiesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 16,
    },
    facilityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%',
        marginBottom: 8,
    },
    facilityText: {
        fontSize: 14,
        color: Colors.BLACK,
        marginLeft: 8,
    },
    galleryContainer: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    galleryImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 8,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    activeGalleryImage: {
        borderColor: Colors.PRIMARY,
    },
    mainImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 16,
    },
    confirmButton: {
        backgroundColor: Colors.PRIMARY,
        padding: 16,
        alignItems: 'center',
    },
    confirmButtonText: {
        color: Colors.WHITE,
        fontSize: 16,
        fontWeight: 'bold',
    },
}); 