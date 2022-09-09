import React from "react";
import { useFileUpload } from "use-file-upload";
<<<<<<< HEAD
import { connect } from "react-redux";
import { setAlarmMusic, setDefaultAlarmMusic } from "../Action";
import { toast } from "react-toastify";

const FileUploadComponent = (props) => {
    const [file, selectFile] = useFileUpload();
    toast.success("Alarm music updated successfully")

    return (

=======

const FileUploadComponent = (props) => {
    const [file, selectFile] = useFileUpload();
    
    return (
      
>>>>>>> 2e3c8b793b19204d22528e3ac432133a1d7892b7
        <div>
            <button className="btn btn-success"
                onClick={() => {
                    selectFile({ accept: "audio/mp3" }, ({ source, name, size, file }) => {
<<<<<<< HEAD
                        props.setAlarmMusic(source)
                        
=======
                        localStorage.setItem("alarmMusic", source)
                        props.alarmMusic()
>>>>>>> 2e3c8b793b19204d22528e3ac432133a1d7892b7
                        alert("Alarm music updated successfully");
                    });
                }}
            >
                Select Your Favorite Music
            </button> &nbsp;

<<<<<<< HEAD
            <button className="btn btn-primary" onClick={() => { props.setDefaultAlarmMusic() }}>Set Default Music</button>
=======
            <button className="btn btn-primary" onClick={() => { props.setDefaultMusic() }}>Set Default Music</button>
>>>>>>> 2e3c8b793b19204d22528e3ac432133a1d7892b7
        </div>
    );
};

<<<<<<< HEAD
const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = {
    setAlarmMusic,
    setDefaultAlarmMusic
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FileUploadComponent);
=======
export default FileUploadComponent;
>>>>>>> 2e3c8b793b19204d22528e3ac432133a1d7892b7
