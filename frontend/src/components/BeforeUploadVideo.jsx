const BeforeUploadVideo = () => {
    return(
        <div className="container" style={{margin: "70px"}}>
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
        </div>
    )
}

export default BeforeUploadVideo