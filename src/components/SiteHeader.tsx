import { Link } from 'gatsby';
import { Box, Heading, Text, Header, Grid } from 'grommet';
import * as React from 'react';

import siteConfig from '../../site-config';

import CardProfile from './CardProfile';
import LightSwitch from './LightSwitch';

export default (props) => (


  <Header background="brand">
    <Box>
      <Link
        style={{
          boxShadow: 'none',
          textDecoration: 'none'
        }}
        to="/"
      >
        <Heading textAlign="center" color="brand" margin="small">
          {siteConfig.title}
        </Heading>
      </Link>
      <Text color="text" textAlign="center">
        {siteConfig.description}
      </Text>
    </Box>

    <Box>
      {props.siteConfig.darkTheme && props.siteConfig.darkTheme !== '' ? (
        <>
          <LightSwitch onClick={props.themeSwitch} themeType={props.themeType} />
        </>
      ) : (
          <></>
        )}
    </Box>
  </Header>

);
