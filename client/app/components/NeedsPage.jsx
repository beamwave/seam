import React from 'react'

export const NeedsPage = () => (
  <div>
    <h1>Needs</h1>
    <div className="gallery">
      <Gallery id={_id} url={this.props.match.params.id} acctype="needs" />
    </div>
  </div>
)

export default NeedsPage
