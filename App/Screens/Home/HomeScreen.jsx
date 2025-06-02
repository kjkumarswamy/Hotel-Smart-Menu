import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, TextInput, Alert, SafeAreaView, Animated, StatusBar, Platform, Modal, Dimensions } from 'react-native';
import Colors from '../../Utils/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../Context/CartContext';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WaiterImage from '../../../assets/images/waiter.png';
import { useTable } from '../../Context/TableContext';

const categories = [
    { id: '1', name: 'All', icon: '🍽️' },
    { id: '2', name: 'Breakfast', icon: '🍳' },
    { id: '3', name: 'Lunch', icon: '🥘' },
    { id: '4', name: 'Pizza', icon: '🍕' },
    { id: '5', name: 'Dessert', icon: '🍰' },
    { id: '6', name: 'Ice Cream', icon: '🍦' },
    { id: '7', name: 'Soups', icon: '🥣' },
    { id: '8', name: 'Salads', icon: '🥗' },
    { id: '9', name: 'Today Special', icon: '⭐' },
];

const StarRating = ({ rating, size = 16, showText = true }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <Ionicons
                key={i}
                name={i <= rating ? "star" : "star-outline"}
                size={size}
                color={i <= rating ? "#FFD700" : Colors.GREY}
                style={{ marginRight: 2 }}
            />
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

const menuItems = [
    // Breakfast Items
    { 
        id: '1', 
        name: 'Idly', 
        price: 30, 
        image: 'https://i.pinimg.com/736x/01/65/17/01651769c6a528ef17f6e122b922f8dc.jpg',
        description: 'Soft and fluffy steamed rice cakes served with sambar and chutney.',
        category: '2',
        rating: 4.8,
        prepTime: '15 min'
    },
    { 
        id: '2', 
        name: 'Dosa', 
        price: 40, 
        image: 'https://i.pinimg.com/736x/e8/48/ca/e848ca06cc72cfb473c1d96f2ea75183.jpg',
        description: 'Crispy fermented rice and lentil crepe served with sambar and chutney.',
        category: '2',
        rating: 4.9,
        prepTime: '1 min'
    },
    { 
        id: '3', 
        name: 'Lemon Rice', 
        price: 60, 
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_FRXGWcGfCxy3bXI0ZlyRITlerfBL4k5krQ&s',
        description: 'Tangy rice dish flavored with lemon, peanuts, and curry leaves.',
        category: '2',
        rating: 4.5,
        prepTime: '20 min'
    },
    { 
        id: '4', 
        name: 'Poori', 
        price: 50, 
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYpkoxfEC8atsB34GwIgWROSllY6nwKlwNRQ&s',
        description: 'Deep-fried bread served with potato curry.',
        category: '2',
        rating: 4.6,
        prepTime: '15 min'
    },

    // Lunch Items
    { 
        id: '5', 
        name: 'North Indian Thali', 
        price: 150, 
        image: 'https://premasculinary.com/wp-content/uploads/2022/05/North-Indian-Thali-Recipe-1.jpg',
        description: 'Complete North Indian meal with roti, dal, sabzi, rice, and accompaniments.',
        category: '3',
        rating: 4.7,
        prepTime: '25 min'
    },
    { 
        id: '6', 
        name: 'South Indian Meals', 
        price: 120, 
        image: 'https://5.imimg.com/data5/IM/KH/GLADMIN-21954819/south-indian-full-meals-250x250.jpg',
        description: 'Traditional South Indian meal with rice, sambar, rasam, and vegetables.',
        category: '3',
        rating: 4.8,
        prepTime: '20 min'
    },
    { 
        id: '7', 
        name: 'Veg Biriyani', 
        price: 130, 
        image: 'https://static.wixstatic.com/media/91e241_0cf76aa5613b4055be2f922f71edeaa0~mv2.jpg/v1/fill/w_560,h_372,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Ustaadi%20Hyderabadi%20Veg%20Biryani.jpg',
        description: 'Aromatic rice dish cooked with mixed vegetables and special spices.',
        category: '3',
        rating: 4.9,
        prepTime: '30 min'
    },

    // Ice Cream Items
    { 
        id: '8', 
        name: 'Vanilla Ice Cream', 
        price: 40, 
        image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371',
        description: 'Classic vanilla ice cream made with real Madagascar vanilla.',
        category: '6',
        rating: 4.7,
        prepTime: '15 min'
    },
    { 
        id: '9', 
        name: 'Strawberry Ice Cream', 
        price: 45, 
        image: 'https://images.unsplash.com/photo-1557142046-c704a3adf364',
        description: 'Creamy strawberry ice cream made with fresh strawberries.',
        category: '6',
        rating: 4.8,
        prepTime: '10 min'
    },
    { 
        id: '10', 
        name: 'Butterscotch Ice Cream', 
        price: 45, 
        image: 'https://static.toiimg.com/thumb/84014919.cms?imgsize=306932&width=800&height=800',
        description: 'Rich butterscotch ice cream with caramel swirls.',
        category: '6',
        rating: 4.9,
        prepTime: '15 min'
    },

    // Soup Items
    { 
        id: '11', 
        name: 'Sweet Corn Soup', 
        price: 80, 
        image: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2021/08/sweet-corn-soup-recipe.jpg',
        description: 'Creamy corn soup with vegetables and pepper.',
        category: '7',
        rating: 4.8,
        prepTime: '15 min'
    },
    { 
        id: '12', 
        name: 'Mixed Vegetable Soup', 
        price: 70, 
        image: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2021/08/vegetable-soup-recipe.jpg',
        description: 'Healthy soup made with mixed vegetables and herbs.',
        category: '7',
        rating: 4.9,
        prepTime: '10 min'
    },
    {
        id: '13',
        name: 'Today Special',
        price: 100,
        image: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2021/08/vegetable-soup-recipe.jpg',
        description: 'Today Special',
        category: '9',
        rating: 4.9,
        prepTime: '10 min'
    }
];

export default function HomeScreen({ navigation }) {
    const [selectedCategory, setSelectedCategory] = useState('1');
    const [searchQuery, setSearchQuery] = useState('');
    const [showAllCategories, setShowAllCategories] = useState(false);
    const { cart, updateCart } = useCart();
    const headerAnimation = useRef(new Animated.Value(0)).current;
    const insets = useSafeAreaInsets();
    const [selectedImage, setSelectedImage] = useState(null);
    const [showImagePreview, setShowImagePreview] = useState(false);
    const { selectedTable } = useTable();

    // Hide status bar
    // useEffect(() => {
    //     StatusBar.setHidden(true);
        
    //     // Restore status bar when component unmounts
    //     return () => {
    //         StatusBar.setHidden(false);
    //     };
    // }, []);

    useEffect(() => {
        if (selectedCategory) {
            Animated.timing(headerAnimation, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
        } else {
            headerAnimation.setValue(0);
        }
    }, [selectedCategory]);

    const addToCart = (item) => {
        try {
            const existingItem = cart.find(cartItem => cartItem.id === item.id);
            let updatedCart;
            
            if (existingItem) {
                updatedCart = cart.map(cartItem => 
                    cartItem.id === item.id 
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                updatedCart = [...cart, { ...item, quantity: 1 }];
            }
            
            updateCart(updatedCart);
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    const removeFromCart = (item) => {
        try {
            const existingItem = cart.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                let updatedCart;
                if (existingItem.quantity > 1) {
                    updatedCart = cart.map(cartItem => 
                        cartItem.id === item.id 
                            ? { ...cartItem, quantity: cartItem.quantity - 1 }
                            : cartItem
                    );
                } else {
                    updatedCart = cart.filter(cartItem => cartItem.id !== item.id);
                }
                updateCart(updatedCart);
            }
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };

    const getItemQuantity = (itemId) => {
        try {
            const cartItem = cart.find(item => item.id === itemId);
            return cartItem ? cartItem.quantity : 0;
        } catch (error) {
            console.error('Error getting item quantity:', error);
            return 0;
        }
    };

    const toggleShowAllCategories = () => {
        setShowAllCategories(!showAllCategories);
    };

    const renderCategoryItem = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.categoryButton,
                selectedCategory === item.id && styles.selectedCategory
            ]}
            onPress={() => setSelectedCategory(item.id)}
        >
            <Text style={styles.categoryIcon}>{item.icon}</Text>
            <Text style={[
                styles.categoryText,
                selectedCategory === item.id && styles.selectedCategoryText
            ]}>
                {item.name}
            </Text>
        </TouchableOpacity>
    );

    const renderCategories = () => (
        <View style={styles.categoriesSection}>
            <View style={styles.categoriesHeader}>
                <Text style={styles.categoriesTitle}>All Categories</Text>
                <TouchableOpacity onPress={toggleShowAllCategories}>
                    <Text style={styles.seeAllText}>
                        {showAllCategories ? 'Show Less' : 'See All'}
                    </Text>
                </TouchableOpacity>
            </View>
            {showAllCategories ? (
                <View style={styles.expandedCategories}>
                    {categories.map((item) => (
                        <View key={item.id}>
                            {renderCategoryItem({ item })}
                        </View>
                    ))}
                </View>
            ) : (
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={categories}
                    renderItem={renderCategoryItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.categoriesList}
                />
            )}
        </View>
    );

    const filteredMenuItems = menuItems.filter(item => {
        if (searchQuery) {
            return item.name.toLowerCase().includes(searchQuery.toLowerCase());
        }
        if (selectedCategory === '1') return true;
        return item.category === selectedCategory;
    });

    const handleImagePress = (imageUrl) => {
        setSelectedImage(imageUrl);
        setShowImagePreview(true);
    };

    const renderImagePreviewModal = () => (
        <Modal
            visible={showImagePreview}
            transparent={true}
            onRequestClose={() => setShowImagePreview(false)}
            animationType="fade"
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

    const renderMenuItem = ({ item }) => {
        const quantity = getItemQuantity(item.id);
        return (
            <View style={styles.menuItem}>
                <TouchableOpacity 
                    style={styles.menuImageContainer}
                    onPress={() => handleImagePress(item.image)}
                    activeOpacity={0.9}
                >
                    <Image source={{ uri: item.image }} style={styles.menuImage} />
                </TouchableOpacity>
                <View style={styles.menuItemDetails}>
                    <View style={styles.titleRow}>
                        <Text style={styles.menuItemName}>{item.name}</Text>
                        <View style={styles.prepTimeContainer}>
                            <Ionicons name="time-outline" size={16} color={Colors.GREY} />
                            <Text style={styles.prepTimeText}>{item.prepTime}</Text>
                        </View>
                    </View>
                    <Text style={styles.menuItemDescription}>{item.description}</Text>
                    <StarRating rating={item.rating} />
                    <View style={styles.priceAndButtonContainer}>
                        <Text style={styles.menuItemPrice}>₹{item.price}</Text>
                        <View style={styles.quantityControls}>
                            {quantity > 0 && (
                                <TouchableOpacity
                                    style={styles.quantityButton}
                                    onPress={() => removeFromCart(item)}
                                >
                                    <Ionicons name="remove" size={24} color={Colors.PRIMARY} />
                                </TouchableOpacity>
                            )}
                            {quantity > 0 && (
                                <Text style={styles.quantityText}>{quantity}</Text>
                            )}
                            <TouchableOpacity
                                style={styles.quantityButton}
                                onPress={() => addToCart(item)}
                            >
                                <Ionicons name="add" size={24} color={Colors.PRIMARY} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    const navigateToOrders = () => {
        navigation.navigate('Orders');
    };

    const handleCallWaiter = () => {
        Alert.alert(
            'Call Waiter',
            'Do you want to call the waiter?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Yes, Call Waiter',
                    onPress: () => {
                        Alert.alert('Success', 'Waiter has been notified and will be at your table shortly.');
                    }
                }
            ]
        );
    };

    return (
        <View style={[styles.safeArea, { paddingTop: insets.top }]}>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent={true}
            />
            <View style={styles.container}>
                <Animated.View style={[
                    styles.headerGradient,
                    {
                        opacity: headerAnimation,
                        transform: [
                            { translateY: headerAnimation.interpolate({
                                inputRange: [0, 1],
                                outputRange: [-20, 0]
                            })}
                        ]
                    }
                ]}>
                    <LinearGradient
                        colors={['#8E3FFF', '#6A1FFF']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.headerGradientInner}
                    >
                        <View style={styles.header}>
                            <View style={styles.headerCenter}>
                                <View style={styles.logoContainer}>
                                    <Image 
                                        source={{ uri: 'https://cdn2.iconfinder.com/data/icons/travel-caramel-vol-1/256/5_STARS_HOTEL-512.png' }} 
                                        style={styles.logoImage} 
                                    />
                                </View>
                                <View style={styles.titleContainer}>
                                    <Text style={styles.hotelTitle}>Hotel Royal</Text>
                                    <Text style={styles.hotelSubtitle}>"Beyond Five Stars" 
</Text>
                                </View>
                            </View>
                            <View style={styles.headerRight}>
                                <TouchableOpacity
                                    style={styles.iconButton}
                                    onPress={navigateToOrders}
                                >
                                    <Ionicons name="cart-outline" size={24} color={Colors.WHITE} />
                                    {cart.length > 0 && (
                                        <View style={styles.cartBadge}>
                                            <Text style={styles.cartBadgeText}>{cart.length}</Text>
                                        </View>
                                    )}
                                </TouchableOpacity>
                                <View style={styles.userWithTable}>
                                  <TouchableOpacity style={styles.iconButton}>
                                    <Image 
                                        source={WaiterImage} 
                                        style={{ width: 35, height: 35 }}
                                        resizeMode="contain"
                                    />
                                  </TouchableOpacity>
                                  {selectedTable && (
                                    <View style={styles.tableBadge}>
                                      <Text style={styles.tableBadgeText}>Table {selectedTable}</Text>
                                    </View>
                                  )}
                                </View>
                            </View>
                        </View>
                    </LinearGradient>
                </Animated.View>

                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color={Colors.GREY} style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search dishes, restaurants"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholderTextColor={Colors.GREY}
                    />
                </View>

                {renderCategories()}

                <FlatList
                    key="menu-list"
                    data={filteredMenuItems}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.menuList}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            {renderImagePreviewModal()}
        </View>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    headerGradient: {
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        marginBottom: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        overflow: 'hidden',
        marginTop: Platform.OS === 'android' ? 0 : 0,
    },
    headerGradientInner: {
        width: '100%',
    },
    headerCenter: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        overflow: 'hidden',
    },
    logoImage: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    titleContainer: {
        alignItems: 'center',
        marginRight: 10,
    },
    hotelTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.WHITE,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    hotelSubtitle: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.8)',
        fontStyle: 'italic',
    },
    iconButton: {
        padding: 8,
        borderRadius: 20,
    },
    cartBadge: {
        position: 'absolute',
        right: -5,
        top: -5,
        backgroundColor: '#FFD700',
        borderRadius: 12,
        minWidth: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: Colors.WHITE,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
    },
    cartBadgeText: {
        color: Colors.BLACK,
        fontSize: 12,
        fontWeight: 'bold',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.LIGHT_GREY,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
        height: 36,
    },
    searchIcon: {
        marginRight: 6,
    },
    searchInput: {
        flex: 1,
        paddingVertical: 6,
        fontSize: 13,
        color: Colors.BLACK,
    },
    categoriesSection: {
        marginBottom: 10,
    },
    categoriesHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    categoriesTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: Colors.BLACK,
    },
    seeAllText: {
        color: Colors.PRIMARY,
        fontSize: 12,
    },
    categoriesList: {
        paddingRight: 10,
    },
    expandedCategories: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginHorizontal: -3,
    },
    categoryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.LIGHT_GREY,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 16,
        margin: 3,
        minWidth: 70,
        height: 28,
    },
    selectedCategory: {
        backgroundColor: Colors.PRIMARY_LIGHT,
    },
    categoryIcon: {
        fontSize: 14,
        marginRight: 3,
    },
    categoryText: {
        fontSize: 12,
        color: Colors.BLACK,
    },
    selectedCategoryText: {
        color: Colors.PRIMARY,
        fontWeight: 'bold',
    },
    menuList: {
        paddingBottom: 20,
    },
    menuItem: {
        flexDirection: 'row',
        backgroundColor: Colors.WHITE,
        marginBottom: 10,
        borderRadius: 8,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        minHeight: 80,
        height: 90,
    },
    menuImageContainer: {
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    menuImage: {
        width: 70,
        height: 70,
        resizeMode: 'cover',
        backgroundColor: Colors.WHITE,
        borderRadius: 8,
    },
    menuItemDetails: {
        flex: 1,
        padding: 8,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 2,
    },
    prepTimeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.LIGHT_GREY,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 10,
    },
    prepTimeText: {
        fontSize: 10,
        color: Colors.GREY,
        marginLeft: 2,
    },
    menuItemName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.BLACK,
        flex: 1,
        marginRight: 4,
    },
    menuItemDescription: {
        fontSize: 11,
        color: Colors.GREY,
        marginBottom: 4,
        lineHeight: 15,
        flexShrink: 1,
    },
    priceAndButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
    },
    menuItemPrice: {
        fontSize: 13,
        color: Colors.PRIMARY,
        fontWeight: 'bold',
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.WHITE,
        borderRadius: 16,
        padding: 2,
    },
    quantityButton: {
        padding: 2,
        borderRadius: 10,
    },
    quantityText: {
        marginHorizontal: 6,
        fontSize: 13,
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 20,
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
    userWithTable: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 8,
    },
    tableBadge: {
      backgroundColor: '#fff',
      borderRadius: 10,
      paddingHorizontal: 8,
      paddingVertical: 2,
      marginLeft: 4,
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 50,
      borderWidth: 1,
      borderColor: Colors.PRIMARY,
    },
    tableBadgeText: {
      color: Colors.PRIMARY,
      fontWeight: 'bold',
      fontSize: 12,
    },
});