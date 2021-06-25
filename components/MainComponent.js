import React, {Component} from "react";
import Directory from "./DirectoryComponent";
import ShowPicture from "./ShowPictureComponent";
import {View, Platform, StyleSheet, Text, ScrollView, Image } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { Icon } from "react-native-elements";
import SafeAreaView from "react-native-safe-area-view";
import {connect} from "react-redux";
import { fetchPictures } from "../redux/ActionCreators";

const mapDispatchToProps = {
    fetchPictures
};

const DirectoryNavigator = createStackNavigator(
    {
        Directory: {
            screen: Directory,
            navigationOptions: ({navigation}) => ({
                headerLeft: <Icon
                    name="list"
                    type="font-awesome"
                    iconStyle={styles.stackIcon}
                    onPress={() => navigation.toggleDrawer()}
                />
            })
        },
        ShowPicture: {screen: ShowPicture}
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

const ShowPictureNavigator = createStackNavigator(
    {
        ShowPicture: {screen: ShowPicture}
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: "#5637DD"
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                color:"#fff"
            },
            headerLeft: <Icon
            name="home"
            type="font-awesome"
            iconStyle={styles.stackIcon}
            onPress={() => navigation.toggleDrawer()}
            initialParams={{ pictureId: 0 }}
            />

        })
    }

);



const CustomDrawerContentComponent = props => (
    <ScrollView>
        <SafeAreaView
        style={styles.container}
        forceInset={{top: "always", horizontal: "never"}}>
            <View style={styles.drawerHeader}>
                <View style={{flex: 1}}>
                    <Image
                    source={require("./images/logo.png")}
                    style={styles.drawerImage} />
                </View>
                <View style={{flex: 2}}>
                    <Text style={styles.drawerHeaderText}>NuCamp</Text>
                    
                </View>
            </View>
            <DrawerItems {...props} />

        </SafeAreaView>
    </ScrollView>

);

const MainNavigator = createDrawerNavigator(
    {
        Directory: {
            screen: DirectoryNavigator,
            navigationOptions: {
                drawerLabel: "Photo Gallery",
                drawerIcon: ({tintColor}) => (
                    <Icon
                    name="list"
                    type="font-awesome"
                    size={24}
                    color={tintColor}
                    />
                )
            }

        },
        ShowPicture: {
            screen: ShowPictureNavigator,
            navigationOptions: {
                drawerLabel: "Display Picture",
                drawerIcon: ({tintColor}) => (
                    <Icon
                    name="tree"
                    type="font-awesome"
                    size={24}
                    color={tintColor}
                    initialParams={{ pictureId: 0 }}
                    />
                )
            }

        },

    },
    {
        drawerBackgroundColor: "#CEC8FF",
        contentComponent: CustomDrawerContentComponent,
        initialRouteName:"ShowPicture"
    }
);

const AppNavigator = createAppContainer(MainNavigator);

class Main extends Component {

    componentDidMount() {
        this.props.fetchPictures();
    }

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

const styles = StyleSheet.create( {
    container: {
        flex: 1
    },
    drawerHeader: {
        backgroundColor: "#5647DD",
        height: 140,
        alignItems: "center",
        justifyContent: "center",
        flex: 1, 
        flexDirection: "row"
    },
    drawerHeaderText: {
        color: "#fff", 
        fontSize: 24, 
        fontWeight: "bold"
    },
    drawerImage: {
        margin: 10,
        height: 60,
        width: 60
    },
    stackIcon: {
        marginLeft: 10, 
        color: "#fff",
        fontSize: 24
    }
});

export default connect(null, mapDispatchToProps)(Main);