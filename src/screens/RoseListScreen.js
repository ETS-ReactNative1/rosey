import React, { useContext } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Chip, IconButton, Searchbar } from 'react-native-paper';
import { Context as RoseContext } from '../context/RoseContext';
import { theme } from '../core/theme';
import useListFilters from '../hooks/useListFilters';
import RoseListItem from '../paper-components/RoseListItem';

const RoseListScreen = ({ navigation }) => {

    const { state: { roses }, fetchAllRoses } = useContext(RoseContext);

    const { primary, secondary, error } = theme.colors;

    const [
        filteredRoses, filterToggle, setFilterToggle, filterItems, searchQuery, setSearchQuery
    ] = useListFilters(roses, fetchAllRoses);

    return (
        <View style={styles.container}>
            <View style={styles.firstRow}>
                <Searchbar
                    autoCapitalize={"none"}
                    autoCorrect={false}
                    placeholderTextColor={error}
                    placeholder="Search"
                    iconColor={error}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    style={styles.searchBar}
                />
                <IconButton
                    icon="image-filter-vintage"
                    onPress={() => setFilterToggle(!filterToggle)}
                    style={styles.filterIcon}
                    size={35}
                    color={error}
                />
            </View>
            {
                (filterToggle) &&
                <View style={styles.filterChips}>
                    <Chip onPress={() => filterItems('name')}>Name</Chip>
                    <Chip onPress={() => filterItems('email')}>Email</Chip>
                    <Chip onPress={() => filterItems('nickName')}>Nickname</Chip>
                    {/* // TODO: */}
                    {/* <Chip onPress={() => setFilterToggle('Date')}>Date Met</Chip> */}

                </View>
            }
            {
                (filteredRoses && filteredRoses.length > 0) && <FlatList
                    data={filteredRoses}
                    keyExtractor={(item) => (item.roseId)}
                    renderItem={({ item }) => {
                        return (<RoseListItem rose={item} />)
                    }}
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        marginBottom: 20
    },
    firstRow: {
        flexDirection: 'row',
        marginTop: 20,
        // justifyContent: 'space-around',
    },
    searchBar: {
        marginLeft: 20,
        width: '75%'
    },
    // filterIcon: {
    //     color: theme.primary,
    // },
    filterChips: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-evenly'
    }
});

export default RoseListScreen;