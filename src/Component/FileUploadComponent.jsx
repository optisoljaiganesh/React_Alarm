import React from "react";
import { useFileUpload } from "use-file-upload";
import { connect } from "react-redux";
import { setAlarmMusic, setDefaultAlarmMusic } from "../Action";
import { toast } from "react-toastify";

const FileUploadComponent = (props) => {
    const [file, selectFile] = useFileUpload();
    toast.success("Alarm music updated successfully")

    return (

        <div>
            <button className="btn btn-success"
                onClick={() => {
                    selectFile({ accept: "audio/mp3" }, ({ source, name, size, file }) => {
                        props.setAlarmMusic(source)
                        
                        alert("Alarm music updated successfully");
                    });
                }}
            >
                Select Your Favorite Music
            </button> &nbsp;

            <button className="btn btn-primary" onClick={() => { props.setDefaultAlarmMusic() }}>Set Default Music</button>
        </div>
    );
};

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