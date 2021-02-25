
import './App.css';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import { Component } from 'react';
import Clarifai from 'clarifai';


const app = new Clarifai.App({
  apiKey: 'd9fd366421bc468789a7d3e3486cb571'
 });

const particlesOptions = {
  particles: {
    number: {
      value: 200,
      density: {
        enagle: true, 
        value_area: 100
      }
    },
    move: {
      speed: 7.7
    }
  }
}

class App extends Component{
  
  constructor(){
    super();
    this.state = {
      input: '',
      imageURL: '', 
      box: {},
      route: 'signin', // keeps track of where we are on the page
      isSignedIn: false,
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input})
    app.models
    .initModel({
      id: Clarifai.FACE_DETECT_MODEL,
    })
    .then((faceDetectModel) => {
      return faceDetectModel.predict(
        this.state.input
      );
    })
    .then((response) => {
      this.displayFaceBox(this.calculateFaceLocation(response));
    });
  }

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState({isSignedIn: false})
    } else if(route === 'home'){
      this.setState({isSignedIn: true})
    }

    this.setState({route: route});
  }

  render(){
    return (
      <div className="App">
              <Particles className='particles' 
                params = {particlesOptions}
              />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        { this.state.route === 'home'  
        ? 
        <div> 
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange}  
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition box={this.state.box} imageURL={this.state.imageURL}/>
       </div>
        :
        (this.state.route === 'signin'
        ? <Signin onRouteChange={this.onRouteChange}/>
        : <Register onRouteChange={this.onRouteChange}/>
        )
        } 
      </div>
    );
  }
  
}

export default App;
