import React, { Component } from 'react'
import { Alert } from 'react-native'
import { connect } from 'react-redux'
import Navigator from './Navigator'
import { setMessage } from './Store/actions/message'

class App extends Component {
    componentDidUpdate = () => {
        if (this.props.text && this.props.text.toString().trim()) {
            Alert.alert(this.props.title || 'Mensagem', this.props.text.toString())
            this.props.clarMessage()
        }
    }
    render() {
        return (
            <Navigator />
        )
    }
}

const mapStateToProps = ({ message }) => {
    return {
        title: message.title,
        text: message.text
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clarMessage: () => {
            dispatch(setMessage({ title: '', text: '' }))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)