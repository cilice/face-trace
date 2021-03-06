import React, { Component } from 'react'
import Navigation from './components/Navigation/Navigation';
import Rank from './components/Rank/Rank';
import ImageInputForm from './components/ImageInputForm/ImageInputForm.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';


import './App.css';

const app = new Clarifai.App({apiKey: '7008eee28f0040098f61cf606569b149'});

// console.log(response.outputs[0].data.regions[0].region_info.bounding_box);

class App extends Component {

  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFaceOutput = data.outputs[0].data.regions[0].region_info.bounding_box;
    console.log("Position of the detected face(s):", clarifaiFaceOutput);
  }

  onInputChange = (event) => {
    // this will be called by the ImageInputForm element whenever the input inside of that component changes
    // set state input to the value of the inputfield
    this.setState( {input: event.target.value} );
  }

  setUrl = (event) => {
    // will be called by the ImageInputForm Component when the button is clicked
    this.setState(
      { imageUrl: this.state.input }, 
      () => { this.detectFaces() }
    )
  }

  detectFaces = () => {
     // detect face with api
     app.models
     .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
         .then( 
            (response) => this.calculateFaceLocation(response), 
            (err) => console.log("there was an error", err)
          );  
  }

  render() {
    return (
      <div className="App">
        <Particles className="particles"/>
        <Navigation />
        <h1>Welcome To Facetrace</h1>
        <Rank />
        <ImageInputForm onInputChange={this.onInputChange} onDetectClicked={this.setUrl}/>
        <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
