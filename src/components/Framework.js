import React from 'react'
import styled, { createGlobalStyle, css } from 'styled-components'

export const MEDIA = {
  xs: '@media (min-width: 360px)',
  sm: '@media (min-width: 576px)',
  md: '@media (min-width: 768px)',
  lg: '@media (min-width: 992px)',
  xl: '@media (min-width: 1200px)',
}

export const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    height: 100%;
  }

  *,
  *::after,
  *::before {
    box-sizing: inherit;
  }

  body {
    font-family: 'Proxima Nova', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    margin: 0;
    background: #232741;
    color: #daeaff;
    height: 100%;
  }

  :focus:not(.focus-visible) {
    outline: 0;
  }

  &::-moz-selection {
    background-color: rgba(50, 50, 255, 0.5);
    color: white;
  }
  &::selection {
    background-color: rgba(50, 50, 255, 0.5);
    color: white;
  }
`

export const TippyThemes = createGlobalStyle`
  .tippy-tooltip.dark-theme {
    background-color: #181c31;
    color: inherit;
    font-weight: 600;

    .tippy-backdrop {
      background-color: #181c31;
    }
  }

  .tippy-popper[x-placement^="top"] .tippy-tooltip .tippy-arrow {
    border-top-color: #181c31;
  }
  .tippy-popper[x-placement^="bottom"] .tippy-tooltip .tippy-arrow {
    border-bottom-color: #181c31;
  }
  .tippy-popper[x-placement^="left"] .tippy-tooltip .tippy-arrow {
    border-left-color: #181c31;
  }
  .tippy-popper[x-placement^="right"] .tippy-tooltip .tippy-arrow {
    border-right-color: #181c31;
  }

  .tippy-tooltip.left-arrow-theme {
    .tippy-arrow {
      left: 0 !important;
    }
  }

  .tippy-tooltip.light-theme {
    font-weight: 600;
  }
`

export const Center = styled.div`
  text-align: center;
`

export const Container = styled.div`
  position: relative;
  max-width: 1150px;
  padding: 0 ${props => props.mobilePadding}%;
  margin: 0 auto;

  ${MEDIA.sm} {
    padding: 0 25px;
  }
  ${MEDIA.md} {
    padding: 0 40px;
  }
  ${MEDIA.lg} {
    padding: 0 50px;
  }
`
Container.defaultProps = {
  mobilePadding: 5,
}

export const Row = styled(({ children, spacing, ...rest }) => (
  <div {...rest}>{children}</div>
))`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 -${props => props.spacing}px;
`
Row.defaultProps = {
  spacing: 15,
}

export const Col = styled(
  ({ children, base, xs, sm, md, lg, xl, spacing, ...rest }) => (
    <div {...rest}>{children}</div>
  ),
)`
  flex: 1;
  padding: 0 ${props => props.spacing}px;
  ${props =>
    props.base &&
    css`
      flex-basis: ${props => (100 * props.base) / 12}%;
    `}
  ${props =>
    ['xs', 'sm', 'md', 'lg', 'xl']
      .filter(size => props[size])
      .map(
        size => css`
          ${MEDIA[size]} {
            flex-basis: ${props => (100 * props[size]) / 12}%;
          }
        `,
      )};
`
Col.defaultProps = {
  spacing: 15,
}

const LinkStyled = styled.a`
  color: #83a8f2;
  text-decoration: none;
  transition: color 0.15s;

  &:hover {
    color: #64bcff;
  }
`
export const Link = ({ href, external, children, ...rest }) => (
  <LinkStyled
    href={href}
    {...external && { target: '_blank', rel: 'noopener noreferrer' }}
    {...rest}
  >
    {children}
  </LinkStyled>
)

export const Faded = styled.span`
  opacity: ${props => props.opacity};
`
Faded.defaultProps = {
  opacity: 0.5,
}

export const Card = styled.div`
  background: #333855;
  background-clip: padding-box;
  border: 1px solid rgba(0, 8, 16, 0.4);
  border-radius: 8px;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s, filter 0.1s;

  &:hover {
    position: relative;
    box-shadow: 0 20px 40px -4px rgba(0, 8, 16, 0.4);
    transform: translate3d(0, -1px, 0);
    filter: brightness(1.1) contrast(0.9);
    z-index: 1;
  }
`

export const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${props => props.justify};

  > div {
    margin-right: 15px;
    margin-bottom: 15px;
    flex: ${props => props.type === 'even' && 1};
  }
`
Flex.defaultProps = {
  justify: 'space-between',
}
