import React, { Component } from 'react'
import Tickets from '../Tickets/Tickets';

class TicketContainer extends Component {
    constructor(){
        super()
        this.state = { 
            loading: true
        };
    }

    componentDidMount() {
        fetch("http://api.openweathermap.org/data/2.5/weather?q=London&APPID=04c4df63faf1ecc2b10eea8d38afc63b") 
        .then(response => response.json())
        .then(json => {
            console.log(json);
            this.setState({
                data: json,
                loading: false
            })
        });
    }

    render () {
        return (
            <div>
                {this.state.loading ? 'Loading' : <Tickets data={this.state.data}/>}
            </div>
        )
    }
}

export default TicketContainer