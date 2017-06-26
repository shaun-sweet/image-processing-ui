import React from 'react'
import 'styles/uploadFileButton.css';

const UploadFileButton = (props) => {
  return (
    <input type="file" name="uploadedImage" className="upload-file-button" />
  )
}
export default UploadFileButton;
