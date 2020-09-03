import React from "react";
import utils from 'Utils';

const hoverScale = 1.08;

class BodyVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hoverID: undefined
    };
  }

  // Look to see if the user has a body part corresponding to the body part
  // being passed in (correspendence is by name).
  _getPart = (bodyPartName) => {
    const { bodyParts, stats } = this.props;

    let part;
    for (part of bodyParts) {
      if (part.name === bodyPartName) {
        return part
      }
    }

    return undefined;
  }

  // If the body part in the SVG corresponds to one of the user's body parts (
  // correspondence is by name), return the color associated with its pain level.
  // Otherwise, return the empty pain level color set it utils.
  _getColor = (bodyPart) => {
    if (bodyPart && typeof bodyPart.stats !== 'undefined') {
      return utils.convertPainLeveltoHexColor(bodyPart.stats);
    }

    return utils.convertPainLeveltoHexColor();
  }

  _handlePartClick = (event, clickedBodyPart) => {
    const { bodyParts, clickBodyPartFound, clickBodyPartNotFound } = this.props;

    // Stop the background from also being clicked when clicking this body part.
    event.stopPropagation();

    const part = this._getPart(clickedBodyPart);

    // If the part exists, use clickBodyPartFound. Otherwise, use clickBodyPartNotFound
    // and pass a user friendly display name for the body part.
    if (part) {
      if (clickBodyPartFound) clickBodyPartFound(part);
    } else if (clickBodyPartNotFound) {

      // Determine the user friendly display name.
      let newBodyPart = {}
      const splitName = clickedBodyPart.split('_')
      if (splitName.length > 1) {
        const displayName = clickedBodyPart.replace('_',' ');
        newBodyPart = { name: splitName[1], displayName, type: 'None', location: splitName[0]}
      } else {
        newBodyPart = { name: splitName[0], displayName: splitName[0], type: 'None' }
      }

      clickBodyPartNotFound(newBodyPart);
    }
  }

  _handlePartHoverStart = (event, shapeID) => {
    this.setState({hoverID: shapeID});
  }

  render() {
    const { contentContainerStyle, clickBackground, clickBodyPartFound, clickBodyPartNotFound } = this.props;
    const { hoverID } = this.state;

    // The following adds a blur to each ellipse within the svg.
    const ellipseBlur = (
      <defs>
        <filter id="blur" x="-0.2" y="-0.2" width="140%" height="140%">
          <feOffset result="offOut" in="SourceGraphic" dx="2" dy="2" />
          <feColorMatrix result="matrixOut" in="offOut" type="matrix"
            values="0.5 0 0 0 0 0 0.5 0 0 0 0 0 0.5 0 0 0 0 0 0.5 0" />
          <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="2" />
          <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
        </filter>
      </defs>
    );

    return (
      <div
        style={{...contentContainerStyle, display: 'flex', justifyContent: 'center', alignItems: 'center'}}
        ref={ (divContainer) => { this.divContainer = divContainer } }
        onClick={clickBackground}>
        <div style={{height: '100%'}}>
          <svg
            width={contentContainerStyle.width}
            height={contentContainerStyle.height}
            viewBox='0 0 200 310'
            style={{overflow: 'visible'}}>

            {ellipseBlur}

            <g>
              {shapes.map((shape) => {

                // Determine if the current ellipse is selected and if this
                // ellipse corresponds to one of the user's body parts.
                const selected = hoverID && hoverID == shape.id;
                const part = this._getPart(shape.id);

                // Determine if the ellipse should scale when hovered over.
                const shouldHover = (part && clickBodyPartFound) ||
                  (!part && clickBodyPartNotFound);

                // Calculate the size of the ellipse if it is hovered over.
                const r = (selected && shouldHover) ? hoverScale * shape.r : shape.r;

                return (
                  <ellipse key={shape.id}
                    onClick={(event) => {this._handlePartClick(event, shape.id)}}
                    onMouseOver={(event) => {this._handlePartHoverStart(event, shape.id)}}
                    id={shape.id} ry={r} rx={r} cy={shape.cy} cx={shape.cx}
                    stroke="#000" fill={this._getColor(part)}
                    filter='url(#blur)'/>
                );
              })}
            </g>
          </svg>
        </div>
      </div>
    );
  }
}

// Coordinates and radii for the visualizer's svg.
const shapes = [
  {
    id: 'Head',
    r: 35,
    cy: 40,
    cx: 100,
  },
  {
    id: 'Neck',
    r: 12.5,
    cy: 90,
    cx: 100,
  },
  {
    id: 'Up_Back',
    r: 20,
    cy: 125,
    cx: 100,
  },
  {
    id: 'Lo_Back',
    r: 20,
    cy: 170,
    cx: 100,
  },
  {
    id: 'L_Shoulder',
    r: 22.5,
    cy: 95,
    cx: 62.5,
  },
  {
    id: 'R_Shoulder',
    r: 22.5,
    cy: 95,
    cx: 137.5,
  },
  {
    id: 'L_Elbow',
    r: 20,
    cy: 132.5,
    cx: 35,
  },
  {
    id: 'R_Elbow',
    r: 20,
    cy: 132.5,
    cx: 165,
  },
  {
    id: 'L_Wrist',
    r: 12.5,
    cy: 167.5,
    cx: 25,
  },
  {
    id: 'R_Wrist',
    r: 12.5,
    cy: 167.5,
    cx: 175,
  },
  {
    id: 'L_Hand',
    r: 10,
    cy: 195,
    cx: 20,
  },
  {
    id: 'R_Hand',
    r: 10,
    cy: 195,
    cx: 180,
  },
  {
    id: 'L_Hip',
    r: 22.5,
    cy: 210,
    cx: 75,
  },
  {
    id: 'R_Hip',
    r: 22.5,
    cy: 210,
    cx: 125,
  },
  {
    id: 'L_Knee',
    r: 20,
    cy: 255,
    cx: 65,
  },
  {
    id: 'R_Knee',
    r: 20,
    cy: 255,
    cx: 135,
  },
  {
    id: 'L_Ankle',
    r: 12.5,
    cy: 290,
    cx: 67.5,
  },
  {
    id: 'R_Ankle',
    r: 12.5,
    cy: 290,
    cx: 132.5,
  },
  {
    id: 'L_Foot',
    r: 10,
    cy: 295,
    cx: 42.5,
  },
  {
    id: 'R_Foot',
    r: 10,
    cy: 295,
    cx: 157.5,
  },
];

export default BodyVisualizer;