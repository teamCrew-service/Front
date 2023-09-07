import React from 'react';
import GridDivStyle from './GridDivStye';

function GridDiv({ children, row, col }: { children: any; row: string; col: string }): JSX.Element {
  return <GridDivStyle style={{ gridTemplateColumns: col, gridTemplateRows: row }}>{children}</GridDivStyle>;
}

export default GridDiv;
