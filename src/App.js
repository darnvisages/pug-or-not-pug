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

const initialState = {
    input: '',
    imageUrl: '',
    boxes: {},
    isPug: false,
    route: 'signin',
    isSignedIn: false,
    isThinking: true,
    user: {
      id: '',
      name: '',
      email: '',
      password: 'cookies',
      entries: 0,
      joined: ''
    }
  }

class App extends Component {
  constructor () {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  calculateFaceLocation = (response) => {
    const clarifaiFaces = response.outputs[0].data.regions;
    let returnBoxes = {};
    try {
      returnBoxes = clarifaiFaces.map(region => {
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
    } catch (err) {
      // nothing to do 
    }
    return returnBoxes;
  }

  displayFaceBox = (boxes) => {
    console.log('boxes:', boxes);
    this.setState({boxes: boxes});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  keyPressed = (event) => {
    if (event.key === "Enter") {
      this.onButtonSubmit()
    }
  }

  onButtonSubmit = () => {
    this.setState({isThinking: true});
    this.setState({imageUrl: this.state.input});

    // get general model data for dog/pug
    fetch('https://thawing-depths-15865.herokuapp.com/image/pug', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
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
        this.setState({isPug: 'pug' in results});
        this.setState({isThinking: false});
        console.log('pug search results', results);
      });
    
    // get facial recognition data
    fetch('https://thawing-depths-15865.herokuapp.com/image/faces', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
          if (response) {
            fetch('https://thawing-depths-15865.herokuapp.com/profile/update', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, {entries: count}))
            })
            .catch(console.log)
          }
          this.displayFaceBox(this.calculateFaceLocation(response));
        })
      .catch(err => console.log(err))
  }

  onRouteChange = (route) => {
    if (route === 'signin') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  render () {
    const { isSignedIn, imageUrl, route, boxes, isPug, isThinking } = this.state;
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
            <Rank 
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onKeyPress={this.keyPressed}
              onButtonSubmit={this.onButtonSubmit}
            />
            <PugRecognition 
              isThinking={isThinking} 
              isPug={isPug} 
              boxes={boxes}
              imageUrl={imageUrl} 
            />
          </div>
          : (
            route === 'signin' 
            ? <SignIn 
                loadUser={this.loadUser}
                onRouteChange={this.onRouteChange} 
              />
            : <Register 
                loadUser={this.loadUser}
                onRouteChange={this.onRouteChange} 
              />
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
  }
}

export default App;
