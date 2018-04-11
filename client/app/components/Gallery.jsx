import React, { Component } from 'react'
import { connect } from 'react-redux'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import { startUpload, startImageDelete } from '../actions/wants'
import { format } from 'util'

export class Gallery extends Component {
  state = {
    selectedFile: null
  }

  fileSelectedHandler = ({ target }) =>
    this.setState({ selectedFile: target.files[0] }, this.fileUploadHandler)

  fileUploadHandler = () => {
    const { selectedFile } = this.state
    const { email, id } = this.props

    // e.preventDefault()

    let formData = new FormData()
    formData.append('file', selectedFile)
    formData.append('email', email)
    formData.append('id', id)

    this.props.startUpload(formData)
  }

  setCurrentImage = e => {
    this.primaryImage.style.backgroundImage = `url(${e.target.id})`
  }

  deleteImage = url => {
    // user email
    // want id
    const { email, id } = this.props

    const data = {
      url,
      email
    }

    // console.log(data)
    this.props.startImageDelete(data)
  }

  render() {
    return (
      <div>
        <div className="gallery-header">
          <h3>Dreamboard</h3>
          <form>
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
              type="submit"
              onClick={e => {
                e.preventDefault()
                this.fileInput.click()
              }}
            >
              <FontAwesomeIcon
                icon="plus"
                size="xs"
                onClick={() => this.deleteImage(url)}
              />
              &nbsp;Upload Image
            </button>
          </form>
        </div>
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

const mapStateToProps = (state, props) => ({
  email: state.auth.email,
  images: state.wants.find(want => want._id === props.url).images
})

export default connect(mapStateToProps, { startUpload, startImageDelete })(
  Gallery
)
