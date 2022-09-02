import React, { Component } from 'react'
import audio from "./audio/Morning Alarm.mp3"
import ReactAudioPlayer from 'react-audio-player';
import 'react-clock/dist/Clock.css';
import AnalogueClock from 'react-analogue-clock';
var moment = require('moment');

var interval;
const clockOptions = {
  baseColor: '#ffffff',
  borderColor: '#000000',
  borderWidth: 5,
  centerColor: '#000000',
  handColors: {
    hour: '#000000',
    minute: '#000000',
    second: '#000000',
  },
  notchColor: '#000000',
  numbersColor: '#000000',
  showNumbers: true,
  size: 300
}
export class AlarmClock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timeValue: '',
      playAudio: false,
    };
    this.clearAlarm = this.clearAlarm.bind(this);
    this.stopAlarm = this.stopAlarm.bind(this);
    this.setAlarm = this.setAlarm.bind(this);
    this.snoozeAlarm = this.snoozeAlarm.bind(this);

  }
  componentDidMount() {
    setInterval(() => {
      interval = this.setAlarm();
    }, 1000)
  }
  onChangeTime = (e) => {
    this.setState({ timeValue: e.target.value });
  }
  setAlarm() {
    var now = new Date();
    let currentTime = moment(now).local().format('HH:mm')
    this.setState({ playAudio: false })
    if (this.state.timeValue === currentTime) {
      this.setState({ playAudio: true })
    }
  }
  clearAlarm() {
    this.setState({ timeValue: "", playAudio: false });
    clearInterval(interval)
  }
  stopAlarm() {
    this.setState({ playAudio: false, timeValue: "" });
    clearInterval(interval)
  }
  snoozeAlarm() {
    if (this.state.timeValue) {
      var snoozeAlarm = moment().add(5, 'minutes').format('hh:mm');
      this.setState({ timeValue: snoozeAlarm, playAudio: false });
    }
  }


  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6 mt-50">
            <from className="form-row">
              <br /><br /><br />
              <div className="col-sm-4 ml-1">
                <input type="time" className="form-control sm-2" onChange={this.onChangeTime} value={this.state.timeValue} /><br /><br />
              </div>
              <button className="btn btn-primary" onClick={this.setAlarm}>Set Alarm</button><br /><br />
              <button className="btn btn-danger" onClick={this.clearAlarm}>Clear Alarm</button>&nbsp;&nbsp;&nbsp;&nbsp;
              <button className="btn btn-danger" onClick={this.stopAlarm}>Stop Alarm</button><br /><br />
              <button className="btn btn-success" onClick={this.snoozeAlarm}>Snooze 5 Mins</button>
            </from>
            <div>
              {this.state.playAudio && <ReactAudioPlayer
                src={audio}
                autoPlay
              />
              }
            </div>
          </div>
          <div className="col-sm-6">
            <div className="clock">
              <AnalogueClock {...clockOptions} />
            </div>
          </div>
        </div>

      </div>
    )
  }
}


export default AlarmClock;