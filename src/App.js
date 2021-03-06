import React, { Component } from "react";
import ClickCard from "./components/ClickCard";
import Wrapper from "./components/Wrapper";
import clickPhotos from "./clickPhotos.json";
import "./App.css";


class App extends Component {

  state = {
    selected: [],
    correctGuesses: 0,
    highScore: 0,
    clickPhotos: clickPhotos
  }



  selectPhoto = id => {
    let correctGuesses = this.state.correctGuesses;
    let highScore = this.state.highScore;
    let clickPhotos = this.state.clickPhotos
    console.log(id);

   // If id !=== to previous id
    if (!this.state.selected.find(function (element) { return element === id; })) {
      this.setState({ selected: [...this.state.selected, id] });

      // increment counter
      correctGuesses = correctGuesses + 1;
      this.setState({ correctGuesses: correctGuesses });
      console.log("guesses:" + correctGuesses);
      console.log(this.state.selected);
      clickPhotos.sort(function (a, b) {
        return 1 - Math.random() * 2;
      });
      this.setState({ clickPhotos: clickPhotos });

    } else { 
      //If clicked twice -reset game -- check high score//
      this.setState({ correctGuesses: 0 })
      console.log("guesses1:" + correctGuesses);
      if (correctGuesses > highScore) { highScore = correctGuesses; }
      this.setState({ highScore: highScore });
      correctGuesses = 0;
      console.log("guesses1:" + correctGuesses);
      this.setState({ clickPhotos: clickPhotos });
      
    }
    // }

  }

  render() {
    return (
      <Wrapper>
{/* navbar--> */}
<div id ="top">
        <nav class="navbar fixed-top navbar-light bg-light" id="headline">
          <a class="navbar-brand" href=""><h1 class="title">Top Click</h1></a>
          <span>Correct Guesses: {this.state.correctGuesses} </span>
          <span> High Score: {this.state.highScore} </span>
        </nav>
</div>
        <div id="title" class="navbar">
          <a><h1 className="title"> </h1></a>
        </div>

{/* card info */}
        <div class="container">
          <div class="row">
            {this.state.clickPhotos.map(clickPhoto =>
              (<ClickCard
                id={clickPhoto.id}
                key={clickPhoto.id}
                name={clickPhoto.name}
                image={clickPhoto.image}
                selectPhoto={this.selectPhoto}

              />)
            )}

          </div>
        </div>
      </Wrapper>
    )
  }
};
export default App;
