import React from "react";

class BubbleList extends React.Component {

  // Given a list of items and a number of items per row. Separate the items
  // into lists of length equal to the provided number of items per row.
  _createRows = () => {
    const { items, itemsPerRow } = this.props;

    const numRows = Math.ceil(items.length / itemsPerRow);

    let rows = [];
    for (var row = 0; row < numRows; row++) {
      rows[row] = items.slice(row * itemsPerRow, (row+1) * itemsPerRow);
    }

    return rows;
  }

  // Given a row (i.e. sublist of items), render the row using the provided
  // renderItem() function.
  _renderRow = (rowItems, row) => {
    const { renderItem, rowContainerStyle, offset } = this.props;

    // Shift even rows left, odd rows right.
    const margin = row % 2 ? offset : -offset;

    return (
      <div key={row} style={{...rowContainerStyle, marginLeft: margin}}>
        {rowItems.map(renderItem)}
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