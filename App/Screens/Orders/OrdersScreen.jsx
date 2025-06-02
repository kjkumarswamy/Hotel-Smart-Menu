import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, SectionList, Modal, ScrollView, StatusBar, TextInput, Linking, Image, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '../../Utils/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../Context/CartContext';
// import { StatusBar } from 'react-native';

// StarRating component for rating items
const StarRating = ({ rating, size = 16, showText = true, onRatingChange, interactive = false }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <TouchableOpacity 
                key={i} 
                onPress={() => interactive && onRatingChange(i)}
                disabled={!interactive}
            >
                <Ionicons
                    name={i <= rating ? "star" : "star-outline"}
                    size={size}
                    color={i <= rating ? "#FFD700" : Colors.GREY}
                    style={{ marginRight: 2 }}
                />
            </TouchableOpacity>
        );
    }
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {stars}
            {showText && (
                <Text style={{ marginLeft: 5, color: Colors.GREY, fontSize: 12 }}>
                    ({rating?.toFixed(1)})
                </Text>
            )}
        </View>
    );
};

export default function OrdersScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const { cart, updateCart, submittedOrders, submitOrder, clearSubmittedOrders } = useCart();
    const [activeTab, setActiveTab] = useState('current'); // 'current' or 'history'
    const [timeRemaining, setTimeRemaining] = useState({});
    const [showBillModal, setShowBillModal] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
    const [showEmailOptions, setShowEmailOptions] = useState(false);
    
    // New state for ratings and feedback
    const [itemRatings, setItemRatings] = useState({});
    const [itemFeedback, setItemFeedback] = useState({});
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [feedbackText, setFeedbackText] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [showImagePreview, setShowImagePreview] = useState(false);
    const [specialRequirements, setSpecialRequirements] = useState('');

    // Add useEffect to set activeTab to 'current' when screen is focused
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setActiveTab('current');
        });

        return unsubscribe;
    }, [navigation]);

    // Update countdown timers every second
    useEffect(() => {
        const timer = setInterval(() => {
            const newTimeRemaining = {};
            
            submittedOrders.forEach(order => {
                order.items.forEach(item => {
                    if (item.prepEndTime) {
                        const endTime = new Date(item.prepEndTime).getTime();
                        const now = new Date().getTime();
                        const remaining = Math.max(0, endTime - now);
                        
                        // Store the remaining time in milliseconds
                        newTimeRemaining[`${order.id}-${item.id}`] = remaining;
                    }
                });
            });
            
            setTimeRemaining(newTimeRemaining);
        }, 1000);
        
        return () => clearInterval(timer);
    }, [submittedOrders]);

    // Format remaining time as MM:SS
    const formatTimeRemaining = (ms) => {
        if (ms <= 0) return 'Ready!';
        
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const calculateTotal = (items) => {
        return items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    const handleSubmitOrder = () => {
        if (cart.length === 0) {
            Alert.alert('Error', 'Your cart is empty');
            return;
        }

        // Ensure cart items have all required properties
        const cartItems = cart.map(item => ({
            ...item,
            id: item.id || Date.now().toString(),
            name: item.name || 'Unknown Item',
            price: item.price || 0,
            quantity: item.quantity || 1,
            image: item.image || 'https://via.placeholder.com/150'
        }));

        // Pass only the cart items to the submitOrder function
        // The CartContext will create the order object with timestamp and ID
        submitOrder(cartItems);
        
        // Clear the cart using the context function
        updateCart([]);
        setSpecialRequirements('');
        
        // Switch to Order History tab
        setActiveTab('history');
        
        Alert.alert('Success', 'Your order has been submitted');
    };

    const handleDeleteItem = (itemId) => {
        const newCart = cart.filter(item => item.id !== itemId);
        updateCart(newCart);
    };

    const handleUpdateQuantity = (item, increment) => {
        let newCart;
        if (increment) {
            newCart = cart.map(cartItem =>
                cartItem.id === item.id
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
            );
        } else {
            if (item.quantity <= 1) {
                newCart = cart.filter(cartItem => cartItem.id !== item.id);
            } else {
                newCart = cart.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity - 1 }
                        : cartItem
                );
            }
        }
        updateCart(newCart);
    };

    const handleGenerateBill = () => {
        setShowBillModal(true);
    };

    const handlePaymentMethodSelect = (method) => {
        setSelectedPaymentMethod(method);
    };

    const handlePayment = () => {
        if (!selectedPaymentMethod) {
            Alert.alert('Error', 'Please select a payment method');
            return;
        }

        // Simulate payment processing
        setShowPaymentSuccess(true);
        
        // Reset after 3 seconds
        setTimeout(() => {
            setShowPaymentSuccess(false);
            setShowEmailOptions(true);
        }, 3000);
    };

    const handleSendBillEmail = () => {
        // In a real app, this would connect to a backend service to send the email
        // For now, we'll just show a success message
        Alert.alert(
            'Email Sent',
            'Your bill has been sent to your email address.',
            [
                {
                    text: 'OK',
                    onPress: () => {
                        setShowEmailOptions(false);
                        setShowBillModal(false);
                        setSelectedPaymentMethod(null);
                        clearSubmittedOrders();
                    }
                }
            ]
        );
    };

    const handleSkipEmail = () => {
        setShowEmailOptions(false);
        setShowBillModal(false);
        setSelectedPaymentMethod(null);
        clearSubmittedOrders();
        Alert.alert('Payment Successful', 'Thank you for dining with us!');
    };

    // New function to handle rating an item
    const handleRateItem = (orderId, itemId, rating) => {
        const key = `${orderId}-${itemId}`;
        setItemRatings(prev => ({
            ...prev,
            [key]: rating
        }));
    };

    // New function to open feedback modal
    const handleOpenFeedback = (orderId, itemId) => {
        const key = `${orderId}-${itemId}`;
        setSelectedItem({ orderId, itemId });
        setFeedbackText(itemFeedback[key] || '');
        setShowFeedbackModal(true);
    };

    // New function to submit feedback
    const handleSubmitFeedback = () => {
        if (selectedItem) {
            const key = `${selectedItem.orderId}-${selectedItem.itemId}`;
            setItemFeedback(prev => ({
                ...prev,
                [key]: feedbackText
            }));
            setShowFeedbackModal(false);
            Alert.alert('Success', 'Thank you for your feedback!');
        }
    };

    const handleImagePress = (imageUrl) => {
        setSelectedImage(imageUrl);
        setShowImagePreview(true);
    };

    const renderCartItem = ({ item }) => (
        <View style={styles.cartItem}>
            <View style={styles.cartItemImageContainer}>
                <Image 
                    source={{ uri: item.image }} 
                    style={styles.cartItemImage}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>₹{item.price}</Text>
            </View>
            <View style={styles.quantityControls}>
                <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => handleUpdateQuantity(item, false)}
                >
                    <Ionicons name="remove" size={24} color={Colors.PRIMARY} />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => handleUpdateQuantity(item, true)}
                >
                    <Ionicons name="add" size={24} color={Colors.PRIMARY} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteItem(item.id)}
            >
                <Ionicons name="trash-outline" size={20} color={Colors.GREY} />
            </TouchableOpacity>
        </View>
    );

    const renderSubmittedOrderItem = ({ item, orderId }) => {
        // Ensure item has all required properties
        const safeItem = {
            id: item?.id || 'unknown',
            name: item?.name || 'Unknown Item',
            price: item?.price || 0,
            quantity: item?.quantity || 1,
            image: item?.image || 'https://via.placeholder.com/150',
            ...item
        };
        
        const timeKey = `${orderId}-${safeItem.id}`;
        const remaining = timeRemaining[timeKey] || 0;
        const isReady = remaining <= 0;
        
        const ratingKey = `${orderId}-${safeItem.id}`;
        const rating = itemRatings[ratingKey] || 0;
        const feedback = itemFeedback[ratingKey] || '';
        
        return (
            <View style={styles.submittedOrderItem}>
                <TouchableOpacity 
                    style={styles.submittedItemImageContainer}
                    onPress={() => handleImagePress(safeItem.image)}
                >
                    <Image 
                        source={{ uri: safeItem.image }} 
                        style={styles.submittedItemImage}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
                
                <View style={styles.submittedItemContent}>
                    <View style={styles.submittedItemHeader}>
                        <Text style={styles.submittedItemName}>{safeItem.name}</Text>
                        <Text style={styles.submittedItemPrice}>₹{(safeItem.price * safeItem.quantity).toFixed(2)}</Text>
                    </View>
                    
                    <View style={styles.submittedItemDetails}>
                        <View style={styles.submittedQuantityDisplay}>
                            <Text style={styles.submittedQuantityText}>Qty: {safeItem.quantity}</Text>
                        </View>
                        <View style={[styles.submittedPrepTimeContainer, isReady && styles.submittedReadyContainer]}>
                            <Ionicons 
                                name={isReady ? "checkmark-circle" : "time-outline"} 
                                size={16} 
                                color={isReady ? Colors.WHITE : Colors.PRIMARY} 
                            />
                            <Text style={[styles.submittedPrepTimeText, isReady && styles.submittedReadyText]}>
                                {formatTimeRemaining(remaining)}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    const renderOrderSection = ({ item: order }) => {
        // Ensure order has all required properties
        const safeOrder = {
            id: order?.id || 'unknown',
            items: Array.isArray(order?.items) ? order.items : [],
            total: order?.total || 0,
            timestamp: order?.timestamp || new Date().toISOString(),
            ...order
        };
        
        return (
            <View style={styles.submittedOrderSection}>
                <View style={styles.submittedOrderHeader}>
                    <Text style={styles.submittedOrderId}>Order #{safeOrder.id.slice(-4)}</Text>
                    <Text style={styles.submittedOrderDate}>
                        {new Date(safeOrder.timestamp).toLocaleString()}
                    </Text>
                </View>
                <View style={styles.submittedOrderItems}>
                    {safeOrder.items.length > 0 ? (
                        safeOrder.items.map(item => (
                            <View key={item.id || Math.random().toString()}>
                                {renderSubmittedOrderItem({ item, orderId: safeOrder.id })}
                            </View>
                        ))
                    ) : (
                        <Text style={styles.emptyItemsText}>No items in this order</Text>
                    )}
                </View>
                <View style={styles.submittedOrderTotal}>
                    <Text style={styles.submittedOrderTotalText}>Total: ₹{safeOrder.total.toFixed(2)}</Text>
                </View>
            </View>
        );
    };

    const renderEmptyState = () => (
        <View style={styles.emptyStateContainer}>
            <Ionicons name="cart-outline" size={60} color={Colors.LIGHT_GREY} />
            <Text style={styles.emptyStateText}>
                {activeTab === 'current' 
                    ? 'Your cart is empty. Add items from the menu to place an order.'
                    : 'No order history yet'}
            </Text>
        </View>
    );

    const renderBillModal = () => (
        <Modal
            visible={showBillModal}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setShowBillModal(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Bill Details</Text>
                        <TouchableOpacity onPress={() => setShowBillModal(false)}>
                            <Ionicons name="close" size={24} color={Colors.BLACK} />
                        </TouchableOpacity>
                    </View>

                    {showPaymentSuccess ? (
                        <View style={styles.paymentSuccessContainer}>
                            <Ionicons name="checkmark-circle" size={80} color={Colors.PRIMARY} />
                            <Text style={styles.paymentSuccessText}>Payment Successful!</Text>
                            <Text style={styles.paymentProcessingText}>Processing your payment...</Text>
                        </View>
                    ) : showEmailOptions ? (
                        <View style={styles.emailOptionsContainer}>
                            <Ionicons name="mail-outline" size={80} color={Colors.PRIMARY} />
                            <Text style={styles.emailOptionsTitle}>Would you like to receive your bill via email?</Text>
                            <Text style={styles.emailOptionsSubtitle}>We can send a detailed copy of your bill to your email address.</Text>
                            
                            <View style={styles.emailOptionsButtons}>
                                <TouchableOpacity 
                                    style={[styles.emailOptionButton, styles.sendEmailButton]}
                                    onPress={handleSendBillEmail}
                                >
                                    <Ionicons name="mail" size={20} color={Colors.WHITE} />
                                    <Text style={styles.sendEmailButtonText}>Send Bill as Email</Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    style={[styles.emailOptionButton, styles.skipEmailButton]}
                                    onPress={handleSkipEmail}
                                >
                                    <Text style={styles.skipEmailButtonText}>Skip</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : (
                        <>
                            <ScrollView style={styles.billItemsContainer}>
                                <View style={styles.billHeader}>
                                    <Text style={styles.billHeaderText}>Hotel Royal</Text>
                                    <Text style={styles.billDate}>{new Date().toLocaleDateString()}</Text>
                                </View>
                                
                                <View style={styles.billDivider} />
                                
                                <View style={styles.billItems}>
                                    {submittedOrders && submittedOrders.length > 0 ? (
                                        submittedOrders.map(order => {
                                            // Ensure order has all required properties
                                            const safeOrder = {
                                                id: order?.id || 'unknown',
                                                items: Array.isArray(order?.items) ? order.items : [],
                                                total: order?.total || 0,
                                                ...order
                                            };
                                            
                                            return (
                                                <View key={safeOrder.id}>
                                                    <Text style={styles.orderTitle}>Order #{safeOrder.id.slice(-4)}</Text>
                                                    {safeOrder.items.length > 0 ? (
                                                        safeOrder.items.map(item => {
                                                            // Ensure item has all required properties
                                                            const safeItem = {
                                                                id: item?.id || 'unknown',
                                                                name: item?.name || 'Unknown Item',
                                                                price: item?.price || 0,
                                                                quantity: item?.quantity || 1,
                                                                ...item
                                                            };
                                                            
                                                            return (
                                                                <View key={safeItem.id} style={styles.billItem}>
                                                                    <Text style={styles.billItemName}>{safeItem.name}</Text>
                                                                    <View style={styles.billItemDetails}>
                                                                        <Text style={styles.billItemQuantity}>x{safeItem.quantity}</Text>
                                                                        <Text style={styles.billItemPrice}>₹{(safeItem.price * safeItem.quantity).toFixed(2)}</Text>
                                                                    </View>
                                                                </View>
                                                            );
                                                        })
                                                    ) : (
                                                        <Text style={styles.emptyItemsText}>No items in this order</Text>
                                                    )}
                                                </View>
                                            );
                                        })
                                    ) : (
                                        <Text style={styles.emptyOrdersText}>No orders to display</Text>
                                    )}
                                </View>
                                
                                <View style={styles.billDivider} />
                                
                                <View style={styles.billTotalContainer}>
                                    <Text style={styles.billTotalLabel}>Total Amount</Text>
                                    <Text style={styles.billTotalAmount}>
                                        ₹{submittedOrders && submittedOrders.length > 0 
                                            ? submittedOrders.reduce((total, order) => total + (order.total || 0), 0).toFixed(2)
                                            : '0.00'}
                                    </Text>
                                </View>
                                
                                <View style={styles.paymentMethodsContainer}>
                                    <Text style={styles.paymentMethodsTitle}>Select Payment Method</Text>
                                    
                                    <TouchableOpacity 
                                        style={[
                                            styles.paymentMethod, 
                                            selectedPaymentMethod === 'cash' && styles.selectedPaymentMethod
                                        ]}
                                        onPress={() => handlePaymentMethodSelect('cash')}
                                    >
                                        <Ionicons 
                                            name="cash-outline" 
                                            size={24} 
                                            color={selectedPaymentMethod === 'cash' ? Colors.WHITE : Colors.PRIMARY} 
                                        />
                                        <Text style={[
                                            styles.paymentMethodText,
                                            selectedPaymentMethod === 'cash' && styles.selectedPaymentMethodText
                                        ]}>Cash</Text>
                                    </TouchableOpacity>
                                    
                                    <TouchableOpacity 
                                        style={[
                                            styles.paymentMethod, 
                                            selectedPaymentMethod === 'card' && styles.selectedPaymentMethod
                                        ]}
                                        onPress={() => handlePaymentMethodSelect('card')}
                                    >
                                        <Ionicons 
                                            name="card-outline" 
                                            size={24} 
                                            color={selectedPaymentMethod === 'card' ? Colors.WHITE : Colors.PRIMARY} 
                                        />
                                        <Text style={[
                                            styles.paymentMethodText,
                                            selectedPaymentMethod === 'card' && styles.selectedPaymentMethodText
                                        ]}>Credit/Debit Card</Text>
                                    </TouchableOpacity>
                                    
                                    <TouchableOpacity 
                                        style={[
                                            styles.paymentMethod, 
                                            selectedPaymentMethod === 'upi' && styles.selectedPaymentMethod
                                        ]}
                                        onPress={() => handlePaymentMethodSelect('upi')}
                                    >
                                        <Ionicons 
                                            name="phone-portrait-outline" 
                                            size={24} 
                                            color={selectedPaymentMethod === 'upi' ? Colors.WHITE : Colors.PRIMARY} 
                                        />
                                        <Text style={[
                                            styles.paymentMethodText,
                                            selectedPaymentMethod === 'upi' && styles.selectedPaymentMethodText
                                        ]}>UPI</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                            
                            <TouchableOpacity 
                                style={styles.payButton}
                                onPress={handlePayment}
                            >
                                <Text style={styles.payButtonText}>Pay Now</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </View>
        </Modal>
    );

    // Add Feedback Modal
    const renderFeedbackModal = () => (
        <Modal
            visible={showFeedbackModal}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setShowFeedbackModal(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Provide Feedback</Text>
                        <TouchableOpacity onPress={() => setShowFeedbackModal(false)}>
                            <Ionicons name="close" size={24} color={Colors.BLACK} />
                        </TouchableOpacity>
                    </View>
                    
                    <TextInput
                        style={styles.feedbackInput}
                        placeholder="Share your experience with this item..."
                        value={feedbackText}
                        onChangeText={setFeedbackText}
                        multiline={true}
                        numberOfLines={4}
                    />
                    
                    <TouchableOpacity 
                        style={styles.submitFeedbackButton}
                        onPress={handleSubmitFeedback}
                    >
                        <Text style={styles.submitFeedbackButtonText}>Submit Feedback</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );

    const renderImagePreviewModal = () => (
        <Modal
            visible={showImagePreview}
            transparent={true}
            onRequestClose={() => setShowImagePreview(false)}
        >
            <View style={styles.imagePreviewContainer}>
                <TouchableOpacity 
                    style={styles.closeImageButton}
                    onPress={() => setShowImagePreview(false)}
                >
                    <Ionicons name="close" size={28} color={Colors.WHITE} />
                </TouchableOpacity>
                
                <View style={styles.imageWrapper}>
                    <Image
                        source={{ uri: selectedImage }}
                        style={styles.previewImage}
                        resizeMode="contain"
                    />
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
            
            <View style={styles.header}>
                <Text style={styles.title}>Orders</Text>
            </View>
            
            <View style={styles.tabContainer}>
                <TouchableOpacity 
                    style={[styles.tab, activeTab === 'current' && styles.activeTab]}
                    onPress={() => setActiveTab('current')}
                >
                    <Text style={[styles.tabText, activeTab === 'current' && styles.activeTabText]}>
                        Current Order
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.tab, activeTab === 'history' && styles.activeTab]}
                    onPress={() => setActiveTab('history')}
                >
                    <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>
                        Order History
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.contentContainer}>
                {activeTab === 'current' ? (
                    <View style={styles.cartList}>
                        {cart.length === 0 ? (
                            <View style={styles.emptyStateContainer}>
                                <Ionicons name="cart-outline" size={80} color={Colors.LIGHT_GREY} />
                                <Text style={styles.emptyStateText}>
                                    Your cart is empty. Add items from the menu to place an order.
                                </Text>
                            </View>
                        ) : (
                            <>
                                <FlatList
                                    data={cart}
                                    renderItem={renderCartItem}
                                    keyExtractor={item => item.id}
                                    contentContainerStyle={styles.cartListContent}
                                />
                                
                                <View style={styles.specialRequirementsContainer}>
                                    <Text style={styles.specialRequirementsLabel}>Special Requirements</Text>
                                    <TextInput
                                        style={styles.specialRequirementsInput}
                                        placeholder="Any special requests or allergies? (Optional)"
                                        value={specialRequirements}
                                        onChangeText={setSpecialRequirements}
                                        multiline
                                        numberOfLines={3}
                                    />
                                </View>
                                
                                <View style={styles.bottomContainer}>
                                    <View style={styles.totalContainer}>
                                        <Text style={styles.totalLabel}>Total Amount</Text>
                                        <Text style={styles.totalAmount}>
                                            ₹{cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                                        </Text>
                                    </View>
                                    <TouchableOpacity
                                        style={styles.submitButton}
                                        onPress={handleSubmitOrder}
                                    >
                                        <Text style={styles.submitButtonText}>Submit Order</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}
                    </View>
                ) : (
                    <View style={styles.contentContainer}>
                        {submittedOrders.length === 0 ? (
                            renderEmptyState()
                        ) : (
                            <>
                                <FlatList
                                    data={submittedOrders}
                                    renderItem={renderOrderSection}
                                    keyExtractor={order => order.id}
                                    style={styles.orderHistoryList}
                                    contentContainerStyle={styles.orderHistoryListContent}
                                />
                                <View style={styles.bottomContainer}>
                                    <TouchableOpacity
                                        style={styles.generateBillButton}
                                        onPress={handleGenerateBill}
                                    >
                                        <Ionicons name="receipt-outline" size={24} color={Colors.WHITE} />
                                        <Text style={styles.generateBillButtonText}>Generate Bill</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}
                    </View>
                )}
            </View>
            
            {renderBillModal()}
            {renderFeedbackModal()}
            {renderImagePreviewModal()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    header: {
        padding: 16,
        backgroundColor: Colors.PRIMARY,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        elevation: 4,
        shadowColor: Colors.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.WHITE,
        textAlign: 'center',
    },
    contentContainer: {
        flex: 1,
        padding: 16,
    },
    tabContainer: {
        flexDirection: 'row',
        marginHorizontal: 16,
        marginTop: -20,
        borderRadius: 15,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: Colors.LIGHT_GREY,
        backgroundColor: Colors.WHITE,
        elevation: 5,
        shadowColor: Colors.BLACK,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    tab: {
        flex: 1,
        padding: 14,
        alignItems: 'center',
    },
    activeTab: {
        backgroundColor: Colors.PRIMARY,
    },
    tabText: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.GREY,
    },
    activeTabText: {
        color: Colors.WHITE,
    },
    cartList: {
        flex: 1,
    },
    cartListContent: {
        paddingBottom: 16,
    },
    orderHistoryList: {
        flex: 1,
    },
    orderHistoryListContent: {
        paddingBottom: 16,
    },
    cartItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: Colors.WHITE,
        marginBottom: 12,
        borderRadius: 12,
        elevation: 3,
        shadowColor: Colors.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderLeftWidth: 4,
        borderLeftColor: Colors.PRIMARY,
    },
    cartItemImageContainer: {
        width: 60,
        height: 60,
        borderRadius: 8,
        overflow: 'hidden',
        marginRight: 12,
    },
    cartItemImage: {
        width: '100%',
        height: '100%',
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.BLACK,
        marginBottom: 6,
    },
    itemPrice: {
        fontSize: 15,
        color: Colors.PRIMARY,
        fontWeight: '600',
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.LIGHT_GREY,
        borderRadius: 25,
        padding: 5,
    },
    quantityButton: {
        padding: 8,
        borderRadius: 20,
    },
    quantityText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.PRIMARY,
        marginHorizontal: 12,
        minWidth: 20,
        textAlign: 'center',
    },
    deleteButton: {
        padding: 8,
        marginLeft: 10,
    },
    bottomContainer: {
        backgroundColor: Colors.WHITE,
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: Colors.LIGHT_GREY,
        elevation: 5,
        shadowColor: Colors.BLACK,
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: Colors.LIGHT_GREY,
    },
    totalLabel: {
        fontSize: 16,
        color: Colors.GREY,
        fontWeight: '500',
    },
    totalAmount: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.PRIMARY,
    },
    submitButton: {
        backgroundColor: Colors.PRIMARY,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        elevation: 3,
        shadowColor: Colors.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    submitButtonText: {
        color: Colors.WHITE,
        fontSize: 16,
        fontWeight: 'bold',
    },
    emptyStateContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyStateText: {
        fontSize: 16,
        color: Colors.GREY,
        marginTop: 12,
        textAlign: 'center',
        lineHeight: 22,
    },
    orderSection: {
        backgroundColor: Colors.WHITE,
        borderRadius: 12,
        marginBottom: 16,
        padding: 16,
        elevation: 3,
        shadowColor: Colors.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: Colors.LIGHT_GREY,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: Colors.LIGHT_GREY,
    },
    orderId: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.PRIMARY,
    },
    orderDate: {
        fontSize: 14,
        color: Colors.GREY,
    },
    orderItems: {
        marginBottom: 12,
    },
    orderTotal: {
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: Colors.LIGHT_GREY,
        alignItems: 'flex-end',
    },
    orderTotalText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.PRIMARY,
    },
    generateBillButton: {
        backgroundColor: Colors.PRIMARY,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        elevation: 3,
        shadowColor: Colors.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    generateBillButtonText: {
        color: Colors.WHITE,
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
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
        shadowColor: Colors.BLACK,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: Colors.LIGHT_GREY,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.PRIMARY,
    },
    billItemsContainer: {
        maxHeight: '70%',
    },
    billHeader: {
        alignItems: 'center',
        marginBottom: 15,
    },
    billHeaderText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.PRIMARY,
    },
    billDate: {
        fontSize: 14,
        color: Colors.GREY,
        marginTop: 5,
    },
    billDivider: {
        height: 1,
        backgroundColor: Colors.LIGHT_GREY,
        marginVertical: 15,
    },
    billItems: {
        marginBottom: 15,
    },
    orderTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: Colors.PRIMARY,
    },
    billItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        paddingVertical: 5,
    },
    billItemName: {
        fontSize: 14,
        flex: 1,
    },
    billItemDetails: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    billItemQuantity: {
        fontSize: 14,
        marginRight: 10,
        color: Colors.GREY,
    },
    billItemPrice: {
        fontSize: 14,
        fontWeight: 'bold',
        minWidth: 70,
        textAlign: 'right',
    },
    billTotalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: Colors.LIGHT_GREY,
    },
    billTotalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    billTotalAmount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.PRIMARY,
    },
    paymentMethodsContainer: {
        marginBottom: 20,
    },
    paymentMethodsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 15,
        color: Colors.BLACK,
    },
    paymentMethod: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.LIGHT_GREY,
        marginBottom: 10,
    },
    selectedPaymentMethod: {
        backgroundColor: Colors.PRIMARY,
        borderColor: Colors.PRIMARY,
    },
    paymentMethodText: {
        fontSize: 16,
        marginLeft: 15,
        color: Colors.BLACK,
    },
    selectedPaymentMethodText: {
        color: Colors.WHITE,
    },
    payButton: {
        backgroundColor: Colors.PRIMARY,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        elevation: 3,
        shadowColor: Colors.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    payButtonText: {
        color: Colors.WHITE,
        fontSize: 18,
        fontWeight: 'bold',
    },
    paymentSuccessContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
    paymentSuccessText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        color: Colors.PRIMARY,
    },
    paymentProcessingText: {
        fontSize: 16,
        color: Colors.GREY,
        marginTop: 10,
    },
    // Improved styles for rating and feedback
    ratingSection: {
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: Colors.LIGHT_GREY,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        backgroundColor: Colors.WHITE,
        padding: 10,
        borderRadius: 10,
        elevation: 2,
        shadowColor: Colors.BLACK,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    ratingLabel: {
        fontSize: 14,
        fontWeight: '500',
        marginRight: 10,
        color: Colors.BLACK,
    },
    feedbackButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        backgroundColor: Colors.WHITE,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        alignSelf: 'flex-start',
    },
    feedbackButtonText: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.PRIMARY,
        marginLeft: 5,
    },
    feedbackContainer: {
        marginTop: 12,
        padding: 12,
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.LIGHT_GREY,
        elevation: 2,
        shadowColor: Colors.BLACK,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    feedbackLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 8,
        color: Colors.BLACK,
    },
    feedbackText: {
        fontSize: 14,
        color: Colors.BLACK,
        lineHeight: 20,
    },
    feedbackInput: {
        borderWidth: 1,
        borderColor: Colors.LIGHT_GREY,
        borderRadius: 10,
        padding: 12,
        marginBottom: 20,
        minHeight: 120,
        textAlignVertical: 'top',
        fontSize: 16,
        backgroundColor: Colors.WHITE,
    },
    submitFeedbackButton: {
        backgroundColor: Colors.PRIMARY,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 3,
        shadowColor: Colors.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    submitFeedbackButtonText: {
        color: Colors.WHITE,
        fontSize: 16,
        fontWeight: 'bold',
    },
    emailOptionsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
    emailOptionsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        color: Colors.PRIMARY,
        textAlign: 'center',
    },
    emailOptionsSubtitle: {
        fontSize: 16,
        color: Colors.GREY,
        marginTop: 10,
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 22,
    },
    emailOptionsButtons: {
        width: '100%',
    },
    emailOptionButton: {
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    sendEmailButton: {
        backgroundColor: Colors.PRIMARY,
        elevation: 3,
        shadowColor: Colors.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    sendEmailButtonText: {
        color: Colors.WHITE,
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    skipEmailButton: {
        backgroundColor: Colors.LIGHT_GREY,
    },
    skipEmailButtonText: {
        color: Colors.GREY,
        fontSize: 16,
        fontWeight: '500',
    },
    // New styles for Order History screen
    submittedOrderSection: {
        backgroundColor: Colors.WHITE,
        borderRadius: 15,
        marginBottom: 16,
        padding: 16,
        elevation: 2,
        shadowColor: Colors.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    submittedOrderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: Colors.LIGHT_GREY,
    },
    submittedOrderId: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.PRIMARY,
    },
    submittedOrderDate: {
        fontSize: 14,
        color: Colors.GREY,
    },
    submittedOrderItems: {
        marginVertical: 8,
    },
    submittedOrderItem: {
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
        marginBottom: 12,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    submittedItemImageContainer: {
        width: 80,
        height: 80,
        borderRadius: 8,
        overflow: 'hidden',
        marginRight: 12,
    },
    submittedItemImage: {
        width: '100%',
        height: '100%',
    },
    submittedItemContent: {
        flex: 1,
    },
    submittedItemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    submittedItemName: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.BLACK,
        flex: 1,
    },
    submittedItemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.PRIMARY,
        marginLeft: 8,
    },
    submittedItemDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    submittedQuantityDisplay: {
        backgroundColor: Colors.LIGHT_GREY,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    submittedQuantityText: {
        fontSize: 14,
        color: Colors.BLACK,
    },
    submittedPrepTimeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.LIGHT_GREY,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    submittedReadyContainer: {
        backgroundColor: Colors.PRIMARY,
    },
    submittedPrepTimeText: {
        fontSize: 14,
        color: Colors.PRIMARY,
        marginLeft: 4,
    },
    submittedReadyText: {
        color: Colors.WHITE,
    },
    submittedOrderTotal: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 8,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: Colors.LIGHT_GREY,
    },
    submittedOrderTotalText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.PRIMARY,
    },
    imagePreviewContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeImageButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 1,
        padding: 10,
    },
    imageWrapper: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    previewImage: {
        width: '100%',
        height: '100%',
    },
    specialRequirementsContainer: {
        marginHorizontal: 16,
        marginBottom: 16,
    },
    specialRequirementsLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.BLACK,
        marginBottom: 8,
    },
    specialRequirementsInput: {
        borderWidth: 1,
        borderColor: Colors.LIGHT_GREY,
        borderRadius: 12,
        padding: 12,
        backgroundColor: Colors.WHITE,
        minHeight: 80,
        textAlignVertical: 'top',
        fontSize: 14,
    },
    emptyItemsText: {
        fontSize: 14,
        color: Colors.GREY,
        fontStyle: 'italic',
        marginVertical: 10,
    },
    emptyOrdersText: {
        fontSize: 16,
        color: Colors.GREY,
        fontStyle: 'italic',
        textAlign: 'center',
        marginVertical: 20,
    },
});