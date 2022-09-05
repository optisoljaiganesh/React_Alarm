import React, { Component } from 'react'
import audio from "./audio/Morning Alarm.mp3"
import ReactAudioPlayer from 'react-audio-player';
import 'react-clock/dist/Clock.css';
import AnalogueClock from 'react-analogue-clock';
import FileUploadComponent from './FileUploadComponent'

let moment = require('moment');

let interval;
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
      music: '',
      setAlarm: false,
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
    this.setState({ timeValue: e.target.value, setAlarm: true });
  }
  setAlarm() {
    let now = new Date();
    let currentTime = moment(now).local().format('HH:mm')
    this.setState({ playAudio: false })
    if (this.state.timeValue === currentTime) {
      this.setState({ playAudio: true, })
    }
  }
  clearAlarm() {
    this.setState({ timeValue: "", playAudio: false, setAlarm: false });
    clearInterval(interval)
  }
  stopAlarm() {
    this.setState({ playAudio: false, timeValue: "", setAlarm: false });
    clearInterval(interval)
  }
  snoozeAlarm() {
    if (this.state.timeValue) {
      let snoozeAlarm = moment().add(5, 'minutes').format('HH:mm');
      this.setState({ timeValue: snoozeAlarm, playAudio: false });
    }
  }
  setAlarmMusic = () => {
    let music = localStorage.getItem('alarmMusic');
    this.setState({ music: music });
    setTimeout(() => {
      console.log(this.state.music);
    }, 500)
  }

  setDefaultMusic = () => {
    this.setState({ music: null })
    localStorage.clear();
    alert('default tone set successfully ')
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6 mt-50">
            <from className="form-row">
              <br /><br /><br />
              <div className="col-sm-4 ml-1">
                <p>{this.state.setAlarm ? 'Your alarm was enabled at' + this.state.timeValue : 'Set Your Alarm Time'}</p>
                <input type="time" className="form-control sm-2" onChange={this.onChangeTime} value={this.state.timeValue} /><br /><br />
              </div>
              <FileUploadComponent
                alarmMusic={() => this.setAlarmMusic()}
                setDefaultMusic={() => this.setDefaultMusic()}
              /><br />
              <button disabled={!this.state.timeValue} className="btn btn-danger" onClick={this.clearAlarm}>Clear Alarm</button>&nbsp;&nbsp;&nbsp;&nbsp;
              <button disabled={!this.state.timeValue} className="btn btn-danger" onClick={this.stopAlarm}>Stop Alarm</button><br /><br />
              {this.state.playAudio && <button disabled={!this.state.timeValue} className="btn btn-success" onClick={this.snoozeAlarm}>Snooze 5 Mins</button>}
            </from>
            <div>
              {this.state.playAudio && <ReactAudioPlayer loop={true}
                src={this.state.music ? this.state.music : audio}
                autoPlay
              />
              }
            </div>
          </div>
          <div className="col-sm-6">
            <div className={this.state.setAlarm ? "clock_success" : "clock_normal"}>
              <AnalogueClock {...clockOptions} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default AlarmClock;