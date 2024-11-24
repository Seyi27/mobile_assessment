import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomNavList} from '../types/type';
import Home from '../screens/Home';
import Search from '../screens/Search';
import Trend from '../screens/Trend';
import Order from '../screens/Order';
import Profile from '../screens/Profile';
import {NavigationContainer} from '@react-navigation/native';

const Bottom = createBottomTabNavigator<BottomNavList>();

const RootStack = () => {
  return (
    <NavigationContainer>
      <Bottom.Navigator
        initialRouteName="search"
        screenOptions={{headerShown: false}}>
        <Bottom.Screen
          name="home"
          component={Home}
          options={{
            tabBarLabel: ({focused}) => (
              <Text
                style={[
                  styles.tabBarLabel,
                  focused && styles.tabBarLabelFocused,
                ]}>
                Home
              </Text>
            ),
            tabBarIcon: ({focused}) => (
              <View>
                {focused ? (
                  <Image
                    source={require('../assets/home_active.png')}
                    style={{width: 25, height: 25}}
                  />
                ) : (
                  <Image
                    source={require('../assets/home.png')}
                    style={{width: 25, height: 25}}
                  />
                )}
              </View>
            ),
          }}
        />
        <Bottom.Screen
          name="search"
          component={Search}
          options={{
            tabBarLabel: ({focused}) => (
              <Text
                style={[
                  styles.tabBarLabel,
                  focused && styles.tabBarLabelFocused,
                ]}>
                Search
              </Text>
            ),
            tabBarIcon: ({focused}) => (
              <View>
                {focused ? (
                  <Image
                    source={require('../assets/search_active.png')}
                    style={{width: 20, height: 20, resizeMode: 'contain'}}
                  />
                ) : (
                  <Image
                    source={require('../assets/search.png')}
                    style={{width: 20, height: 20, resizeMode: 'contain'}}
                  />
                )}
              </View>
            ),
          }}
        />
        <Bottom.Screen
          name="trend"
          component={Trend}
          options={{
            tabBarLabel: ({focused}) => (
              <Text
                style={[
                  styles.tabBarLabel,
                  focused && styles.tabBarLabelFocused,
                ]}>
                Trend
              </Text>
            ),
            tabBarIcon: ({focused}) => (
              <View>
                {focused ? (
                  <Image
                    source={require('../assets/trend_active.png')}
                    style={{width: 20, height: 20}}
                  />
                ) : (
                  <Image
                    source={require('../assets/trend.png')}
                    style={{width: 20, height: 20, resizeMode: 'contain'}}
                  />
                )}
              </View>
            ),
          }}
        />
        <Bottom.Screen
          name="order"
          component={Order}
          options={{
            tabBarLabel: ({focused}) => (
              <Text
                style={[
                  styles.tabBarLabel,
                  focused && styles.tabBarLabelFocused,
                ]}>
                Order{' '}
              </Text>
            ),
            tabBarIcon: ({focused}) => (
              <View>
                {focused ? (
                  <Image
                    source={require('../assets/order_active.png')}
                    style={{width: 30, height: 30}}
                  />
                ) : (
                  <Image
                    source={require('../assets/order.png')}
                    style={{width: 20, height: 20, resizeMode: 'contain'}}
                  />
                )}
              </View>
            ),
          }}
        />
        <Bottom.Screen
          name="profile"
          component={Profile}
          options={{
            tabBarLabel: ({focused}) => (
              <Text
                style={[
                  styles.tabBarLabel,
                  focused && styles.tabBarLabelFocused,
                ]}>
                Profile
              </Text>
            ),
            tabBarIcon: ({focused}) => (
              <View>
                {focused ? (
                  <Image
                    source={require('../assets/profile_active.png')}
                    style={{width: 30, height: 30}}
                  />
                ) : (
                  <Image
                    source={require('../assets/profile.png')}
                    style={{width: 20, height: 20, resizeMode: 'contain'}}
                  />
                )}
              </View>
            ),
          }}
        />
      </Bottom.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;

const styles = StyleSheet.create({
  tabBarLabel: {
    fontSize: 14,
    color: 'black', // Default color
  },
  tabBarLabelFocused: {
    color: '#12AF37', // Color when focused
  },
});
