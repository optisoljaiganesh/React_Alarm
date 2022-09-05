import React from "react";
import { useFileUpload } from "use-file-upload";

const FileUploadComponent = (props) => {
    const [file, selectFile] = useFileUpload();
    
    return (
      
        <div>
            <button className="btn btn-success"
                onClick={() => {
                    selectFile({ accept: "audio/mp3" }, ({ source, name, size, file }) => {
                        localStorage.setItem("alarmMusic", source)
                        props.alarmMusic()
                        alert("Alarm music updated successfully");
                    });
                }}
            >
                Select Your Favorite Music
            </button> &nbsp;

            <button className="btn btn-primary" onClick={() => { props.setDefaultMusic() }}>Set Default Music</button>
        </div>
    );
};

export default FileUploadComponent;
