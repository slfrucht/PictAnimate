import React, { Component } from "react";
import {Text, View, ScrollView, Dimensions, Modal, Button, StyleSheet, Alert, PanResponder} from "react-native";
import {Tile, Icon, Rating, Input} from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl} from "../shared/baseUrl";
import { animatePicture } from "../redux/ActionCreators";
import * as Animatable from "react-native-animatable";
import SvgComponent from "./SvgComponent";

const mapStateToProps = state => {
    return {
        pictures: state.pictures
    };
};

const mapDispatchToProps = {
    animatePicture: pictureId => (animatePicture(pictureId)),
};

const win = Dimensions.get("window");

function RenderPicture(props) {
    const {picture} = props;

    const view = React.createRef();

    const recognizeDrag = ({dx}) => (dx < -200) ? true : false;

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
            view.current.rubberBand(1000)
            .then(endState => console.log(endState.finished ? "finished" : "canceled"));

        },
        onPanResponderEnd: (e, gestureState) => {
            console.log("gesture end: ", gestureState);
            if(recognizeDrag(gestureState)) {
                Alert.alert(
                    "Are you sure you want to animate" + picture.name + "?",
                    [
                        {
                            text: "Cancel",
                            style: "cancel",
                            onPress: () => console.log("Cancel pressed")
                        },
                        {
                            text: "OK",
                            onPress: () =>  props.animatePict()
                        }
                    ],
                    { cancellable: false }
                )
            }
            return true;
        }
    });

        if(picture) {
            return(
                <View>
                <Tile 
                title={picture.name}
                titleStyle={{textAlign: "center"}}
                imageSrc={{uri: baseUrl + picture.image}}
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

    }

    animatePict(pictureId) {
        this.props.animatePicture(pictureId);
    }


    static navigationOptions = {
        title: "Show Picture"
    };


    render() {
        const pictureId = this.props.navigation.getParam("pictureId");
        const picture = this.props.pictures.pictures.filter(picture => picture.id === pictureId)[0];
 
        return (
            <View opacity={0.75}>                
            <View style={{zIndex:10}}>
            <SvgComponent style={{zIndex:10}} />
            </View>


                <View style={{position:"absolute", zIndex:2}}>
                <RenderPicture picture={picture}   
                animatePict={() => this.animatePict(pictureId)}
                />
                </View>


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
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowPicture);