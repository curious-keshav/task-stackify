import React from 'react'

const SpriteWrapper = ({ children, width = 100, height = 100 }) => {
  return (
    <div
      style={{
        width,
        height,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "100%", height: "100%" }}>{children}</div>
    </div>
  )
}

export default SpriteWrapper
