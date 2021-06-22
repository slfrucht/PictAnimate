import React, { Component } from "react";
import { FlatList, View, Text } from "react-native";
import { Tile } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import Loading from "./LoadingComponent";
import { selectPicture } from "../redux/ActionCreators";
import * as FaceDetector from 'expo-face-detector';
//import { FaceDetector } from 'expo';
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
    constructor(props) {
        super(props);

        this.state = {
            faces: [],
            image: null
        };

        this.selectImage = this.selectImage.bind(this);
        this.detectFaces = this.detectFaces.bind(this);

    }
    static navigationOptions = {
        title: "Directory"
    };

    selectImage(id, uri) {
        this.detectFaces(uri);
        console.log("detected faces in select image: ", JSON.stringify(this.state.faces));

        this.props.selectPicture(id);
    }

    detectFaces = (uri) => {
        console.log("detect faces, uri = " + uri);
        FaceDetector.detectFacesAsync(uri, {
            detectLandmarks: FaceDetector.Constants.Landmarks.none,
            runClassifications: FaceDetector.Constants.Classifications.all,
          })
            .then(this.facesDetected)
            .catch(this.handleFaceDetectionError);
      
    }

  facesDetected = ({ image, faces }) => {
      console.log("in faces detected");
    this.setState({
      faces,
      image
    });
  }
  handleFaceDetectionError = error => {
      console.log("face detection error = "+ error);
  }
    /*
    async detectFaces(uri){
        console.log("in detect faces, uri = ", uri);
        let faces = null;
        const options = { mode: FaceDetector.Constants.Mode.accurate };
        try {
            faces = await FaceDetector.detectFacesAsync(uri, options);
            //return await FaceDetector.detectFacesAsync(uri, options);
        } catch {
            console.log("face detector error");
            //return(null);
        }
        return faces;
      }
    */
    render() {
        const { navigate } = this.props.navigation;

        const renderDirectoryItem = ({ item }) => {
            //console.log("in Directory component, item = ", JSON.stringify(item));

            return (
                <Animatable.View animation="fadeInRightBig" duration={2000}>
                    <Tile
                        title={item.name}
                        onPress={() => {
                            console.log("in onpress , item = ", JSON.stringify(item));

                            this.selectImage(item.id, baseUrl + item.image);
                            console.log("in onpress.2 , item = ", JSON.stringify(item));
                            navigate("ShowPicture", { pictureId: item.id });
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