import React, { Component } from "react";
import { FlatList, View, Text } from "react-native";
import { Tile } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import Loading from "./LoadingComponent";
import { selectPicture } from "../redux/ActionCreators";

import * as Animatable from "react-native-animatable";

const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        pictures: state.pictures
    };
};
const mapDispatchToProps = {
    selectPicture: pictureId => (selectPicture(pictureId))
};

class Directory extends Component {
    static navigationOptions = {
        title: "Directory"
    };
    render() {
        const { navigate } = this.props.navigation;

        const renderDirectoryItem = ({ item }) => {
            console.log("in Directory component, item = ", JSON.stringify(item));

            return (
                <Animatable.View animation="fadeInRightBig" duration={2000}>
                    <Tile
                        title={item.name}
                        onPress={() => {
                            console.log("in onpress , item = ", JSON.stringify(item));

                            this.props.selectPicture(item.id);
                            console.log("in onpress.2 , item = ", JSON.stringify(item));
                            navigate("CampsiteInfo", { campsiteId: item.id });
                        }
                        }
                        imageSrc={{ uri: baseUrl + item.image }}
                    />
                </Animatable.View>
            );
        };
        if (this.props.pictures.isLoading) {
            return (
                <Loading />
            );
        }
        else if (this.props.pictures.errMess) {
            return (
                <View>
                    <Text>{this.props.pictures.errMess}</Text>
                </View>
            );
        }
        console.log("in Directory component, props = ", JSON.stringify(this.props.pictures));

        return (
            <FlatList
                data={this.props.pictures.pictures}
                renderItem={renderDirectoryItem}
                keyExtractor={item => item.id.toString()}
            />
        );

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Directory);