import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import { startUpload, startWallpaper, deleteImage } from '../actions/app'
import { format } from 'util'

export class Gallery extends Component {
  state = {
    selectedFile: null,
    dropdownOpen: false,
    dropdownIndex: null
  }

  toggleDropdown = e => {
    const i =
      e.currentTarget.dataset !== undefined
        ? +e.currentTarget.dataset.index
        : null
    if (i == null) {
      this.setState({
        dropdownOpen: false
      })
    }
    if (this.state.dropdownOpen === false) {
      this.setState({
        dropdownIndex: i,
        dropdownOpen: true
      })
    } else {
      this.setState({
        dropdownIndex: i
      })
    }
  }

  fileSelectedHandler = ({ target }) =>
    this.setState({ selectedFile: target.files[0] }, this.fileUploadHandler)

  fileUploadHandler = () => {
    const { selectedFile } = this.state
    const { email, id } = this.props

    let formData = new FormData()
    formData.append('file', selectedFile)
    formData.append('email', email)
    formData.append('id', id)

    this.props.startUpload(formData)
  }

  setCurrentImage = e => {
    this.primaryImage.style.backgroundImage = `url(${e.target.id})`
  }

  setWallpaper = e => {
    const { email } = this.props
    const wallpaper = e.currentTarget.dataset.url
    // _id = id of specific want
    this.props.startWallpaper({ wallpaper, email, id: this.props.id })
  }

  deleteImage = url => {
    const { acctype, deleteImage } = this.props
    // user email
    // want id
    const { email, id } = this.props
    const data = { email, id, url, acctype }

    deleteImage(data)
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
        <div className="gallery-container">
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
                  <Dropdown
                    isOpen={this.state.dropdownIndex === i}
                    toggle={this.toggleDropdown}
                    className="image-dropdown-root"
                  >
                    <DropdownToggle className="dropdown-toggle" data-index={i}>
                      <FontAwesomeIcon
                        icon="ellipsis-h"
                        className={
                          this.state.dropdownOpen &&
                          this.state.dropdownIndex === i
                            ? 'keep-button options-button'
                            : 'options-button'
                        }
                      />
                    </DropdownToggle>
                    <DropdownMenu
                      right
                      className="dropdown-menu"
                      style={{
                        display:
                          this.state.dropdownOpen &&
                          this.state.dropdownIndex === i
                            ? 'block'
                            : 'none'
                      }}
                    >
                      <DropdownItem
                        className="dropdown-item"
                        data-url={url}
                        onClick={this.setWallpaper}
                      >
                        Wallpaper
                      </DropdownItem>
                      <DropdownItem
                        className="dropdown-item"
                        onClick={() => this.deleteImage(url)}
                      >
                        Delete
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>

                  <div
                    id={url}
                    className={
                      this.state.dropdownOpen && this.state.dropdownIndex === i
                        ? 'keep-tint thumbnail'
                        : 'thumbnail'
                    }
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

export default connect(mapStateToProps, {
  startUpload,
  startWallpaper,
  deleteImage
})(Gallery)
