import React, {Component} from "react";
import Directory from "./DirectoryComponent";
import CampsiteInfo from "./CampsiteInfoComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import About from "./AboutComponent";
import {View, Platform} from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";

const DirectoryNavigator = createStackNavigator(
    {
        Directory: {screen: Directory},
        CampsiteInfo: {screen: CampsiteInfo},
        Contact: {screen: Contact},
        About: {screen: About}
    },
    {
        initialRouteName: "Directory",
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: "#5637DD"
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                color:"#fff"
            }
        }
    }

);

const HomeNavigator = createStackNavigator(
    {
        Home: {screen: Home}
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: "#5637DD"
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                color:"#fff"
            }
        }
    }

);

const AboutNavigator = createStackNavigator(
    {
        About: {screen: About}
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: "#5637DD"
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                color:"#fff"
            }
        }
    }

);
const ContactNavigator = createStackNavigator(
    {
        Contact: {screen: Contact}
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: "#5637DD"
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                color:"#fff"
            }
        }
    }

);

const MainNavigator = createDrawerNavigator(
    {
        Home: {screen: HomeNavigator},
        Directory: {screen: DirectoryNavigator},
        Contact: {screen: ContactNavigator},
        About: {screen: AboutNavigator}
    },
    {
        drawerBackgroundColor: "#CEC8FF"
    }
);

const AppNavigator = createAppContainer(MainNavigator);

class Main extends Component {
    render() {
        return (
            <View 
            style={{
                flex:1,
                paddingTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight
            }}
            >
                <AppNavigator />
            </View>
            
            );
    }
}
export default Main;