import React, { Component } from 'react';
import './App.css';
import firebase from './config/firebase';
import { md } from 'node-forge';

class App extends Component {
  items = [];
  constructor(props) {
    super(props);
    this.state = {
      market: {
        title: '',
        type: '',
        description: '',
        owner: '',
        items: [],
        powerUser: false,
        coordinates: {
          x: '',
          y: ''
        }
      },
      noItems: 0
    }
    this.handleTitle = this.handleTitle.bind(this);
    this.handleType = this.handleType.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleOwner = this.handleOwner.bind(this);
    this.handlePowerUser = this.handlePowerUser.bind(this);
    this.handleX = this.handleX.bind(this);
    this.handleY = this.handleY.bind(this);
  }

  handleTitle = (e) => {
    this.setState({
      market: {
        ...this.state.market,
        title: e.target.value
      }
    })
  }
  handleType = (e) => {
    this.setState({
      market: {
        ...this.state.market,
        type: e.target.value
      }
    })
  }
  handleDescription = (e) => {
    this.setState({
      market: {
        ...this.state.market,
        description: e.target.value
      }
    })
  }
  handleOwner = (e) => {
    this.setState({
      market: {
        ...this.state.market,
        owner: e.target.value
      }
    })
  }
  handlePowerUser = (e) => {
    this.setState({
      market: {
        ...this.state.market,
        powerUser: e.target.value
      }
    })
  }
  handleX = (e) => {
    this.setState({
      market: {
        ...this.state.market,
        coordinates: {
          ...this.state.market.coordinates,
          x: e.target.value 
        }
      }
    })
  }
  handleY = (e) => {
    this.setState({
      market: {
        ...this.state.market,
        coordinates: {
          ...this.state.market.coordinates,
          y: e.target.value
        }
      }
    })
  }
  addItem() {
    this.setState({ noItems: this.state.noItems + 1 });
  }
  _pushItems() {
    let table = [];
    for (let i = 0; i < this.state.noItems; i++) {
      table.push(
        <div className="col-md-4">
          <div class="card">
            <div class="card-body">
              <div class="form-group">
                <label>Name</label>
                <input type="text" class="form-control" placeholder="Name for item" id={'item' + i} />
              </div>
              <div class="form-group">
                <label>Price</label>
                <input type="text" class="form-control" placeholder="Name for item" id={'price' + i} />
              </div>
            </div>
          </div>
        </div>
      )
    }
    return table;
  }
  saveItems = () => {
    let items = [];
    for(let i=0; i<this.state.noItems;i++){
      let name = document.getElementById('item' + i).value;
      let price = document.getElementById('price' + i).value;
      items.push({
        name,
        price
      })
    }
    return items;
  }

  pushToDB = async () => {

    let items = await this.saveItems();

    this.setState({
      market: {
        ...this.state.market,
        items
      }
    }, () => {
      console.log(this.state.market);
      firebase.database().ref('/markets').push(this.state.market).then(() => {
        console.log('%c Saved :) ! ', 'background: #222; color: #fff');
      }) 
    })

  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <center>
              <h1>MARKET AR - ADMIN</h1>
            </center>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div class="form-group">
              <label>Title</label>
              <input type="text" class="form-control" placeholder="Title for market place" defaultValue={this.state.market.title} onChange={this.handleTitle} />
            </div>
            <div class="form-group">
              <label>Type</label>
              <input type="text" class="form-control" placeholder="Type for market eg: pescarie / varzarie" defaultValue={this.state.market.type} onChange={this.handleType} />
            </div>
            <div class="form-group">
              <label>Short description</label>
              <input type="text" class="form-control" placeholder="Short description" defaultValue={this.state.market.description} onChange={this.handleDescription} />
            </div>
            <div class="form-group">
              <label>Owner</label>
              <input type="text" class="form-control" placeholder="Owner" defaultValue={this.state.market.owner} onChange={this.handleOwner} />
            </div>
            <div class="form-group">
              <label>Power Market ?</label>
              <select class="form-control" defaultValue={this.state.market.powerUser} onChange={this.handlePowerUser}>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div class="form-group">
                  <label>Coordinate X:</label>
                  <input type="text" class="form-control" placeholder="Owner" defaultValue={this.state.market.coordinates.x} onChange={this.handleX} />
                </div>
              </div>
              <div className="col-md-6">
                <div class="form-group">
                  <label>Coordinate Y:</label>
                  <input type="text" class="form-control" placeholder="Owner" defaultValue={this.state.market.coordinates.y} onChange={this.handleY} />
                </div>
              </div>
            </div>
            <div className="row">
              <button onClick={() => { this.addItem() }}>Add Item</button>
              {this.state.noItems > 0 ? <button onClick={() => this.setState({ noItems: this.state.noItems - 1 })}>Delete</button> : <></>}
            </div>
            <div className="row">
              {this._pushItems()}
            </div>
            <div className="row">
              <button className="btn btn-danger" onClick={() => this.pushToDB()}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;