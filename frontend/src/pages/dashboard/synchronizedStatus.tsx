import React, { ReactElement } from "react";

export const synchronizedStatus = (props: { serverBlock: number }): ReactElement => <div className="text-end">
  <p><small className="text-muted">
    The server is synchronized to the block number {props.serverBlock}
  </small></p>
</div>;
