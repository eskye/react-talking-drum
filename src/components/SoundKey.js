import React, { Component } from 'react';
import '../styles/sound-key.css';

class SoundKey extends Component {
    constructor(props) {
        super(props);
        this.keyRef = React.createRef();
    }

    /**
     * When component mounts add the event
     * listener which plays the sound when the key matches the
     * keycode of this item
     */
    componentDidMount() {
        const keyCode = this.props.keyCode;
        const parent = this;
        window.addEventListener('keydown', function(e) {
            if (e.keyCode === parseInt(keyCode)){
                parent.playSound();
            }
        });
        this.keyRef.current.addEventListener('transitionend', this.removeTransition);
    }

    /**
     * Play the sound related to the clicked key,
     * this method creates a html5 audio and plays the soundFile
     * set in the props
     */
    playSound = () => {
        this.keyRef.current.classList.add('playing');
        const audio = new Audio(this.props.soundFile);
        audio.currentTime = 0;
        audio.play();
    };

    /**
     * Remove the playing class which highlights the
     * clicked key after the transition has happened
     */
    removeTransition = () => {
        this.keyRef.current.classList.remove('playing');
    };

    render() {
        const props = this.props;
        return (
            <div data-key={props.keyCode} className="key" ref={this.keyRef}>
                <div>
                    <kbd>{props.keyValue}</kbd>
                    <span className="sound">{props.soundName}</span>
                </div>
            </div>
        );
    }
}

export default SoundKey;
