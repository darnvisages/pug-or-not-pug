import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import SignIn from './components/SignIn/SignIn.js';
import Register from './components/Register/Register.js';
import Rank from './components/Rank/Rank.js';
import Title from './components/Title/Title.js';
import PugRecognition from './components/PugRecognition/PugRecognition.js';
import './App.css';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
 apiKey: '85b2c0bb35bb4922b6c1166ab9c63611'
});

class App extends Component {
  constructor () {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      boxes: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (response) => {
    const clarifaiFaces = response.outputs[0].data.regions;
    return clarifaiFaces.map(region => {
      const clarifaiFace = region.region_info.bounding_box;
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
      console.log(width, height);
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }
    }) 
  }

  displayFaceBox = (boxes) => {
    console.log('boxes:', boxes);
    this.setState({boxes: boxes});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});

    // get general model data for dog/pug
    app.models.initModel({id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"})
      .then(generalModel => {
        return generalModel.predict(this.state.input);
      })
      .then(response => {
        console.log(response);
        let concepts = response['outputs'][0]['data']['concepts'];
        let results = {};
        concepts.map(c => {
          if (c.name === 'pug') {
            results['pug'] = c.value;
          }
          else if (c.name === 'dog') {
            results['dog'] = c.value;
          }
          }
        );

        console.log(results);
      });
    
    // get facial recognition data
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err))
      
  }

  onRouteChange = (route) => {
    if (route === 'signin') {
      this.setState({isSignedIn: false});
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  render () {
    const { isSignedIn, imageUrl, route, boxes } = this.state;
    return (
      <div className="App">
        
        <Particles 
            className='particles'
            params={particleOptions} />
        <div className='container'>
          <Logo />
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
        </div>
        <Title />
        { 
          route === 'home' 
          ? <div id="home">
            <Rank />
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onButtonSubmit={this.onButtonSubmit}
            />
            <PugRecognition 
              boxes={boxes}
              imageUrl={imageUrl} 
            />
          </div>
          : (
            route === 'signin' 
            ? <SignIn onRouteChange={this.onRouteChange} />
            : <Register onRouteChange={this.onRouteChange} />
          )
        
        }
      </div>
    );
  }
}

const particleOptions = {
  "particles": {
    "number": {
      "value": 160,
      "density": {
        "enable": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "speed": 4,
        "size_min": 0.3
      }
    },
    "line_linked": {
      "enable": false
    },
    "move": {
      "random": true,
      "speed": 1,
      "direction": "top",
      "out_mode": "out"
    }
  },
  "interactivity": {
    "events": {
      "onhover": {
        "enable": true,
        "mode": "bubble"
      },
      "onclick": {
        "enable": true,
        "mode": "repulse"
      }
    },
    "modes": {
      "bubble": {
        "distance": 250,
        "duration": 2,
        "size": 0,
        "opacity": 0
      },
      "repulse": {
        "distance": 400,
        "duration": 4
      }
    }
  }
}

export default App;
