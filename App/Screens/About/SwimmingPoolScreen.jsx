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

// Sample swimming pool data
const swimmingPools = [
    {
        id: '1',
        name: 'Olympic Pool',
        description: 'Our flagship Olympic-sized swimming pool is perfect for serious swimmers and aquatic sports. With 8 lanes and professional timing systems, it meets international competition standards.',
        size: '50m x 25m',
        depth: '2m',
        temperature: '26-28°C',
        price: '₹500 per session',
        images: [
            'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
            'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
            'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        ],
        facilities: [
            '8 Competition Lanes',
            'Professional Timing System',
            'Starting Blocks',
            'Lifeguards on Duty',
            'Changing Rooms',
            'Lockers',
            'Shower Facilities',
            'Towel Service'
        ]
    },
    {
        id: '2',
        name: 'Recreation Pool',
        description: 'A family-friendly pool with a shallow area for children and a deeper section for adults. Perfect for recreational swimming and water activities.',
        size: '25m x 15m',
        depth: '0.9m - 1.8m',
        temperature: '28-30°C',
        price: '₹300 per session',
        images: [
            'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
            'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
            'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        ],
        facilities: [
            'Children\'s Area',
            'Water Slides',
            'Pool Toys Available',
            'Lifeguards on Duty',
            'Changing Rooms',
            'Lockers',
            'Shower Facilities',
            'Poolside Cafe'
        ]
    },
    {
        id: '3',
        name: 'Therapy Pool',
        description: 'A warm water therapy pool designed for rehabilitation, gentle exercise, and relaxation. Ideal for those recovering from injuries or seeking low-impact aquatic therapy.',
        size: '15m x 10m',
        depth: '1.2m',
        temperature: '32-34°C',
        price: '₹400 per session',
        images: [
            'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
            'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
            'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        ],
        facilities: [
            'Warm Water',
            'Handrails',
            'Accessibility Features',
            'Therapy Equipment',
            'Private Changing Rooms',
            'Lockers',
            'Shower Facilities',
            'Trained Staff'
        ]
    }
];

export default function SwimmingPoolScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const [selectedPool, setSelectedPool] = useState(null);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const handlePoolSelect = (pool) => {
        setSelectedPool(pool);
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

    const renderPoolCard = ({ item }) => (
        <TouchableOpacity 
            style={styles.card}
            onPress={() => handlePoolSelect(item)}
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
                        <Ionicons name="resize-outline" size={16} color={Colors.PRIMARY} />
                        <Text style={styles.detailText}>{item.size}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Ionicons name="thermometer-outline" size={16} color={Colors.PRIMARY} />
                        <Text style={styles.detailText}>{item.temperature}</Text>
                    </View>
                </View>
                <Text style={styles.priceText}>{item.price}</Text>
                <TouchableOpacity 
                    style={styles.bookButton}
                    onPress={() => {
                        setSelectedPool(item);
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
                        <Text style={styles.modalTitle}>Book {selectedPool?.name}</Text>
                        <TouchableOpacity onPress={() => setShowBookingModal(false)}>
                            <Ionicons name="close" size={24} color={Colors.BLACK} />
                        </TouchableOpacity>
                    </View>
                    
                    <ScrollView style={styles.modalBody}>
                        <Text style={styles.modalDescription}>
                            {selectedPool?.description}
                        </Text>
                        
                        <Text style={styles.sectionTitle}>Facilities</Text>
                        <View style={styles.facilitiesContainer}>
                            {selectedPool?.facilities.map((facility, index) => (
                                <View key={index} style={styles.facilityItem}>
                                    <Ionicons name="checkmark-circle" size={16} color={Colors.PRIMARY} />
                                    <Text style={styles.facilityText}>{facility}</Text>
                                </View>
                            ))}
                        </View>
                        
                        <Text style={styles.sectionTitle}>Gallery</Text>
                        <View style={styles.galleryContainer}>
                            {selectedPool?.images.map((image, index) => (
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
                            source={{ uri: selectedPool?.images[activeImageIndex] }}
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
                data={swimmingPools}
                renderItem={renderPoolCard}
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
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.WHITE,
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