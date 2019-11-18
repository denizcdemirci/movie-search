import React from 'react';
import Head from 'next/head';

class Header extends React.Component {
  render() {
    return (
      <Head>
        <title>Movie Search - {this.props.title}</title>
        <link rel='icon' href='../../public/favicon.ico'/>
        <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Dosis:400,500,700'/>
      </Head>
    );
  }
}

export default Header;
