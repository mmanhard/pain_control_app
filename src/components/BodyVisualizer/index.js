import React from "react";
import utils from 'Utils';

class BodyVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }
  _getColor = (bodyPartName) => {
    const { bodyParts, stats } = this.props;
    let part;
    for (part of bodyParts) {
      if (part.name === bodyPartName && typeof part.stats !== 'undefined') {
        return utils.convertPainLeveltoHexColor(part.stats);
      }
    }

    return utils.convertPainLeveltoHexColor();
  }

  _handlePartClick = (event, clickedBodyPart) => {
    const { bodyParts, clickBodyPartFound, clickBodyPartNotFound } = this.props;

    event.stopPropagation();
    let part;
    for (part of bodyParts) {
      if (part.name === clickedBodyPart) {
        clickBodyPartFound(part);
        return;
      }
    }

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

  // _handlePartHoverStart = (event) => {
  //   console.log(event.target);
  // }
  //
  // _handlePartHoverEnd = (event) => {
  //   console.log(event.target);
  // }

  render() {
    const { contentContainerStyle, clickBackground } = this.props;
    return (
      <div
        style={{...contentContainerStyle, display: 'flex', justifyContent: 'center', alignItems: 'center'}}
        ref={ (divContainer) => { this.divContainer = divContainer } }
        onClick={clickBackground}
      >
        <div style={{height: '100%'}}>
          <svg width="100%" height='100%' viewBox='0 0 200 310'>
            <g>
              <title>Body BodyVisualizer</title>
              {shapes.map((shape) => {
                return (
                  <ellipse key={shape.id}
                    onClick={(event) => {this._handlePartClick(event, shape.id)}}
                    onMouseOver={this._handlePartHoverStart}
                    onMouseLeave={this._handlePartHoverEnd}
                    id={shape.id} ry={shape.r} rx={shape.r} cy={shape.cy} cx={shape.cx} stroke="#000" fill={this._getColor(shape.id)}/>
                );
              })}
            </g>
          </svg>
        </div>
      </div>
    );
  }
}

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