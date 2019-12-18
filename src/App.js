import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
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
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    console.log('click');
    app.models.initModel({id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"})
      .then(generalModel => {
        return generalModel.predict(this.state.input);
      })
      .then(response => {
        console.log(response);
        var concepts = response['outputs'][0]['data']['concepts'];
        let results = concepts.filter(c => c.name === 'pug' || c.name === 'dog');

        console.log(results);
      });
      app.models
        .predict(
          Clarifai.FACE_DETECT_MODEL,
          this.state.input)
        .then(
          function(response) {
            console.log(response);
          },
          function(err) {
            //there was an error
          }
          );
  }

  render () {
    return (
      <div className="App">
        <Particles 
            className='particles'
            params={particleOptions} />
        <div className='container'>
          <Logo />
          <Title />
          <Navigation />
        </div>
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit}
        />
        <PugRecognition imageUrl={this.state.imageUrl} />
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
