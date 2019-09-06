import React , {Component} from 'react'
import '../stylesheets/SearchTopBar.css'

export default class SearchTopBar extends Component{
    state = {
        searchQuery: ''
    }
    render(){
        return(
            <div className="search-topbar">

                <form className ="search-form">
                    <input className="search-input" placeholder ="&#x1f50d; Find your team and more."></input>
                </form>
            </div>
        )
    }
}