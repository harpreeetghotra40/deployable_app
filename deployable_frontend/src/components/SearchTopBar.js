import React , {Component} from 'react'
import '../stylesheets/SearchTopBar.css'

export default class SearchTopBar extends Component{
    state = {
        searchQuery: ''
    }

    changeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }
    render(){
        return(
            <div className="search-topbar" onSubmit = {(event) => this.props.setQuery(event, this.state.searchQuery)}>
                <form className ="search-form">
                    <input onChange = {this.changeHandler} className="search-input" name = "searchQuery" placeholder ="&#x1f50d; Find your team and more."></input>
                </form>
            </div>
        )
    }
}