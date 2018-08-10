import React, { Component } from 'react';

class Quote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      quote: '',
      episode: 0,
      season: 0,
      speaker: ''
    };
  }

  componentDidMount() {
    fetch('/api/random-quote')
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            quote: result.line_text,
            episode: result.episode,
            season: result.season,
            speaker: result.speaker
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <h1>{this.state.quote}</h1>
          <p>
            {' '}
            - {this.state.speaker}, season {this.state.season}, episode{' '}
            {this.state.episode}
          </p>
        </div>
      );
    }
  }
}

export default Quote;
