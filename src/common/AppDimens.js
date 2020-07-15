import React, { Component } from "react";

const screenSizes = {
  xSmall: 576,
  small: 768,
  medium: 992,
  large: 1200
}

export default function withWindowDimensions(WrappedComponent) {
    return class extends Component {
        state = { width: 0, height: 0 };

        componentDidMount() {
            this.updateWindowDimensions();
            window.addEventListener("resize", this.updateWindowDimensions);
        }

        componentWillUnmount() {
            window.removeEventListener("resize", this.updateWindowDimensions);
        }

        updateWindowDimensions = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            this.setState({ width, height });
        };

        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    isMobile={this.state.width < screenSizes.xSmall}
                    isSmallScreen={this.state.width < screenSizes.small}
                    isMediumScreen={this.state.width < screenSizes.medium}
                    isLargeScreen={this.state.width < screenSizes.large}
                    windowWidth={this.state.width}
                    windowHeight={this.state.height}
                />
            );
        }
    };
}