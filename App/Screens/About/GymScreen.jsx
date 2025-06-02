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

// Sample gym data
const gymAreas = [
    {
        id: '1',
        name: 'Main Fitness Area',
        description: 'Our state-of-the-art main fitness area features premium cardio and strength training equipment. With a spacious layout and natural lighting, it provides the perfect environment for your workout routine.',
        size: '500 sq.m',
        equipment: '50+ pieces',
        trainers: '5+ certified trainers',
        price: '₹1000 per month',
        images: [
            'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
            'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
            'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        ],
        facilities: [
            'Cardio Equipment',
            'Strength Training Machines',
            'Free Weights Area',
            'Functional Training Zone',
            'Personal Training',
            'Locker Rooms',
            'Shower Facilities',
            'Towel Service'
        ]
    },
    {
        id: '2',
        name: 'Yoga & Pilates Studio',
        description: 'A dedicated space for yoga, pilates, and meditation. Our studio offers a peaceful environment with natural elements and professional instructors for all levels of practice.',
        size: '200 sq.m',
        equipment: '20+ mats and props',
        trainers: '3+ certified instructors',
        price: '₹800 per month',
        images: [
            'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1120&q=80',
            'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1120&q=80',
            'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1120&q=80'
        ],
        facilities: [
            'Yoga Mats',
            'Pilates Equipment',
            'Meditation Space',
            'Group Classes',
            'Private Sessions',
            'Changing Rooms',
            'Shower Facilities',
            'Tea Corner'
        ]
    },
    {
        id: '3',
        name: 'CrossFit Zone',
        description: 'A high-intensity training area designed for functional fitness and CrossFit workouts. Equipped with specialized equipment for dynamic movements and group training sessions.',
        size: '300 sq.m',
        equipment: '30+ specialized pieces',
        trainers: '4+ CrossFit certified trainers',
        price: '₹1200 per month',
        images: [
            'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
            'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
            'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        ],
        facilities: [
            'Olympic Lifting Platforms',
            'Rowing Machines',
            'Gymnastics Equipment',
            'Boxes and Barriers',
            'Group WODs',
            'Personal Training',
            'Locker Rooms',
            'Shower Facilities'
        ]
    }
];

export default function GymScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const [selectedArea, setSelectedArea] = useState(null);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const handleAreaSelect = (area) => {
        setSelectedArea(area);
        setActiveImageIndex(0);
    };

    const handleBooking = () => {
        Alert.alert(
            'Membership Request',
            'Your membership request has been sent. Our team will contact you shortly to confirm the details and schedule an orientation session.',
            [
                {
                    text: 'OK',
                    onPress: () => setShowBookingModal(false)
                }
            ]
        );
    };

    const renderAreaCard = ({ item }) => (
        <TouchableOpacity 
            style={styles.card}
            onPress={() => handleAreaSelect(item)}
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
                        <Ionicons name="barbell-outline" size={16} color={Colors.PRIMARY} />
                        <Text style={styles.detailText}>{item.equipment}</Text>
                    </View>
                </View>
                <Text style={styles.priceText}>{item.price}</Text>
                <TouchableOpacity 
                    style={styles.bookButton}
                    onPress={() => {
                        setSelectedArea(item);
                        setShowBookingModal(true);
                    }}
                >
                    <Text style={styles.bookButtonText}>Join Now</Text>
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
                        <Text style={styles.modalTitle}>Join {selectedArea?.name}</Text>
                        <TouchableOpacity onPress={() => setShowBookingModal(false)}>
                            <Ionicons name="close" size={24} color={Colors.BLACK} />
                        </TouchableOpacity>
                    </View>
                    
                    <ScrollView style={styles.modalBody}>
                        <Text style={styles.modalDescription}>
                            {selectedArea?.description}
                        </Text>
                        
                        <Text style={styles.sectionTitle}>Facilities</Text>
                        <View style={styles.facilitiesContainer}>
                            {selectedArea?.facilities.map((facility, index) => (
                                <View key={index} style={styles.facilityItem}>
                                    <Ionicons name="checkmark-circle" size={16} color={Colors.PRIMARY} />
                                    <Text style={styles.facilityText}>{facility}</Text>
                                </View>
                            ))}
                        </View>
                        
                        <Text style={styles.sectionTitle}>Gallery</Text>
                        <View style={styles.galleryContainer}>
                            {selectedArea?.images.map((image, index) => (
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
                            source={{ uri: selectedArea?.images[activeImageIndex] }}
                            style={styles.mainImage}
                            resizeMode="cover"
                        />
                    </ScrollView>
                    
                    <TouchableOpacity 
                        style={styles.confirmButton}
                        onPress={handleBooking}
                    >
                        <Text style={styles.confirmButtonText}>Confirm Membership</Text>
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
                data={gymAreas}
                renderItem={renderAreaCard}
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