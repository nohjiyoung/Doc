import React, { Component } from 'react';
import { render } from "react-dom";
import elasticsearch from "elasticsearch";
import {CopyToClipboard} from 'react-copy-to-clipboard';
let client = new elasticsearch.Client({
  host: "localhost:9200",
  log: "trace"
});
class FileSearcher extends Component{
    constructor(props) {
        super(props);      
        this.state = { results: [] };
        this.handleChange=this.handleChange.bind(this);
      }
    render(){
       return (
           <div>
               <div className="navbar-form navbar-left search-div" role="search">
                   <div className="form-group">
                       <input type="text" className="form-control search-box" placeholder="Type Keywords" onChange={this.handleChange}></input>
                   </div>
               </div>
               <div className="clearBoth"></div>
               <SearchResults results={this.state.results} />
           </div>
       );
    }
    handleChange(event) {
        const search_query = event.target.value;
        client
          .search({
            q: search_query
          })
          .then(
            function(body) {
                console.log(this.state);
              this.setState({ results: body.hits.hits });
            }.bind(this),
            function(error) {
              console.trace(error.message);
            }
          );
      }
}
class SearchResults extends Component {
    render() {
      const results = this.props.results || [];
  
      return (
        <div className="search_results">
          <hr />
          <ul>
            {results.map(result => {
              return (
                <li key={result._id}>
                 <a href={"file:\\"+result._source.path}>{result._source.name}</a> 
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
  }
  
export default FileSearcher;