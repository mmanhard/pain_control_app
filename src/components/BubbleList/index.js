import React from "react";

class BubbleList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  _createRows = () => {
    const { items, itemsPerRow } = this.props;

    const numRows = Math.ceil(items.length / itemsPerRow);

    let rows = [];
    for (var row = 0; row < numRows; row++) {
      rows[row] = items.slice(row * itemsPerRow, (row+1) * itemsPerRow);
    }

    return rows;
  }

  _renderRow = (rowItems, row) => {
    const { renderItem, rowContainerStyle, offset } = this.props;

    const margin = row % 2 ? offset : -offset;

    return (
      <div key={row} style={{...rowContainerStyle, marginLeft: margin}}>
        {rowItems.map(item => {
          return renderItem(item);
        })}
      </div>
    );
  }

  render() {
    const { contentContainerStyle } = this.props;

    const rows = this._createRows();

    return (
      <div style={contentContainerStyle}>
        {rows.map(this._renderRow)}
      </div>
    );
  }
}

export default BubbleList;