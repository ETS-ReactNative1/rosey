import React from 'react';
import { Linking, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import useCalendar from '../../hooks/useCalendar';
import { Button, Divider } from 'react-native-paper';
import RoseViewField from '../partial/RoseViewField';
import moment from 'moment';
import { SocialIcon } from 'react-native-elements'

const RoseView = ({ user, view_updateFunction, view_updateFunctionText,
    view_secondFunction, view_secondFunctionText,
    view_updateFunction_callback
}) => {

    const { birthday, dateMet, email, homeLocation, name, nickName, notes, phoneNumber, placeMetAt, picture, socialProfiles, tags, work } = user || {};
    const { homeLocationCoords, homeFormatted_address, homeLocationName } = homeLocation || {};
    const { placeMetAtLocationCoords, placeMetAtFormatted_address, placeMetAtName } = placeMetAt || {};

    const [rozyCalendar, createEvent] = useCalendar();

    // TODO: move to constants?
    //
    // ─── FUNCTIONS ──────────────────────────────────────────────────────────────────
    //
    const _formatPhonenumber = (phone) => {
        const cleaned = ('' + phone).replace(/\D/g, '')
        const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
        if (match) {
            const intlCode = (match[1] ? '+1 ' : '');
            const formattedNumber = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
            return formattedNumber;
        }
    }
    // ────────────────────────────────────────────────────────────────────────────────

    const viewRows = [
        {
            value: name || '(No-Name?)', subtitle: 'name',
            left: "account",
            rightIcon: "account-plus",
            rightFunc: () => { },
        },
        {
            value: nickName || '(No-nickName?)', subtitle: 'nickname',
            left: "account",
            // rightIcon: "account-plus",
            rightFunc: () => { },
        },
        {
            value: _formatPhonenumber(phoneNumber), subtitle: 'phone',
            left: "phone",
            // TODO: country code?
            rightIcon: "phone",
            rightFunc: () => { Linking.openURL(`tel:${phoneNumber}`) },
            secondRightIcon: "message-text",
            secondRightFunc: () => { Linking.openURL(`sms:${phoneNumber}`) },
        },
        {
            value: email, subtitle: 'email',
            left: "email",
            rightIcon: "email",
            rightFunc: () => {
                Linking.openURL(`mailto:${email}`)
            },
        },
        {
            value: work || '(Add Occupation!)', subtitle: 'occupation',
            left: "briefcase-account",
            // rightIcon: "briefcase-plus",
            rightFunc: () => { },
        },
        {
            value: (tags && tags.length > 0) ? tags.join(', ') : '(Add some Tags!)', subtitle: 'tags',
            // value: updated_tags, subtitle: 'Add tags (by commas) ',
            left: "tag",
            // rightIcon: "tag",
        },
        {
            value: notes || '(Add some notes!)', subtitle: 'notes',
            left: "note",
            // rightIcon: "note",
            rightFunc: () => { },
        },
        {
            value: dateMet ? (moment(dateMet).format('MMM DD, YYYY')) : '(Enter Date met!)', subtitle: 'date met',
            left: "calendar",
            rightIcon: "calendar-heart",
            rightFunc: () => { if (dateMet) createEvent(dateMet, 'date_met', name, placeMetAtFormatted_address) },
        },
        {
            value: birthday ? (moment(birthday).format('MMM DD, YYYY')) : '(Enter Birthday!)', subtitle: 'birthday',
            left: "calendar",
            rightIcon: "calendar-heart",
            rightFunc: () => { if (birthday) createEvent(birthday, 'birthday', name, placeMetAtFormatted_address) },
        },
        {
            value: homeFormatted_address, subtitle: 'home location',
            left: "crosshairs-gps",
            rightIcon: "crosshairs-gps",
            rightFunc: () => {
                const url = Platform.select({
                    ios: `maps:0,0?q=${homeFormatted_address}`,
                    android: `geo:0,0?q=${homeFormatted_address}`,
                })
                Linking.openURL(url)
            },
        },
        {
            value: placeMetAtFormatted_address, subtitle: 'place met',
            left: "crosshairs-gps",
            rightIcon: "crosshairs-gps",
            rightFunc: () => {
                const url = Platform.select({
                    ios: `maps:0,0?q=${placeMetAtFormatted_address}`,
                    android: `geo:0,0?q=${placeMetAtFormatted_address}`,
                })
                Linking.openURL(url)
            },
        },
    ];

    const isUserContactCard = (view_updateFunctionText === 'Update your contact card');
    const contactCardRowsToIgnore = ['notes', 'date met', 'place met', 'tags']

    // https://app.urlgeni.us/

    const { facebook, linkedin, instagram, snapchat, twitter, whatsapp } = socialProfiles || {};
    console.log(socialProfiles);

    const socialLinkedIcons = [
        { type: 'facebook', value: facebook, appUrl: `fb://profile?username=${facebook}`, webUrl: `https://facebook.com/${facebook}` },
        { type: 'linkedin', value: linkedin, appUrl: `linkedin://in/${linkedin}/`, webUrl: `https://linkedin.com/in/${linkedin}/` },
        { type: 'instagram', value: instagram, appUrl: `instagram://user?username=${instagram}`, webUrl: `https://instagram.com/${instagram}` },
        { type: 'snapchat', value: snapchat, appUrl: `snapchat://add/${snapchat}`, webUrl: `https://www.snapchat.com/add/${snapchat}` },
        { type: 'twitter', value: twitter, appUrl: `twitter://user?screen_name=${twitter}`, webUrl: `https://twitter.com/${twitter}` },
        { type: 'whatsapp', value: whatsapp, appUrl: `https://wa.me/${whatsapp}`, webUrl: `https://wa.me/${whatsapp}` }
    ];

    return (
        <ScrollView>
            {/* Social Section */}
            <View style={styles.socialMediaSection}>
                {
                    socialLinkedIcons.map(({ appUrl, type, value, webUrl }) => (
                        <TouchableOpacity key={type} style={{ marginHorizontal: 10 }} onPress={() => {
                            if (!value) {
                                return;
                            } else {
                                Linking.canOpenURL(appUrl)
                                    .then((supported) => Linking.openURL((supported) ? appUrl : webUrl))
                                    .catch((err) => console.error('An error occurred', err))
                            }
                        }}
                        >
                            <SocialIcon
                                raised
                                light
                                style={{
                                    opacity: (value && (appUrl || webUrl)) ? 1 : .4,
                                }}
                                type={type}
                            />
                        </TouchableOpacity>
                    ))
                }
            </View>
            <Divider />
            {/* Fields Section */}
            {
                viewRows.map(({ value, subtitle, left, rightIcon, secondRightIcon, rightFunc, secondRightFunc }) => (
                    ((isUserContactCard && !contactCardRowsToIgnore.includes(subtitle) || !isUserContactCard))
                        ? (isUserContactCard)
                            ? <RoseViewField
                                key={subtitle}
                                value={value}
                                subtitle={subtitle}
                                left={left}
                            />
                            : <RoseViewField
                                key={subtitle}
                                value={value}
                                subtitle={subtitle}
                                left={left}
                                rightIcon={rightIcon}
                                rightFunc={rightFunc}
                                secondRightIcon={secondRightIcon}
                                secondRightFunc={secondRightFunc}
                            />
                        : null
                ))
            }
            <Button onPress={view_updateFunction}> {view_updateFunctionText} </Button>
            <Button
                style={{ marginBottom: 10 }}
                onPress={() => {
                    const roseId = user.roseId;
                    view_secondFunction({ roseId, callback: view_updateFunction_callback })
                }}
            > {view_secondFunctionText}
            </Button>
        </ScrollView >
    );
};

const styles = StyleSheet.create({
    socialMediaSection: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 5,
        marginVertical: 10
    },
});

export default RoseView;