import React, { Fragment } from "react";
import Link from "next/link";
import Head from "../components/head";
import Nav from "../components/nav";
import Router from 'next/router'
import StorePicker from "../components/StorePicker";

class Home extends React.Component {
  constructor(props) {
    super(props);
    
  }

  
 
  render() {
    return (
      <Fragment>
        <Head title="Store" />
       
          <StorePicker/>

        <style jsx>{`
          
        `}</style>
      </Fragment>
    );
  }
}

export default Home;
