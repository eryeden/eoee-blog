import { Box, Grommet } from 'grommet';
import { base, dark, grommet } from 'grommet/themes';
import { dxc } from 'grommet-theme-dxc';
import { aruba } from 'grommet-theme-aruba';
import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { connect } from 'react-redux';
import { StickyContainer, Sticky } from 'react-sticky';

import siteConfig from '../../site-config';

import siteTheme from '../site-theme';

import SiteFooter from './SiteFooter';
import SiteHeader from './SiteHeader';
import Sidebar from './Sidebar';
import ProfileFooter from './SiteProfileFooter';

const GlobalStyle = createGlobalStyle`
  img {
    max-width: 100%;
  }
  body {
    margin: 0;
  }
  a:hover {
    opacity: 0.9;
  }
`;

const THEMES = {
  grommet,
  base,
  dark,
  dxc,
  aruba
};

 function themeByThemeType(themeType?: string): string {
  if (themeType) {
    if (themeType === 'dark' && siteConfig.darkTheme) {
      return siteConfig.darkTheme;
    } else if (themeType === 'light' && siteConfig.lightTheme) {
      return siteConfig.lightTheme;
    } else {
      return 'grommet';
    }
  } else {
    return 'grommet';
  }
}

const Theme = ({ children, themeType, themeSwitch }) => (
  <Grommet theme={THEMES[themeByThemeType(themeType)]}>
    <Grommet theme={siteTheme}>
      <GlobalStyle />
      <Box direction="column" align="center">
        <Box width="xlarge">
          <SiteHeader 
            siteConfig={siteConfig}
            themeSwitch={themeSwitch}
            themeType={themeType}
            />
          <main>
            <StickyContainer>
              <Box direction="row-responsive">
                <Box basis="large" flex="grow" direction="row-responsive">
                  {children}
                </Box>
              </Box>
            </StickyContainer>
          </main>
        </Box>
      </Box>
      <ProfileFooter
        siteConfig={siteConfig}
        themeSwitch={themeSwitch}
        themeType={themeType}
      />
    </Grommet>
  </Grommet>
);

const mapStateToProps = ({ themeType }) => {
  return { themeType };
};

const mapDispatchToProps = (dispatch) => {
  return { themeSwitch: () => dispatch({ type: `CHANGE_THEME` }) };
};

const ConnectedTheme = connect(
  mapStateToProps,
  mapDispatchToProps
)(Theme);

export default function Layout({ children }) {
  return <ConnectedTheme>{children}</ConnectedTheme>;
}
