'use client'

import React from 'react'

export default function ClickableBtn({event,children}) {
  return (
    <div>
      <button onClick={event}>{children}</button>
    </div>
  )
}
