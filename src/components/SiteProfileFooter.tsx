import { Box, Button, Image, Markdown, Text } from 'grommet';
import { Github, Reddit, Twitter } from 'grommet-icons';
import * as React from 'react';

import siteConfig from '../../site-config';


export default (props) => (
  <div>
    <Box
      border={false}
      wrap={true}
      alignContent="center"
      pad="small"
      as="footer"
      justify="between"
      flex={false}
      background="brand"
    >
      <Box direction="row" >
        <Box
          margin={{ bottom: 'small', left: 'none', right: 'small' }}
          round="small"
          height="xsmall"
          width="xsmall"
          overflow="hidden"
        >
          <Image
            fit="cover"
            title={siteConfig.author}
            alt={siteConfig.author}
            src={siteConfig.authorImage}
          />
        </Box>
        <Box direction="column" alignSelf="center">
          <Text weight="bold" size="medium" color="text" alignSelf="center">
            {siteConfig.author}
          </Text>
          <Box direction="row" wrap={true}>

            {siteConfig.social.github ? (
              <Button
                href={`https://github.com/${siteConfig.social.github}`}
                icon={<Github size="medium" />}
              />
            ) : (
                ''
              )}

            {siteConfig.social.twitter ? (
              <Button
                href={`https://twitter.com/${siteConfig.social.twitter}`}
                icon={<Twitter size="medium" />}
              />
            ) : (
                ''
              )}

            {siteConfig.social.reddit ? (
              <Button
                href={`https://reddit.com/user/${siteConfig.social.reddit}`}
                icon={<Reddit size="medium" />}
              />
            ) : (
                ''
              )}
          </Box>
        </Box>
        <Box overflow="hidden" >
          <Text size="small" color="text">
            <Markdown>{siteConfig.authorBio}</Markdown>
          </Text>
        </Box>
      </Box>
      <Box align="center">
        <Text color="text">
          <Markdown>{siteConfig.footerText}</Markdown>
        </Text>
      </Box>
    </Box>
  </div>
);
