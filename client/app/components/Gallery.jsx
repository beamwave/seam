import React, { Component } from 'react'
import { connect } from 'react-redux'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import { startUpload, startImageDelete } from '../actions/auth'

export class Gallery extends Component {
  state = {
    selectedFile: null
  }

  fileSelectedHandler = ({ target }) =>
    this.setState({ selectedFile: target.files[0] })

  fileUploadHandler = e => {
    const { selectedFile } = this.state
    const { email } = this.props

    e.preventDefault()

    let formData = new FormData()
    formData.append('file', selectedFile)
    formData.append('email', email)

    this.props.startUpload(formData)
  }

  setCurrentImage = e => {
    this.primaryImage.style.backgroundImage = `url(${e.target.id})`
  }

  deleteImage = url => {
    const { email } = this.props

    const data = {
      url,
      email
    }

    console.log(data)
    this.props.startImageDelete(data)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.fileUploadHandler}>
          <label>Upload an image</label>
          <input
            className="file-upload"
            style={{ display: 'none' }}
            name="file"
            type="file"
            onChange={this.fileSelectedHandler}
            ref={fileInput => (this.fileInput = fileInput)}
            data-cloudinary-field="image_id" // ?
          />
          <button
            onClick={e => {
              e.preventDefault()
              this.fileInput.click()
            }}
          >
            Choose
          </button>
          <button type="submit">Upload</button>
        </form>
        <h2>Dreamboard</h2>
        <div className="container">
          <div
            id="current"
            ref={current => (this.primaryImage = current)}
            style={{
              background: `url(${
                this.props.images[0]
              }) center / cover no-repeat`,
              height: `280px`
            }}
          />
          <div className="images-container">
            {this.props.images.length > 0 ? (
              this.props.images.map((url, i) => (
                <div className="image-container" key={url}>
                  <FontAwesomeIcon
                    icon="times"
                    className="delete-button"
                    onClick={() => this.deleteImage(url)}
                  />
                  <div
                    id={url}
                    className="thumbnail"
                    onClick={this.setCurrentImage}
                    style={{
                      background: `url(${url}) center / cover no-repeat`
                    }}
                  />
                </div>
              ))
            ) : (
              <p>No images uploaded.</p>
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  email: state.auth.email,
  images: state.auth.images
})

export default connect(mapStateToProps, { startUpload, startImageDelete })(
  Gallery
)
