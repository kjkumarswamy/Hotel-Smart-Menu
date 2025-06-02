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
    StatusBar
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../Utils/Colors';
// import { StatusBar } from 'react-native';

// Sample room data
const rooms = [
    {
        id: '1',
        name: 'Deluxe Room',
        description: 'Spacious room with city view, perfect for couples or solo travelers.',
        price: 2500,
        size: '32 sqm',
        occupancy: '2 Adults',
        bedType: 'King Size Bed',
        images: [
            'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
            'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
            'https://images.unsplash.com/photo-1587985064135-0366536eab42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80'
        ],
        facilities: [
            'Air Conditioning',
            'Free Wi-Fi',
            'Mini Bar',
            'Room Service',
            'TV with Cable Channels',
            'Private Bathroom',
            'Hair Dryer',
            'Safe'
        ]
    },
    {
        id: '2',
        name: 'Executive Suite',
        description: 'Luxury suite with separate living area and premium amenities.',
        price: 4500,
        size: '48 sqm',
        occupancy: '2 Adults + 1 Child',
        bedType: 'King Size Bed + Sofa Bed',
        images: [
            'https://images.unsplash.com/photo-1590490359683-658d3d23f972?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
            'https://images.unsplash.com/photo-1590490359683-658d3d23f972?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
            'https://images.unsplash.com/photo-1590490359683-658d3d23f972?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        ],
        facilities: [
            'Air Conditioning',
            'Free Wi-Fi',
            'Mini Bar',
            'Room Service',
            'TV with Cable Channels',
            'Private Bathroom',
            'Hair Dryer',
            'Safe',
            'Separate Living Area',
            'Work Desk',
            'Premium Toiletries',
            'Welcome Drink'
        ]
    },
    {
        id: '3',
        name: 'Presidential Suite',
        description: 'Ultimate luxury with panoramic views, butler service, and exclusive amenities.',
        price: 12000,
        size: '85 sqm',
        occupancy: '4 Adults',
        bedType: 'King Size Bed + 2 Single Beds',
        images: [
            'https://images.unsplash.com/photo-1590490359683-658d3d23f972?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
            'https://images.unsplash.com/photo-1590490359683-658d3d23f972?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
            'https://images.unsplash.com/photo-1590490359683-658d3d23f972?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        ],
        facilities: [
            'Air Conditioning',
            'Free Wi-Fi',
            'Mini Bar',
            'Room Service',
            'TV with Cable Channels',
            'Private Bathroom',
            'Hair Dryer',
            'Safe',
            'Separate Living Area',
            'Work Desk',
            'Premium Toiletries',
            'Welcome Drink',
            'Butler Service',
            'Private Balcony',
            'Jacuzzi',
            'Dining Area',
            'Lounge Area',
            'Panoramic Views'
        ]
    }
];

export default function HotelRoomsScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [bookingDetails, setBookingDetails] = useState({
        checkIn: '',
        checkOut: '',
        guests: 1,
        specialRequests: ''
    });

    // Hide status bar
    // React.useEffect(() => {
    //     StatusBar.setHidden(true);
        
    //     // Restore status bar when component unmounts
    //     return () => {
    //         StatusBar.setHidden(false);
    //     };
    // }, []);

    const handleRoomSelect = (room) => {
        setSelectedRoom(room);
        setShowBookingModal(true);
    };

    const handleBooking = () => {
        // In a real app, this would send the booking to a server
        Alert.alert(
            'Booking Confirmed',
            `Your booking for ${selectedRoom.name} has been confirmed. Check-in: ${bookingDetails.checkIn || 'Not specified'}, Check-out: ${bookingDetails.checkOut || 'Not specified'}`,
            [
                {
                    text: 'OK',
                    onPress: () => {
                        setShowBookingModal(false);
                        setSelectedRoom(null);
                    }
                }
            ]
        );
    };

    const renderRoomCard = ({ item }) => (
        <View style={styles.roomCard}>
            <Image source={{ uri: item.images[0] }} style={styles.roomImage} />
            <View style={styles.roomInfo}>
                <Text style={styles.roomName}>{item.name}</Text>
                <Text style={styles.roomDescription} numberOfLines={2}>{item.description}</Text>
                <View style={styles.roomDetails}>
                    <View style={styles.roomDetail}>
                        <Ionicons name="people-outline" size={16} color={Colors.GREY} />
                        <Text style={styles.roomDetailText}>{item.occupancy}</Text>
                    </View>
                    <View style={styles.roomDetail}>
                        <Ionicons name="bed-outline" size={16} color={Colors.GREY} />
                        <Text style={styles.roomDetailText}>{item.bedType}</Text>
                    </View>
                    <View style={styles.roomDetail}>
                        <Ionicons name="resize-outline" size={16} color={Colors.GREY} />
                        <Text style={styles.roomDetailText}>{item.size}</Text>
                    </View>
                </View>
                <View style={styles.roomFooter}>
                    <Text style={styles.roomPrice}>₹{item.price}<Text style={styles.perNight}>/night</Text></Text>
                    <TouchableOpacity 
                        style={styles.bookButton}
                        onPress={() => handleRoomSelect(item)}
                    >
                        <Text style={styles.bookButtonText}>Book Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
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
                        <Text style={styles.modalTitle}>Book {selectedRoom?.name}</Text>
                        <TouchableOpacity onPress={() => setShowBookingModal(false)}>
                            <Ionicons name="close" size={24} color={Colors.BLACK} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.bookingForm}>
                        <View style={styles.bookingImageContainer}>
                            <Image source={{ uri: selectedRoom?.images[0] }} style={styles.bookingImage} />
                        </View>

                        <View style={styles.bookingDetails}>
                            <Text style={styles.bookingPrice}>₹{selectedRoom?.price}<Text style={styles.perNight}>/night</Text></Text>
                            <Text style={styles.bookingDescription}>{selectedRoom?.description}</Text>
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.formLabel}>Check-in Date</Text>
                            <TouchableOpacity style={styles.dateInput}>
                                <Text style={styles.dateInputText}>
                                    {bookingDetails.checkIn || 'Select Date'}
                                </Text>
                                <Ionicons name="calendar-outline" size={20} color={Colors.PRIMARY} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.formLabel}>Check-out Date</Text>
                            <TouchableOpacity style={styles.dateInput}>
                                <Text style={styles.dateInputText}>
                                    {bookingDetails.checkOut || 'Select Date'}
                                </Text>
                                <Ionicons name="calendar-outline" size={20} color={Colors.PRIMARY} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.formLabel}>Number of Guests</Text>
                            <View style={styles.guestsInput}>
                                <TouchableOpacity 
                                    style={styles.guestButton}
                                    onPress={() => setBookingDetails({
                                        ...bookingDetails,
                                        guests: Math.max(1, bookingDetails.guests - 1)
                                    })}
                                >
                                    <Ionicons name="remove" size={20} color={Colors.PRIMARY} />
                                </TouchableOpacity>
                                <Text style={styles.guestsText}>{bookingDetails.guests}</Text>
                                <TouchableOpacity 
                                    style={styles.guestButton}
                                    onPress={() => setBookingDetails({
                                        ...bookingDetails,
                                        guests: Math.min(4, bookingDetails.guests + 1)
                                    })}
                                >
                                    <Ionicons name="add" size={20} color={Colors.PRIMARY} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.formLabel}>Special Requests</Text>
                            <View style={styles.textAreaContainer}>
                                <Text style={styles.textAreaPlaceholder}>
                                    Any special requests or requirements?
                                </Text>
                            </View>
                        </View>

                        <View style={styles.facilitiesContainer}>
                            <Text style={styles.facilitiesTitle}>Room Facilities</Text>
                            <View style={styles.facilitiesList}>
                                {selectedRoom?.facilities.map((facility, index) => (
                                    <View key={index} style={styles.facilityItem}>
                                        <Ionicons name="checkmark-circle" size={16} color={Colors.PRIMARY} />
                                        <Text style={styles.facilityText}>{facility}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
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
            {/* <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color={Colors.WHITE} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Hotel Rooms</Text>
                <View style={styles.placeholder} />
            </View> */}

            <FlatList
                data={rooms}
                renderItem={renderRoomCard}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.roomsList}
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
        paddingTop: 40,
        paddingBottom: 16,
        backgroundColor: Colors.PRIMARY,
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.WHITE,
    },
    placeholder: {
        width: 40,
    },
    roomsList: {
        padding: 16,
    },
    roomCard: {
        backgroundColor: Colors.WHITE,
        borderRadius: 12,
        marginBottom: 20,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    roomImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    roomInfo: {
        padding: 16,
    },
    roomName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    roomDescription: {
        fontSize: 14,
        color: Colors.GREY,
        marginBottom: 12,
    },
    roomDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    roomDetail: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    roomDetailText: {
        fontSize: 12,
        color: Colors.GREY,
        marginLeft: 4,
    },
    roomFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    roomPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.PRIMARY,
    },
    perNight: {
        fontSize: 12,
        color: Colors.GREY,
    },
    bookButton: {
        backgroundColor: Colors.PRIMARY,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    bookButtonText: {
        color: Colors.WHITE,
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
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    bookingForm: {
        maxHeight: '70%',
    },
    bookingImageContainer: {
        marginBottom: 16,
        borderRadius: 12,
        overflow: 'hidden',
    },
    bookingImage: {
        width: '100%',
        height: 180,
        resizeMode: 'cover',
    },
    bookingDetails: {
        marginBottom: 20,
    },
    bookingPrice: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.PRIMARY,
        marginBottom: 8,
    },
    bookingDescription: {
        fontSize: 14,
        color: Colors.GREY,
    },
    formGroup: {
        marginBottom: 16,
    },
    formLabel: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
    },
    dateInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.LIGHT_GREY,
        borderRadius: 8,
        padding: 12,
    },
    dateInputText: {
        fontSize: 16,
        color: Colors.BLACK,
    },
    guestsInput: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.LIGHT_GREY,
        borderRadius: 8,
        padding: 8,
    },
    guestButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: Colors.LIGHT_GREY,
        justifyContent: 'center',
        alignItems: 'center',
    },
    guestsText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginHorizontal: 16,
    },
    textAreaContainer: {
        borderWidth: 1,
        borderColor: Colors.LIGHT_GREY,
        borderRadius: 8,
        padding: 12,
        height: 100,
    },
    textAreaPlaceholder: {
        color: Colors.GREY,
    },
    facilitiesContainer: {
        marginBottom: 20,
    },
    facilitiesTitle: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 12,
    },
    facilitiesList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    facilityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%',
        marginBottom: 8,
    },
    facilityText: {
        fontSize: 14,
        marginLeft: 4,
    },
    confirmButton: {
        backgroundColor: Colors.PRIMARY,
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
    },
    confirmButtonText: {
        color: Colors.WHITE,
        fontSize: 18,
        fontWeight: 'bold',
    },
}); 