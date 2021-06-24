import React, { Component } from "react";
import {View} from "react-native";
import Svg, { G, Circle, Rect } from 'react-native-svg';

class SvgComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            theX:0,
            theY:0,
            theR:10,
            timer:null
        };
        this.manageTimer = this.manageTimer.bind(this);


    }

    componentDidMount() {
        console.log("in svg componentDidMount, props = " + JSON.stringify(this.props));

        if(this.props.pictureId > 0) {
            const t = setInterval(this.manageTimer, 15);
            console.log("in svg componentDidMount, t = " + t);
            this.setState({ timer:t });
        }

    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    manageTimer() {
        let x = -1 + Math.random() * 2;
        let y = -1 + Math.random() * 2;
        let r = -1 + Math.random() * 2;
        let temp = this.state.theX + x;
        if(temp > 100 || temp < 0) x *= -1;
        x = this.state.theX + x;
        temp = this.state.theY + y;
        if(temp > 250 || temp < 0) y *= -1;
        y = this.state.theY + y;
        temp = this.state.theR + r;
        if(temp > 50 || temp < 3) r *= -1;
        r = this.state.theR + r;
        //console.log("x = "+x,"y = "+y,"r = "+r );
        this.setState({
            theX:x,
            theY:y, 
            theR:r
        });
    }
    render() {
        //console.log("in SVG Component")
        return (
            <View>
            <Svg height="100%" width="100%" viewBox="0 0 100 250" >
            <G>
              <Rect x="0" y="0" width="70" height="100" stroke="red" strokeWidth="2" fill="yellow" />
              <Circle cx="50" cy="50" r="45" stroke="blue" strokeWidth="2.5" fill="green" />
              <Circle cx={this.state.theX} cy={this.state.theY} r={this.state.theR} stroke="blue" strokeWidth="2.5" fill="white" />
              </G>
            </Svg>
            </View>
          );
    
    }
}
export default SvgComponent;