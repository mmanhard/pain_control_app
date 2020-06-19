import React from "react";
import utils from 'Utils';

class BodyVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }
  _getColor = (bodyPartName) => {
    const { bodyParts, statType, daytime } = this.props;

    let part;
    if (bodyParts) {
      for (part of bodyParts) {
        let name = part.location ? `${part.location}_${part.name}` : part.name ;
        if (name === bodyPartName) {
          if (daytime !== 'all_day') {
            const daytimeStats = part.stats.daytime[daytime]
            if (daytimeStats) {
              return utils.convertPainLeveltoHexColor(daytimeStats[statType]);
            } else {
              return 'none';
            }
          } else {
            return utils.convertPainLeveltoHexColor(part.stats.total[statType]);
          }
        }
      }
    }

    return 'white';
  }

  _handlePartClick = (clickedBodyPart) => {
    const { bodyParts, statType, history, changeCurrentBodyPart, displayAddBodyPart } = this.props;

    let part;
    if (bodyParts) {
      for (part of bodyParts) {
        let name = part.location ? `${part.location}_${part.name}` : part.name ;
        if (name === clickedBodyPart) {
          changeCurrentBodyPart(part);
          return;
        }
      }
    }

    displayAddBodyPart(bodyPartName);
  }

  // _handlePartHoverStart = (event) => {
  //   console.log(event.target);
  // }
  //
  // _handlePartHoverEnd = (event) => {
  //   console.log(event.target);
  // }

  render() {
    const { contentContainerStyle } = this.props;
    return (
      <div
        style={{...contentContainerStyle, display: 'flex', justifyContent: 'center', alignItems: 'center'}}
        ref={ (divContainer) => { this.divContainer = divContainer } }
      >
        <div style={{height: '100%'}}>
          <svg width="100%" height='100%' viewBox='0 0 200 310'>
            <g>
              <title>Body BodyVisualizer</title>
              {shapes.map((shape) => {
                return (
                  <ellipse key={shape.id}
                    onClick={() => {this._handlePartClick(shape.id)}}
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