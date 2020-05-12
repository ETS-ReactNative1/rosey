import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Caption, Drawer, Paragraph, Title, useTheme } from 'react-native-paper';
import Animated from 'react-native-reanimated';
import { AuthContext } from '../context/AuthContext';
// import { PreferencesContext } from './context/preferencesContext';

const DrawerContent = (props) => {
    const paperTheme = useTheme();
    const { navigation } = props;

    const { state: { user: { name } } } = useContext(AuthContext);

    // TODO: Try to get second inital
    const firstInitial = (name) ? name.substring(0, 1).toUpperCase() : '';

    // const { rtl, theme, toggleRTL, toggleTheme } = React.useContext(
    //     PreferencesContext
    // );
    const toggleTheme = () => { };

    const translateX = Animated.interpolate(props.progress, {
        inputRange: [0, 0.5, 0.7, 0.8, 1],
        outputRange: [-100, -85, -70, -45, 0],
    });

    return (
        <DrawerContentScrollView {...props}>
            <Animated.View
                //@ts-ignore
                style={[
                    styles.drawerContent,
                    {
                        backgroundColor: paperTheme.colors.surface,
                        transform: [{ translateX }],
                    },
                ]}
            >
                <View style={styles.userInfoSection}>
                    <TouchableOpacity
                        style={{ marginLeft: 10 }}
                        onPress={() => {
                            navigation.toggleDrawer();
                        }}
                    >
                        {
                            (firstInitial)
                                ? <Avatar.Text size={40} label={firstInitial} />
                                : <Avatar.Image
                                    source={
                                        require('../../assets/app-icon.png')
                                    }
                                    size={50}
                                />
                        }
                    </TouchableOpacity>
                    <Title style={styles.title}>{name || 'Rozy'}</Title>
                    {/* <Caption style={styles.caption}>@</Caption>
                    <View style={styles.row}>
                        <View style={styles.section}>
                            <Paragraph style={[styles.paragraph, styles.caption]}>
                                202
                            </Paragraph>
                            <Caption style={styles.caption}>Obserwuje</Caption>
                        </View>
                        <View style={styles.section}>
                            <Paragraph style={[styles.paragraph, styles.caption]}>
                                159
                            </Paragraph>
                            <Caption style={styles.caption}>Obserwujący</Caption>
                        </View>
                    </View> */}
                </View>
                <Drawer.Section style={styles.drawerSection}>
                    <DrawerItem
                        icon={({ color, size }) => (
                            <MaterialCommunityIcons
                                name="account-outline"
                                color={color}
                                size={size}
                            />
                        )}
                        label="Contact Card"
                        onPress={() => navigation.navigate('ContactCard')}
                    />
                    {/* <DrawerItem
                        icon={({ color, size }) => (
                            <MaterialCommunityIcons name="tune" color={color} size={size} />
                        )}
                        label="Preferences"
                        onPress={() => { }}
                    />
                    <DrawerItem
                        icon={({ color, size }) => (
                            <MaterialCommunityIcons
                                name="bookmark-outline"
                                color={color}
                                size={size}
                            />
                        )}
                        label="Bookmarks"
                        onPress={() => { }}
                    /> */}
                </Drawer.Section>
                {/* <Drawer.Section title="Preferences">
                    <TouchableRipple onPress={toggleTheme}>
                        <View style={styles.preference}>
                            <Text>Dark Theme</Text>
                            <View pointerEvents="none">
                                <Switch value={theme === 'dark'} />
                            </View>
                        </View>
                    </TouchableRipple>
                    <TouchableRipple onPress={toggleRTL}>
                        <View style={styles.preference}>
                            <Text>RTL</Text>
                            <View pointerEvents="none">
                                <Switch value={rtl === 'right'} />
                            </View>
                        </View>
                    </TouchableRipple>
                </Drawer.Section> */}
            </Animated.View>
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        marginTop: 20,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});

export default DrawerContent;