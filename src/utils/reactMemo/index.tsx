import React from 'react';

export default function withMemo<P>(
  Component: React.FC<P>
): React.MemoExoticComponent<React.FC<P>> { 
  const M = React.memo(Component);            
  M.displayName = Component.displayName || Component.name;
  return M;
}