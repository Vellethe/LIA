import React, { Component } from 'react';
import { Header } from "./Header"
import "./../custom.css"
export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
        <div>
            <Header />
        <main class="container">
          {this.props.children}
        </main>
      </div>
    );
  }
}
