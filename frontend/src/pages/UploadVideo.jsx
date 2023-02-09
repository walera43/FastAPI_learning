import { ChangeEvent, useState } from "react";
import ErrorMessage from "../components/ErrorMessage";
import AfterUploadVideo from "../components/AfterUploadVideo";

const UploadVideo = () => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [sendVideo, setSendVideo] = useState(false)
    const formData = new FormData()

    const handleFileChange = (e) => {
      if (e.target.files) {
        setFile(e.target.files[0]);
      }
    };

    const submitVideo = async() => {
      const requestOptions = {
        method: "POST",
        body: formData
      }

      const response = await fetch("/api/create_video", requestOptions)
      const data = response.json()
      
      
      if (!response.ok) {
        setErrorMessage(data.detail);
    } else {
     setSendVideo(true)
    }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        formData.append("file", file);
        formData.append("title", title);
        formData.append("description", description);
        submitVideo();
      };

    return(
        <div className="container" style={{margin: "70px"}}>
          {sendVideo ? <AfterUploadVideo /> :
            <form className="box" onSubmit={handleSubmit}>
                <div className="field">
                  <label className="label">Название видео</label>
                  <div className="control">
                    <input className="input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                  </div>
                </div>   

                <div className="field">
                  <label className="label">Описание к видео</label>
                  <div className="control">
                    <input className="input" type="text" value={description} onChange={(e) => setDescription(e.target.value)} required/>
                  </div>
                </div>       

                <div className="file">
                  <label className="file-label">
                    <input onChange={handleFileChange} className="file-input" type="file" name="resume"/>
                    <span className="file-cta">
                      <span className="file-icon">
                        <i className="fas fa-upload"></i>
                      </span>
                      <span className="file-label">
                        Выбери видео..
                      </span>
                    </span>
                  </label>
                  <button className="button" type="submit">Загрузить видео</button>
                </div>
            </form>
          }
        </div>
    )

}

export default UploadVideo