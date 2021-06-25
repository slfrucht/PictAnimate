import React, { Component } from "react";
import { Text, View, TouchableOpacity, Dimensions, Modal, Button, StyleSheet, Alert, PanResponder } from "react-native";
import { Tile, Icon, Rating, Input, withTheme } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import SvgComponent from "./SvgComponent";

const mapStateToProps = state => {
    return {
        pictures: state.pictures
    };
};

const win = Dimensions.get("window");

function RenderSvg(props) {
    const { pictureId } = props;
    if (pictureId > 0) {
        return (
            <View>
                <SvgComponent pictureId={pictureId} />
            </View>

        );
    }
    else {
        return (
            <View style={styles.rectangle} />
        );
    }
}

function RenderPicture(props) {
    const { picture } = props;


    if (picture) {
        return (
            <View>

                <Tile
                    title={picture.name}
                    titleStyle={{ textAlign: "center" }}
                    imageSrc={{ uri: baseUrl + picture.image }}
                    height={win.height * .75}>

                </Tile>

            </View>
        )
    }
    return <View />;
}

class ShowPicture extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pictId: 0
        };

    }
    componentDidMount() {
        console.log("in show picture pict = ", this.props.navigation.getParam("pictureId"))
        const id = this.props.navigation.getParam("pictureId");
        const pictureId = id ? id : 0;
        this.setState({ pictId: pictureId });

    }

    static navigationOptions = {
        title: "Display Picture"
    };


    render() {
        const { navigate } = this.props.navigation;
        const pictureId = this.state.pictId;
        const picture = this.props.pictures.pictures.filter(picture => picture.id === pictureId)[0];

        return (
            <View>
                <TouchableOpacity
                    onPress={() => {
                        navigate("Directory");
                    }
                    }>

                    <View style={{ zIndex: 10 }}>
                        <RenderSvg pictureId={pictureId} />
                    </View>


                    <View style={{ position: "absolute", zIndex: 2 }}>
                        <RenderPicture picture={picture} />
                    </View>

                </TouchableOpacity>

            </View>
        );
    }

}

const styles = StyleSheet.create({
    cardRow: {
        alignItems: "center",
        justifyContent: "center",
        flex: 2,
        flexDirection: "row",
        margin: 20,
        height: 20
    },
    cardFont: {
        fontSize: 20
    },
    modal: {
        justifyContent: "center",
        margin: 20
    },
    svg: {
        position: "absolute",
        left: 0,
        top: 0
    },
    rectangle: {
        width: "100%",
        height: "100%",
        color: "red",
        opacity:.5
    }
});

export default connect(mapStateToProps)(ShowPicture);