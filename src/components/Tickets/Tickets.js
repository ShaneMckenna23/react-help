import React, { Component } from 'react'

class Tickets extends Component {

    render() {
      const {data} = this.props

      return(
        <ul>
            <li>Location: {data.name}</li>	
            <li>Wind Speed: {data.wind.speed}</li>	  
        </ul>
      )
    }
  }

export default Tickets