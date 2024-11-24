import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import axios from 'axios';

const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // API Fetch Function
  const fetchProducts = async () => {
    const response = await axios.get('https://fakestoreapi.com/products');
    return response.data;
  };

  const fetchCategories = async () => {
    const response = await axios.get(
      'https://fakestoreapi.com/products/categories',
    );
    return response.data;
  };

  // Fetch products
  const {
    data: productsData,
    isLoading: productsLoading,
    isError: productsError,
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  // Fetch categories
  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  // Handle loading and error states
  if (productsLoading || categoriesLoading) return <Text>Loading...</Text>;
  if (productsError || categoriesError) return <Text>Error fetching data</Text>;

  console.log('Products:', productsData);
  console.log('Categories:', categoriesData);

  // Define an array of background colors
  const backgroundColors = ['#FFCCCB', '#FFB6C1', '#FF6347', '#FFD700'];

  // Combine categories and products
  const combinedData = [
    ...categoriesData.map((category: string, index: number) => ({
      type: 'category',
      name: category,
      color: backgroundColors[index % backgroundColors.length], // Loop through colors
    })),
    ...productsData.map((product: any) => ({
      type: 'product',
      ...product,
    })),
  ];

  // Filtered products based on search value
  const filteredData = combinedData.filter((item: any) => {
    if (item.type === 'category') {
      return item.name.toLowerCase().includes(searchValue.toLowerCase());
    } else if (item.type === 'product') {
      return item.title.toLowerCase().includes(searchValue.toLowerCase());
    }
    return false;
  });

  // Handle search
  const handleSearch = () => {
    if (searchValue.trim() === '') return;

    // Add search value to history if it doesn't already exist
    if (!searchHistory.includes(searchValue)) {
      setSearchHistory(prevHistory => [...prevHistory, searchValue]);
    }
    setSearchValue('');
  };

  // Clear search history
  const clearSearchHistory = () => {
    setSearchHistory([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <View style={styles.searchInput}>
            <Image
              source={require('../assets/search.png')}
              style={{
                width: 25,
                height: 25,
                resizeMode: 'contain',
                paddingRight: 10,
              }}
            />

            <TextInput
              value={searchValue}
              placeholder="Search products or Categories"
              onChangeText={text => setSearchValue(text)}
              onSubmitEditing={handleSearch} // Trigger search on Enter
              style={{color: 'orange'}}
            />
          </View>

          <View style={{padding: 20}}>
            <Image
              source={require('../assets/sideicon.png')}
              style={{width: 20, height: 20}}
            />
          </View>
        </View>

        {/* Search History */}
        <View style={styles.searchHistoryContainer}>
          <Text style={styles.searchHistoryText}>Search History</Text>
          <TouchableOpacity onPress={clearSearchHistory}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        </View>

        {searchHistory.length > 0 && (
          <FlatList
            data={searchHistory}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <View style={styles.historyItem}>
                <Text style={styles.historyText}>{item}</Text>
              </View>
            )}
          />
        )}

        {/* Render Combined Products and Categories */}
        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          renderItem={({item}) => {
            if (item.type === 'category') {
              return (
                <View style={[styles.card, {backgroundColor: item.color}]}>
                  <Text style={styles.categoryTitle}>{item.name}</Text>
                </View>
              );
            } else if (item.type === 'product') {
              return (
                <View style={styles.card}>
                  <Image
                    source={{uri: item.image}}
                    style={{width: 70, height: 70, objectFit: 'cover'}}
                  />
                  <Text style={styles.title} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text>{item.price} USD</Text>
                  <View style={styles.add}>
                    <Text style={styles.addText}>+</Text>
                  </View>
                </View>
              );
            }
            return null;
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    paddingHorizontal: 10,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchButton: {
    backgroundColor: '#087319',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  searchHistoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  searchHistoryText: {
    fontSize: 18,
    fontWeight: '700',
  },
  clearText: {
    color: 'orange',
  },
  historyItem: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 5,
  },
  historyText: {
    fontSize: 14,
    color: '#8688897A',
    padding: 10,
  },
  card: {
    width: 170,
    height: 240,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor: '#E2E2E2',
    borderWidth: 1,
    padding: 10,
    margin: 5,
  },
  add: {
    backgroundColor: '#087319',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
    borderRadius: 10,
  },
  addText: {
    color: 'white',
    fontSize: 25,
  },
  title: {
    paddingVertical: 5,
  },
  categoryTitle: {
    fontSize: 20,
  },
});
